import React, {useEffect} from 'react';
import NestingNavigation from '@navigations/NestingNavigation';
import {defaultTheme} from '@theme/index';
import {NativeBaseProvider} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import AuthProvider from 'src/provider/auth';
import {PersistGate} from 'redux-persist/integration/react';
import {Platform} from 'react-native';
import {persistor} from '@redux/store';
import initI18n from '@translations/index';
import NetInfoScreen from '@utils/netInfo';

const App = () => {
  const onBeforeLift = () => {
    initI18n();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={onBeforeLift}>
      <NativeBaseProvider theme={defaultTheme}>
        <AuthProvider>
          <NestingNavigation />
        </AuthProvider>
        <NetInfoScreen />
      </NativeBaseProvider>
    </PersistGate>
  );
};

export default App;
