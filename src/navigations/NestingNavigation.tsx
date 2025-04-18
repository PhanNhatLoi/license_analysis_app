import {createStackNavigator} from '@react-navigation/stack';
import {
  CommonActions,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from '@type';
import {theme} from 'native-base';
import {Routes} from './Routes';
import MainLayout from '@screens/MainLayout';
import RecordingVideoScreen from '@screens/RecordingVideo';
import SignInScreen from '@screens/SignIn';
import SignUpScreen from '@screens/SignUp';
import InviteFriendScreen from '@screens/Profile/InviteFriend';
import SettingScreen from '@screens/Profile/Setting';
import LanguageScreen from '@screens/Profile/Language';
import OnboardingScreen from '@screens/Onboarding';
import AnalyticsResultScreen from '@screens/AnalyticResult';
import ConfirmOTPScreen from '@screens/ConfirmOTP';
import ForgotPasswordScreen from '@screens/ForgotPassword';
import PrivacyPolicyScreen from '@screens/PrivacyPolicy';
import SupportCenterScreen from '@screens/SupportCenter';
import RecordingInstructionScreen from '@screens/RecordingInstruction';
import {useSelector} from 'react-redux';
import {initAppSelector} from '@redux/selectors/initAppSelector';
import {accountSelector} from '@redux/selectors/accountSelector';
import React, {useEffect, useRef} from 'react';
import ReactNaviveVideo from '@components/video';
import TakePhotoScreen from '@screens/TakePhoto';
import Notification from '@screens/Profile/Notification';
import AnalyticHistory from '@screens/Profile/AnalyticHistory';
import AnalyticsResultImageScreen from '@screens/AnalyticResultImage';
import NaturalBeautyTips from '@screens/NaturalBeautyTips';
import DetailBeautyTips from '@screens/NaturalBeautyTips/DetailBeautyTips';

const Stack = createStackNavigator<RootStackParamList>();

const NestingNavigation = () => {
  const initApp = useSelector(initAppSelector);
  const account = useSelector(accountSelector);
  const initialRoute = !initApp?.firstOpen
    ? Routes.Onboarding
    : account?.accessToken
    ? Routes.Home
    : Routes.SignIn;

  const navigateRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  const nextScreen = React.useCallback(
    ({screenNames = []}: {screenNames?: any[]}) => {
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          {
            name: Routes.MainLayout,
          },
          ...screenNames,
        ],
      });

      navigateRef.current?.dispatch(resetAction);
    },
    [navigateRef],
  );

  useEffect(() => {
    if (account?.accessToken && navigateRef?.current?.isReady()) {
      if (initApp?.video) {
        nextScreen({
          screenNames: [
            {
              name: Routes.RecordingInstruction,
            },
            {
              name: Routes.RecordingVideo,
            },
          ],
        });
        return;
      }
      if (navigateRef?.current?.getCurrentRoute()?.name !== Routes.Home) {
        nextScreen({});
        return;
      }
      return;
    }
    if (
      navigateRef?.current?.getCurrentRoute()?.name !== Routes.SignIn &&
      initApp?.firstOpen
    ) {
      nextScreen({
        screenNames: [
          {
            name: Routes.SignIn,
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.accessToken]);

  return (
    <NavigationContainer ref={navigateRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: theme.colors.white},
        }}
        initialRouteName={initialRoute}>
        <Stack.Screen name={Routes.MainLayout} component={MainLayout} />
        <Stack.Screen
          name={Routes.RecordingVideo}
          component={RecordingVideoScreen}
        />
        <Stack.Screen name={Routes.TakePhoto} component={TakePhotoScreen} />
        <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
        <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
        <Stack.Screen
          name={Routes.InviteFriend}
          component={InviteFriendScreen}
        />
        <Stack.Screen name={Routes.Setting} component={SettingScreen} />
        <Stack.Screen name={Routes.Language} component={LanguageScreen} />
        <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen} />
        <Stack.Screen
          name={Routes.AnalyticsResult}
          component={AnalyticsResultScreen}
        />
        <Stack.Screen
          name={Routes.AnalyticsResultImage}
          component={AnalyticsResultImageScreen}
        />
        <Stack.Screen name={Routes.ConfirmOTP} component={ConfirmOTPScreen} />
        <Stack.Screen
          name={Routes.ForgotPassword}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={Routes.PrivacyPolicy}
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          name={Routes.SupportCenter}
          component={SupportCenterScreen}
        />
        <Stack.Screen
          name={Routes.RecordingInstruction}
          component={RecordingInstructionScreen}
        />
        <Stack.Screen
          name={Routes.ReactNaviveVideo}
          component={ReactNaviveVideo}
        />
        <Stack.Screen name={Routes.Notification} component={Notification} />
        <Stack.Screen
          name={Routes.AnalyticHistory}
          component={AnalyticHistory}
        />
        <Stack.Screen
          name={Routes.NaturalBeautyTips}
          component={NaturalBeautyTips}
        />
        <Stack.Screen
          name={Routes.DetailBeautyTips}
          component={DetailBeautyTips}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NestingNavigation;
