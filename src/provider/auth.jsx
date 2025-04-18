import {useState, useContext, createContext, useEffect} from 'react';
import {api} from './api';
import {useTranslation} from 'react-i18next';
import {useAsyncStorage} from 'src/hooks/useLocalStorage';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {storeAccount} from '@redux/slice/account';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const {t} = useTranslation();
  const {removeItem} = useAsyncStorage();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [user, setUser] = useState(undefined);

  const handleLogin = async ({email, password}) => {
    const parseEmail = email?.toLowerCase();
    console.log('parseEmail', parseEmail);
    try {
        const res = await api.post('/auth/sign-in', {
          email,
          password,
        });
        if (res && res?.data && res?.data?.response) {
          const token = res?.data?.response.accessToken;
          dispatch(storeAccount(res?.data?.response));
          return token;
        }
    } catch (e) {
       if (e?.response?.data?.details?.includes('netinfo_disconnect_alert')) {
        Alert.alert(t(e?.response?.data?.details));
        return;
      }
      if (e?.response?.data?.details?.includes('Deleted')) {
        Alert.alert(t('Error.userIsDeleted'));
        return;
      }
      if (e?.response?.data?.details?.includes('not found')) {
        Alert.alert(t('forgotPassword.userNotFound'));
        return;
      }
      if (e?.response?.data?.details?.includes('not activated')) {
        // Alert.alert(t('Error.userEmailNotActive'));
        return 'NO_ACTIVE';
      }
      // console.log("login error",e?.response?.data);
      Alert.alert(t('signIn.wrongAccount'));
    }
  };


  const handleLogout = async () => {
    setToken('');
    await removeItem('token');
    setUser();
    await removeItem('user');
  };

  const value = {
    token,
    setToken,
    user,
    setUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
