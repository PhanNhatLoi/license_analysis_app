import {StackScreenProps} from '@react-navigation/stack';
import {DetectedDataType} from '@screens/TakePhoto';

export type RootStackParamList = {
  Home: undefined;
  Path: undefined;
  MainLayout: {tabBar?: string; screen?: string};
  FaceAnalytics: undefined;
  RecordingInstruction: undefined;
  RecordingVideo: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Profile: undefined;
  ProfileInfo: undefined;
  InviteFriend: undefined;
  Setting: undefined;
  Language: undefined;
  Onboarding: undefined;
  AnalyticsResult: {videoURI: string | undefined; result: any; image: string};
  ConfirmOTP: {email: string | undefined; type: string};
  ForgotPassword: {step?: number; accessKey?: string};
  PrivacyPolicy: undefined;
  SupportCenter: undefined;
  ReactNaviveVideo: {videoURI: string};
  TakePhoto: undefined;
  Notification: undefined;
  AnalyticHistory: undefined;
  AnalyticsResultImage: {data: IData};
  NaturalBeautyTips: undefined;
  DetailBeautyTips: undefined;
};

export type TypeRoutes = {
  Home: 'Home';
  Profile: 'Profile';
  MainLayout: 'MainLayout';
  FaceAnalytics: 'FaceAnalytics';
  RecordingInstruction: 'RecordingInstruction';
  RecordingVideo: 'RecordingVideo';
  SignIn: 'SignIn';
  SignUp: 'SignUp';
  ProfileInfo: 'ProfileInfo';
  InviteFriend: 'InviteFriend';
  Setting: 'Setting';
  Language: 'Language';
  Onboarding: 'Onboarding';
  AnalyticsResult: 'AnalyticsResult';
  ConfirmOTP: 'ConfirmOTP';
  ForgotPassword: 'ForgotPassword';
  PrivacyPolicy: 'PrivacyPolicy';
  SupportCenter: 'SupportCenter';
  ReactNaviveVideo: 'ReactNaviveVideo';
  TakePhoto: 'TakePhoto';
  Notification: 'Notification';
  AnalyticHistory: 'AnalyticHistory';
  AnalyticsResultImage: 'AnalyticsResultImage';
  NaturalBeautyTips: 'NaturalBeautyTips';
  DetailBeautyTips: 'DetailBeautyTips';
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export interface IUser {
  googleId: string;
  email: string;
  avatar?: string;
  name: string;
  phoneNumber: string;
  analyzedData: any;
}

export interface IData {
  name: string;
  imageUri: string;
  id: string;
  createdDate: string;
  result: {
    generalConsultation: string;
    readLicensePlate: string;
    numerology: string;
  };
}
