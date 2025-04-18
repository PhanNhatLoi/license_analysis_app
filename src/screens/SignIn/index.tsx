import {AppleIcon} from '@assets/icons/Apple';
import {EyeIcon} from '@assets/icons/Eye';
import {FacebookIcon} from '@assets/icons/Facebook';
import {GoogleIcon} from '@assets/icons/Google';
import {NoEyeIcon} from '@assets/icons/NoEye';
import {Button} from '@components/buttons/Button';
import Input from '@components/inputs/Input';
import DividerWithText from '@components/line/DividerWithText';
import SignInWithSocial from '@components/shared/SignInWithSocial';
import {Routes} from '@navigations/Routes';
import {accountSelector} from '@redux/selectors/accountSelector';
import {RootStackScreenProps} from '@type';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {Box, HStack, ScrollView, Text, VStack, View} from 'native-base';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {api} from 'src/provider/api';
import {useAuth} from 'src/provider/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({route, navigation}: RootStackScreenProps<'SignIn'>) => {
  const {onLogin} = useAuth();
  const {t} = useTranslation();
  const account = useSelector(accountSelector);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const validate = () => {
    if (!email) {
      Alert.alert(t('messages.requiredPhoneNumber'));
      return false;
    }
    if (!password) {
      Alert.alert(t('messages.requiredPassword'));
      return false;
    }
    if (password.length < 8) {
      Alert.alert(t('messages.minPasswordLength'));
      return false;
    }
    return true;
  };

  const onNavigateSignUp = () => {
    navigation.navigate(Routes.SignUp);
  };

  const onSignIn = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    const parseEmail = email?.toLowerCase();
    const res = await onLogin({email: parseEmail, password});
    if (res === 'NO_ACTIVE') {
      try {
        const res = await api.post('/auth/resend-otp', {email: parseEmail});
        if (res && res.data) {
          navigation.navigate(Routes.ConfirmOTP, {
            email: parseEmail,
            type: 'SignUp',
          });
        }
      } catch (e: any) {
        console.log(e?.response?.data);
        if (e?.response?.data?.message === 'TL_001') {
          navigation.navigate(Routes.ConfirmOTP, {
            email: parseEmail,
            type: 'SignUp',
          });
        }
      }
      setIsLoading(false);
      return;
    }
    if (!res) {
      setIsLoading(false);
    }
    // if (res) navigation.replace(Routes.MainLayout, {tabBar: Routes.Home});
  };

  useEffect(() => {
    if (account?.accessToken && account?.accessToken !== 'NO_ACTIVE') {
      setIsLoading(false);
      // navigation.replace(Routes.MainLayout, {tabBar: Routes.Home});
    }
  }, [account?.accessToken]);

  return (
    <ScrollView flex={1} backgroundColor="white">
      <View px="6" mt={60 * scaleH}>
        <Box justifyContent="center" alignItems="center">
          <Image
            source={require('@assets/icons/Logo.png')}
            alt="logo"
            style={styles.logo}
          />
        </Box>
        <VStack mt={30 * scaleH} mb={10 * scaleH} space="5">
          <VStack space="1">
            <HStack>
              <Text fontSize="sm" color="neutral.900">
                {t('signIn.email')}
              </Text>
              <Text color="red.100"> *</Text>
            </HStack>
            <Input value={email} onChangeText={value => setEmail(value)} />
          </VStack>
          <VStack space="1">
            <HStack>
              <Text fontSize="sm" color="neutral.900">
                {t('signIn.password')}
              </Text>
              <Text color="red.100"> *</Text>
            </HStack>
            <Box position="relative">
              <Input
                type={isShowPassword ? 'text' : 'password'}
                value={password}
                onChangeText={value => setPassword(value)}
              />
              <TouchableOpacity
                style={styles.showPassword}
                onPress={onShowPassword}>
                {isShowPassword ? <EyeIcon /> : <NoEyeIcon />}
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate(Routes.ForgotPassword, {})}>
                <Text fontSize="sm" color="green.100">
                  {t('signIn.forgetPassword')}
                </Text>
              </TouchableOpacity> */}
            </Box>
          </VStack>
          <Button
            style={styles.signInButton}
            onPress={onSignIn}
            title={t('signIn.title')}
            loading={isLoading}
          />
          <Button
            type="outline"
            onPress={() => {
              navigation.replace(Routes.MainLayout, {tabBar: Routes.Home});
            }}
            title={t('signIn.discoverNow')}
          />
        </VStack>
        {/* <DividerWithText />
        <SignInWithSocial /> */}
        <HStack
          my={20 * scaleH}
          justifyContent="center"
          alignItems="center"
          space="0.5">
          <Text fontSize="md" color="text.800">
            {t('signIn.noAccount')}
          </Text>
          <TouchableOpacity onPress={onNavigateSignUp}>
            <Text fontSize="md" color="main.500" fontWeight="medium">
              {t('signIn.signUpNow')}
            </Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 160 * scaleW,
    height: 112 * scaleW,
    resizeMode: 'contain',
  },
  showPassword: {
    position: 'absolute',
    right: 10 * scaleH,
    top: 12 * scaleH,
  },
  forgotPassword: {
    marginTop: 4 * scaleH,
    alignSelf: 'flex-end',
  },
  signInButton: {
    shadowColor: '#0000001A',
    elevation: 4,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  signInWithGoogle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12 * scaleW,
    height: 44 * scaleH,
    borderRadius: 8 * scaleW,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  signInWithFacebook: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12 * scaleW,
    height: 44 * scaleH,
    borderRadius: 8 * scaleW,
    backgroundColor: '#1877F2',
  },
  signInWithApple: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12 * scaleW,
    height: 44 * scaleH,
    borderRadius: 8 * scaleW,
    backgroundColor: '#000000',
  },
});

export default SignInScreen;
