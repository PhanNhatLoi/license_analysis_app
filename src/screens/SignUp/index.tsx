import {EyeIcon} from '@assets/icons/Eye';
import {NoEyeIcon} from '@assets/icons/NoEye';
import {Button} from '@components/buttons/Button';
import Input from '@components/inputs/Input';
// import SignInWithSocial from '@components/shared/SignInWithSocial';
import {Routes} from '@navigations/Routes';
import {RootStackScreenProps} from '@type';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {
  Box,
  CheckIcon,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
  theme,
  useTheme,
} from 'native-base';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {api} from 'src/provider/api';
import DatePicker from 'react-native-date-picker';

const SignUpScreen = ({route, navigation}: RootStackScreenProps<'SignUp'>) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowRepassword, setIsShowRepassword] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onShowRepassword = () => {
    setIsShowRepassword(!isShowRepassword);
  };

  const onNavigateSignIn = () => {
    navigation.navigate(Routes.SignIn);
  };

  const validate = () => {
    const phoneRegex =
      /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!name) {
      Alert.alert(t('messages.requiredName'));
      return false;
    }
    if (!phoneNumber) {
      Alert.alert(t('messages.requiredPhoneNumber'));
      return false;
    }
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      Alert.alert(t('messages.invalidPhoneNumber'));
      return false;
    }
    if (!gender) {
      Alert.alert(t('messages.requireGender'));
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
    if (password !== confirmPassword) {
      Alert.alert(t('messages.passwordsDontMatch'));
      return false;
    }

    return true;
  };

  const onSignUp = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        name,
        phoneNumber,
        dob: dateOfBirth.toISOString().split('T')[0],
        gender,
        class: classLevel,
        password,
      };
      const res = await api.post('/auth/sign-up-v2', payload);
      if (res && res.data && res.data?.response) {
        navigation.navigate(Routes.SignIn);
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.details === 'Error.netinfo_disconnect_alert') {
        Alert.alert(t(error?.response?.data?.details));
        return;
      }
      if (error?.response?.data?.message === 'ATH_0091') {
        Alert.alert(t('signUp.existsUser'));
        return;
      }
      const message =
        error?.response?.data?.message &&
        error?.response?.data?.message[0]?.error;
      Alert.alert(t(message) || t('signUp.errorSignUp'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView flex={1} backgroundColor="white">
        <View px="6" mt={60 * scaleH}>
          <Box justifyContent="center" alignItems="center">
            <Image
              source={require('@assets/icons/Logo.png')}
              alt="logo"
              style={styles.logo}
            />
          </Box>
          <VStack mt={30 * scaleH} space="5">
            <VStack space="1">
              <HStack>
                <Text fontSize="sm" color="neutral.900">
                  {t('signUp.fullName')}
                </Text>
                <Text color="red.100"> *</Text>
              </HStack>
              <Input value={name} onChangeText={value => setName(value)} />
            </VStack>

            <VStack space="1">
              <HStack>
                <Text fontSize="sm" color="neutral.900">
                  {t('signUp.phoneNumber')}
                </Text>
                <Text color="red.100"> *</Text>
              </HStack>
              <Input
                value={phoneNumber}
                keyboardType="numeric"
                onChangeText={value => setPhoneNumber(value)}
              />
            </VStack>

            <VStack space="1">
              <Text fontSize="sm" color="neutral.900">
                {t('signUp.dateOfBirth')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsDatePickerOpen(true);
                }}>
                <View
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.neutral[50],
                      borderRadius: 10,
                      backgroundColor: theme.colors.neutral[20],
                      justifyContent: 'center',
                      padding: 10,
                      borderWidth: 1,
                    },
                  ]}>
                  <Text
                    style={{
                      color: theme?.colors?.neutral[1000],
                    }}>
                    {`${dateOfBirth.getDate().toString().padStart(2, '0')}-${(
                      dateOfBirth.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, '0')}-${dateOfBirth.getFullYear()}`}
                  </Text>
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                open={isDatePickerOpen}
                date={dateOfBirth}
                maximumDate={new Date()}
                mode="date"
                onConfirm={date => {
                  setIsDatePickerOpen(false);
                  setDateOfBirth(date);
                }}
                onCancel={() => {
                  setIsDatePickerOpen(false);
                }}
              />
            </VStack>

            <VStack space="1">
              <Text fontSize="sm" color="neutral.900">
                {t('signUp.gender')}
              </Text>
              <Select
                selectedValue={gender}
                minWidth="200"
                height={43 * scaleH}
                backgroundColor={theme.colors.neutral[20]}
                borderRadius={Platform.OS === 'ios' ? 10 * scaleW : 10 * scaleW}
                accessibilityLabel={t('signUp.chooseGender')}
                placeholder={t('signUp.chooseGender')}
                onValueChange={value => setGender(value)}>
                <Select.Item label={t('signUp.male')} value="male" />
                <Select.Item label={t('signUp.female')} value="female" />
                <Select.Item label={t('signUp.other')} value="other" />
              </Select>
            </VStack>

            <VStack space="1">
              <Text fontSize="sm" color="neutral.900">
                {t('signUp.class')}
              </Text>
              <Input
                value={classLevel}
                onChangeText={value => setClassLevel(value)}
              />
            </VStack>

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
                  value={password}
                  onChangeText={value => setPassword(value)}
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
                  value={confirmPassword}
                  onChangeText={value => setConfirmPassword(value)}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={onShowRepassword}>
                  {isShowRepassword ? <EyeIcon /> : <NoEyeIcon />}
                </TouchableOpacity>
              </Box>
            </VStack>

            <Button
              title={t('signUp.title')}
              onPress={onSignUp}
              loading={isLoading}
            />
          </VStack>

          <HStack
            my={20 * scaleH}
            justifyContent="center"
            alignItems="center"
            space="0.5">
            <Text fontSize="md" color="text.800">
              {t('signUp.alreadyAccount')}
            </Text>
            <TouchableOpacity onPress={onNavigateSignIn}>
              <Text fontSize="md" color="primary.800" fontWeight="medium">
                {t('signUp.signInNow')}
              </Text>
            </TouchableOpacity>
          </HStack>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  input: {
    height: 40 * scaleH,
    fontSize: 'sm',
    borderRadius: 10,
  },
});

export default SignUpScreen;
