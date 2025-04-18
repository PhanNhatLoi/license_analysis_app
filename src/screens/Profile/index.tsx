import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ITheme, Modal, ScrollView, useTheme} from 'native-base';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {Images} from '@assets/images';
import {menuItemType} from './types';
import ProfileInfoIcon from '@assets/icons/ProfileInfo';
import ArrowRightSingleIcon from '@assets/icons/ArrowRightSingle';
import SettingIcon from '@assets/icons/Setting';
import SupportIcon from '@assets/icons/Support';
import QuestionIcon from '@assets/icons/Question';
import LogoutIcon from '@assets/icons/Logout';
import {RootStackScreenProps} from '@type';
import {useTranslation} from 'react-i18next';
import StatusBar from '@components/headers/StatusBar';
import {accountSelector} from '@redux/selectors/accountSelector';
import {useDispatch, useSelector} from 'react-redux';
import {resetAccount} from '@redux/slice/account';
import {saveVideo} from '@redux/slice/initApp';
import AnalyticsIcon from '@assets/icons/AnalyticsIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}: RootStackScreenProps<'Profile'>) => {
  const theme = useTheme();
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();
  const styles = createStyles(theme);
  const [showModalLogout, setShowModalLogout] = useState<boolean>(false);
  const {t} = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const {userInfo} = account;

  const menusItem: menuItemType[] = [
    {
      id: 1,
      icon: <ProfileInfoIcon />,
      label: t('Profile.profileInfo'),
      onClick: () => {
        navigation.navigate('ProfileInfo');
      },
      required: true,
    },
    {
      id: 2,
      icon: <AnalyticsIcon />,
      label: t('Profile.analytic'),
      onClick: () => {
        navigation.navigate('AnalyticHistory');
      },
    },
    // {
    //   id: 3,
    //   icon: <InviteIcon />,
    //   label: t('Profile.inviteFriend'),
    //   onClick: () => {
    //     navigation.navigate('InviteFriend');
    //   },
    // },
    // {
    //   id: 4,
    //   icon: <BellIcon />,
    //   label: t('Profile.notification'),
    //   onClick: () => {
    //     navigation.navigate('Notification');
    //   },
    // },
    {
      id: 5,
      icon: <SettingIcon />,
      label: t('Profile.settings'),
      onClick: () => {
        navigation.navigate('Setting');
      },
    },
    {
      id: 6,
      icon: <QuestionIcon />,
      label: t('Profile.policy'),
      onClick: () => {},
    },
    {
      id: 7,
      icon: <SupportIcon />,
      label: t('Profile.supportCenter'),
      onClick: () => {},
    },
  ];

  const RenderIcon = useCallback(({icon, label, onClick}: menuItemType) => {
    return (
      <TouchableOpacity style={styles.renderIconStyle} onPress={onClick}>
        <View style={styles.itemLeft}>
          <View style={styles.iconMenu}>{icon}</View>
          <Text style={styles.menuText}>{label}</Text>
        </View>
        <ArrowRightSingleIcon />
      </TouchableOpacity>
    );
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setAvatar(parsedUser.avatar || null);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <View style={styles.backgroundScreen} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 110 * scaleH : 90 * scaleH,
        }}>
        <View style={styles.center}>
          <View style={styles.headerCard}>
            <View style={styles.avatarCard}>
              <Image
                source={avatar ? {uri: avatar} : Images.defaultAvatar}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={styles.text01}>{userInfo?.name || 'Guest'}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.menuList}>
            <FlatList
              scrollEnabled={false}
              data={menusItem}
              renderItem={({item}) => {
                if (!account?.accessToken && item.required) return null;
                return <RenderIcon {...item} />;
              }}
            />
          </View>
          {account?.accessToken ? (
            <TouchableOpacity
              style={styles.logOutButton}
              onPress={() => {
                setShowModalLogout(true);
              }}>
              <LogoutIcon />
              <Text style={styles.logOutText}>{t('Profile.logout')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.logOutButton}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={styles.logOutText}>{t('Profile.login')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal isOpen={showModalLogout} style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitleText}>{t('Profile.logout')}</Text>
          <Text style={styles.modalDesText}>{t('Profile.confirmLogout')}</Text>
          <View style={styles.flexRowJustifySpace}>
            <TouchableOpacity
              style={[styles.buttonModal, styles.buttonCancel]}
              onPress={() => {
                setShowModalLogout(false);
              }}>
              <Text style={styles.itemText}>{t('Profile.cancel')}</Text>
            </TouchableOpacity>
            <View style={{width: 20 * scaleW}} />
            <TouchableOpacity
              style={[styles.buttonModal, styles.buttonDelete]}
              onPress={async () => {
                dispatch(resetAccount());
                dispatch(saveVideo({video: undefined}));
                navigation.replace('SignIn');
                setShowModalLogout(false);
              }}>
              <Text
                style={[styles.itemText, {color: theme.colors.neutral[10]}]}>
                {t('Profile.logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      // paddingHorizontal: 24 * scaleW,
      alignItems: 'center',
      backgroundColor: theme.colors.neutral[20],
    },
    backgroundScreen: {
      position: 'absolute',
      width: '100%',
      height: 340 * scaleH,
      backgroundColor: theme.colors.primary[500],
      borderBottomLeftRadius: 17 * scaleW,
      borderBottomRightRadius: 17 * scaleW,
    },
    headerCard: {
      width: 120 * scaleW,
      marginTop: 40 * scaleH,
      marginBottom: 12 * scaleH,
    },
    image: {
      height: 120 * scaleW,
      width: 120 * scaleW,
      borderRadius: 100,
      borderColor: theme.colors.neutral[10],
      borderWidth: 3 * scaleW,
    },
    cameraIcon: {
      width: 34 * scaleW,
      height: 34 * scaleW,
      backgroundColor: theme.colors.neutral[10],
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -4 * scaleH,
      right: 8 * scaleW,
    },
    avatarCard: {
      position: 'relative',
    },
    text01: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '500',
      lineHeight: 21 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[100],
      flex: 1,
      paddingHorizontal: 40,
    },
    menuList: {
      backgroundColor: theme.colors.neutral[10],
      paddingHorizontal: 20 * scaleW,
      paddingTop: 20 * scaleW,
      borderRadius: 12 * scaleW,
      width: '100%',
    },
    content: {
      paddingHorizontal: 24 * scaleW,
      width: '100%',
      marginTop: 20 * scaleH,
    },
    iconMenu: {
      backgroundColor: theme.colors.primary[500],
      borderRadius: 8 * scaleW,
      height: 40 * scaleW,
      width: 40 * scaleW,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12 * scaleW,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
    },
    logOutButton: {
      backgroundColor: theme.colors.primary[500],
      borderRadius: 8 * scaleW,
      width: '100%',
      height: 48 * scaleH,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20 * scaleH,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    logOutText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
      marginLeft: 10 * scaleW,
    },
    center: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    renderIconStyle: {
      width: '100%',
      marginBottom: 20 * scaleH,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modal: {
      paddingHorizontal: 24 * scaleW,
    },
    modalContent: {
      width: '100%',
      paddingHorizontal: 20 * scaleW,
      paddingVertical: 24 * scaleH,
      borderRadius: 12 * scaleW,
      backgroundColor: theme.colors.neutral[10],
    },
    modalTitleText: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '700',
      lineHeight: 21.78 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[100],
    },
    modalDesText: {
      marginTop: 12 * scaleH,
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[900],
    },
    flexRowJustifySpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 14 * scaleW,
      paddingVertical: 12 * scaleH,
      marginTop: 36 * scaleH,
      borderRadius: 8 * scaleW,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    buttonCancel: {
      backgroundColor: theme.colors.primary[500],
    },
    buttonDelete: {
      backgroundColor: theme.colors.neutral[100],
    },
    itemText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
    },
  });
