import {BackIcon} from '@assets/icons/Back';
import {EyeIcon} from '@assets/icons/Eye';
import {NoEyeIcon} from '@assets/icons/NoEye';
import {Button} from '@components/buttons/Button';
import Input from '@components/inputs/Input';
import {SafeAreaView} from '@components/views/SafeAreaView';
import {Routes} from '@navigations/Routes';
import {RootStackScreenProps} from '@type';
import {scaleH} from '@utils/dimensionUtil';
import {Box, HStack, ScrollView, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import {api} from 'src/provider/api';
const ForgotPasswordScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'ForgotPassword'>) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(route?.params?.step || 1);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowRepassword, setIsShowRepassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const accessKey = route?.params?.accessKey;

  const onSendOTP = async () => {
    if (!validateFirstStep()) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.post('/auth/forget-password', {
        email: email.toLowerCase(),
      });
      if (res && res.data) {
        // setStep(2);
        navigation.navigate(Routes.ConfirmOTP, {
          email: email.toLowerCase(),
          type: 'ForgotPassword',
        });
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      console.log(e?.response?.data);
      if (e?.response?.data?.message === 'USR_0041') {
        Alert.alert(t('forgotPassword.userNotFound'));
        return;
      }
      if (e?.response?.data?.message === 'TL_001') {
        navigation.navigate(Routes.ConfirmOTP, {
          email: email.toLowerCase(),
          type: 'ForgotPassword',
        });
        return;
      }
      Alert.alert(t(e?.response?.data?.details));
    }
  };

  const validateFirstStep = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Alert.alert(t('messages.requiredEmail'));
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert(t('messages.invalidEmail'));
      return false;
    }
    return true;
  };

  const validate = () => {
    if (!newPassword) {
      Alert.alert(t('signUp.requiredPassword'));
      return false;
    }

    if (newPassword.length < 8) {
      Alert.alert(t('messages.minPasswordLength'));
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert(t('messages.passwordsDontMatch'));
      return false;
    }
    return true;
  };

  const onChangePassword = async () => {
    if (!validate()) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.post('/auth/change-password', {
        email: email.toLowerCase(),
        newPassword,
        accessKey,
      });
      if (res && res.data) {
        Alert.alert(t('forgotPassword.success'));
        navigation.replace(Routes.SignIn);
      }
    } catch (e: any) {
      Alert.alert(t('Error.netinfo_disconnect_alert'));
      navigation.navigate(Routes.ConfirmOTP, {
        email: email.toLowerCase(),
        type: 'ForgotPassword',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPassword = async () => {
    if (step === 1) {
      await onSendOTP();
    }
    if (step === 3) {
      await onChangePassword();
    }
  };

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onShowRepassword = () => {
    setIsShowRepassword(!isShowRepassword);
  };

  useEffect(() => {
    if (route?.params?.step) setStep(route?.params?.step);
  }, [route?.params?.step]);

  return (
    <SafeAreaView>
      <ScrollView flex={1} px="6" pt="5">
        {step !== 3 && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        )}
        <Text mt="10" fontSize="2xl" fontWeight="bold" color="neutral.1000">
          {t('forgotPassword.title')}
        </Text>
        <Text mt="2" fontSize="md" color="neutral.1000">
          {t('forgotPassword.message')}
        </Text>
        {step === 1 && (
          <VStack mt="10" space="1">
            <HStack>
              <Text fontSize="sm" color="neutral.800">
                {t('signIn.email')}
              </Text>
              <Text color="red.100"> *</Text>
            </HStack>
            <Input value={email} onChangeText={value => setEmail(value)} />
          </VStack>
        )}
        {step === 3 && (
          <VStack mt="10" space="4">
            <VStack space="1">
              <HStack>
                <Text fontSize="sm" color="neutral.900">
                  {t('signUp.password')}
                </Text>
                <Text color="red.100"> *</Text>
              </HStack>
              <Box position="relative">
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChangeText={value => setNewPassword(value)}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={onShowPassword}>
                  {isShowPassword ? <EyeIcon /> : <NoEyeIcon />}
                </TouchableOpacity>
              </Box>
            </VStack>
            <VStack space="1">
              <HStack>
                <Text fontSize="sm" color="neutral.900">
                  {t('signUp.confirmPassword')}
                </Text>
                <Text color="red.100"> *</Text>
              </HStack>
              <Box position="relative">
                <Input
                  type={isShowRepassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChangeText={value => setConfirmNewPassword(value)}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={onShowRepassword}>
                  {isShowRepassword ? <EyeIcon /> : <NoEyeIcon />}
                </TouchableOpacity>
              </Box>
            </VStack>
          </VStack>
        )}
        <Button
          containerStyle={styles.button}
          onPress={onForgotPassword}
          title={t('forgotPassword.continue')}
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20 * scaleH,
  },
  showPassword: {
    position: 'absolute',
    right: 10 * scaleH,
    top: 12 * scaleH,
  },
});

export default ForgotPasswordScreen;
