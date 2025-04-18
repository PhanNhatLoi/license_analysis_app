import {BackIcon} from '@assets/icons/Back';
import {INPUT_COUNT_OTP, OTPInput} from '@components/inputs/OTPInput';
import {SafeAreaView} from '@components/views/SafeAreaView';
import {Routes} from '@navigations/Routes';
import {accountSelector} from '@redux/selectors/accountSelector';
import {storeAccount} from '@redux/slice/account';
import {RootStackScreenProps} from '@type';
import {heightScreen, widthScreen} from '@utils/dimensionUtil';
import {ScrollView, Text, VStack, View} from 'native-base';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useAsyncStorage} from 'src/hooks/useLocalStorage';
import {api} from 'src/provider/api';
import {useAuth} from 'src/provider/auth';

const ConfirmOTPScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'ConfirmOTP'>) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [otpInput, setOtpInput] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(300);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const email = route?.params?.email;
  const type = route?.params?.type;

  const onResend = async () => {
    setSeconds(300);
    try {
      const res = await api.post('/auth/resend-otp', {email});
      console.log('res', res);
    } catch (e: any) {
      console.log(e?.response?.data);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    (async () => {
      if (otpInput.length === INPUT_COUNT_OTP) {
        setIsLoading(true);
        try {
          const payload = {
            email,
            otpCode: otpInput,
          };
          if (type === 'SignUp') {
            const res = await api.post('/auth/active-account', payload);
            if (res && res.data) {
              // Alert.alert(t('signUp.success'));
              // console.log('res?.data', res?.data);
              // setToken(res?.data?.response?.accessToken);
              dispatch(storeAccount(res?.data?.response));
              // navigation.replace(Routes.MainLayout, {tabBar: Routes.Home});
            }
          }
          if (type === 'ForgotPassword') {
            const res = await api.post('/auth/verify-change-password', payload);
            if (res && res.data) {
              // Alert.alert(t('signUp.success'));
              navigation.navigate(Routes.ForgotPassword, {
                step: 3,
                accessKey: res?.data?.response?.accessKey,
              });
            }
          }
        } catch (error: any) {
          if (
            error?.response?.data?.details?.includes('netinfo_disconnect_alert')
          ) {
            Alert.alert(t(error?.response?.data?.details));
            return;
          }

          Alert.alert(t('confirmOTP.error'));
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [otpInput.length]);

  return (
    <SafeAreaView style={{position: 'relative'}}>
      {isLoading && (
        <View
          position="absolute"
          flex={1}
          width={widthScreen}
          height={heightScreen}
          justifyContent="center"
          alignItems="center"
          zIndex="10"
          backgroundColor="white"
          opacity="0.3">
          <ActivityIndicator size="large" />
        </View>
      )}
      <ScrollView flex={1} px="6" pt="5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text mt="10" fontSize="2xl" fontWeight="bold" color="neutral.1000">
          {t('confirmOTP.title')}
        </Text>
        <Text mt="2" fontSize="md" color="neutral.1000">
          {t('confirmOTP.enterOTP')}
        </Text>
        <VStack mt="10">
          <OTPInput
            otpInput={otpInput}
            setOtpInput={setOtpInput}
            autoFocus={false}
          />
          <TouchableOpacity disabled={seconds !== 0} onPress={onResend}>
            <Text
              textAlign="center"
              mt="4"
              fontSize="sm"
              color="green.100">{`${t('confirmOTP.send')} ${seconds}s`}</Text>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmOTPScreen;
