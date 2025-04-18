import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback} from 'react';
import {ITheme, ScrollView, useTheme} from 'native-base';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import LogoBasicSvg from '@assets/icons/LogoBasic';
import {Images} from '@assets/images';
import Swiper from 'react-native-swiper';
import ArrowRightIcon from '@assets/icons/ArrowRight';
import {useTranslation} from 'react-i18next';
import {IData, IUser, RootStackScreenProps} from '@type';
import {Routes} from '@navigations/Routes';
import StatusBar from '@components/headers/StatusBar';
import {accountSelector} from '@redux/selectors/accountSelector';
import {useSelector} from 'react-redux';
import {initAppSelector} from '@redux/selectors/initAppSelector';

const HomeScreen = ({route, navigation}: RootStackScreenProps<'Home'>) => {
  const theme = useTheme();
  const account = useSelector(accountSelector);
  const dataApp = useSelector(initAppSelector);
  const {userInfo} = account;
  const styles = createStyles(theme);
  const {t} = useTranslation();

  const ServiceItem = useCallback(
    ({
      icon,
      text,
      onPress,
    }: {
      icon: keyof typeof Images;
      text?: string;
      onPress: () => void;
    }) => {
      return (
        <TouchableOpacity style={styles.card02} onPress={onPress}>
          <Image
            source={Images.gradientBackground02}
            style={{position: 'absolute'}}
          />
          <Image source={Images[icon]} style={styles.image04} />
          <Text style={styles.text05}>{text}</Text>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <View>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <View style={styles.backgroundScreen} />
      <View style={styles.topBar}>
        <View style={styles.topBarItem}>
          <LogoBasicSvg />
          <Text style={styles.logoText}>LicensePlateAI</Text>
        </View>
        <View style={styles.topBarItem}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Profile)}>
            <View>
              <Image
                style={{
                  height: 40 * scaleW,
                  width: 40 * scaleW,
                  borderRadius: 100,
                  backgroundColor: theme.colors.neutral[10],
                }}
                source={
                  (userInfo as IUser)?.avatar
                    ? {uri: userInfo.avatar}
                    : Images.defaultAvatar
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <Swiper
            autoplay
            dotStyle={styles.dot}
            activeDotStyle={styles.dotActive}>
            {((dataApp?.results as IData[]) || []).map((slide, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(Routes.AnalyticsResultImage, {
                      data: slide,
                    });
                  }}
                  key={`slide_key_${index + 1}`}
                  style={styles.slide}>
                  <Image
                    source={{
                      uri: slide.imageUri,
                    }}
                    style={styles.image}
                    alt={slide.imageUri}
                  />
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </View>

        <TouchableOpacity
          style={styles.card01}
          onPress={() => {
            navigation.navigate(Routes.RecordingInstruction);
          }}>
          <Image source={Images.gradientBackground} style={styles.image02} />
          <Image source={Images.robotIcon} style={styles.image03} />
          <View style={[styles.justifyBetween, styles.cardItem]}>
            <View>
              <Text style={styles.text01}>{t('Home.start')}</Text>
              <Text style={styles.text02}>
                {t('Home.facialAssessmentOfYou')}
              </Text>
            </View>
            <ArrowRightIcon fill={theme.colors.neutral[100]} />
          </View>
        </TouchableOpacity>

        <View style={[styles.justifyBetween, {marginTop: 20 * scaleH}]}>
          <Text style={styles.text03}>{t('Home.outstandingService')}</Text>
        </View>
        <View style={[styles.justifyBetween, {marginTop: 12 * scaleH}]}>
          <View>
            <ServiceItem
              icon="scanFace"
              text={t('Home.facialAssessment')}
              onPress={() => navigation.navigate('RecordingInstruction')}
            />

            <ServiceItem
              icon="spa"
              text={t('Home.naturalBeautyTips')}
              onPress={() =>
                Alert.alert(t('Profile.notification'), t('Home.updateFeature'))
              }
            />
          </View>
          <View>
            <View
              style={{
                marginTop: 24 * scaleH,
              }}
            />
            <ServiceItem
              icon="humanlogy"
              text={t('Home.physiognomy')}
              onPress={() => navigation.navigate('AnalyticHistory')}
            />
            <ServiceItem
              icon="compare"
              text={t('Home.compareFaces')}
              onPress={() =>
                Alert.alert(t('Profile.notification'), t('Home.updateFeature'))
              }
            />
          </View>
          <View>
            <ServiceItem
              icon="personWork"
              text={t('Home.suitableCareer')}
              onPress={() =>
                Alert.alert(t('Profile.notification'), t('Home.noEvent'))
              }
            />
            <ServiceItem
              icon="scanFace02"
              text={t('Home.analyzeFacialProportions')}
              onPress={() =>
                Alert.alert(t('Profile.notification'), t('Home.updateFeature'))
              }
            />
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    backgroundScreen: {
      position: 'absolute',
      width: '100%',
      height: 388 * scaleH,
      backgroundColor: theme.colors.primary[500],
      borderBottomLeftRadius: 17 * scaleW,
      borderBottomRightRadius: 17 * scaleW,
    },
    container: {
      paddingHorizontal: 24 * scaleW,
      paddingBottom: (Platform.OS === 'android' ? 125 : 130) * scaleH,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 24 * scaleW,
      paddingBottom: 10 * scaleH,
    },
    topBarItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      fontWeight: '600',
      fontSize: theme.fontSizes.md,
      marginLeft: 6.58 * scaleW,
      lineHeight: 19.36 * scaleH,
      color: theme.colors.neutral[100],
    },
    bellIcon: {
      marginRight: 24 * scaleW,
    },
    wrapper: {
      height: 200 * scaleH,
    },
    slide: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      transform: [{translateY: 20 * scaleH}],
      backgroundColor: theme.colors.neutral[40],
    },
    dotActive: {
      transform: [{translateY: 20 * scaleH}],
      width: 16 * scaleW,
      backgroundColor: theme.colors.neutral[100],
    },
    image: {width: '100%', borderRadius: 8 * scaleW, height: 160},
    card01: {
      marginTop: 25 * scaleH,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    cardItem: {flex: 1, paddingRight: 21 * scaleW, alignItems: 'center'},
    image02: {width: '100%', borderRadius: 12 * scaleW, position: 'absolute'},
    image03: {
      height: 83 * scaleH,
      width: 79.73 * scaleW,
      marginLeft: 11 * scaleW,
      marginTop: 4.2 * scaleH,
      marginRight: 4 * scaleW,
    },
    justifyBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text01: {
      fontWeight: '700',
      fontSize: theme.fontSizes.xl,
      lineHeight: 24.2 * scaleH,
      color: theme.colors.neutral[100],
    },
    text02: {
      marginTop: 8 * scaleH,
      fontWeight: '400',
      fontSize: theme.fontSizes.xs,
      lineHeight: 16 * scaleH,
      color: theme.colors.neutral[1000],
    },
    text03: {
      fontSize: theme.fontSizes.md,
      fontWeight: '700',
      lineHeight: 19.36 * scaleH,
      color: theme.colors.neutral[100],
    },
    text04: {
      fontSize: theme.fontSizes.xs,
      fontWeight: '500',
      lineHeight: 16 * scaleH,
      color: theme.colors.neutral[100],
    },
    viewButton: {
      shadowColor: '#0000000D',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 1,
      shadowRadius: 5,
      backgroundColor: theme.colors.neutral[10],
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8 * scaleW,
      paddingVertical: 4 * scaleH,
      borderRadius: 48 * scaleW,
    },
    card02: {
      height: 136 * scaleH,
      width: 100 * scaleW,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
      marginBottom: 12 * scaleH,
      position: 'relative',
      paddingVertical: 12 * scaleH,
      paddingHorizontal: 9 * scaleW,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card03: {
      height: 12 * scaleH,
      width: 100 * scaleW,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
      marginBottom: 12 * scaleH,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text05: {
      fontSize: theme.fontSizes.xs,
      fontWeight: '400',
      lineHeight: 16 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[100],
    },
    image04: {
      marginBottom: 8 * scaleH,
    },
  });
