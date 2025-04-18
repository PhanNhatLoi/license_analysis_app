import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {ITheme, useTheme, Image} from 'native-base';
import {SafeAreaView} from '@components/views/SafeAreaView';

import {RootStackScreenProps} from '@type';
import {useTranslation} from 'react-i18next';
import Swiper from 'react-native-swiper';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {sliderType} from '@screens/Home/types';
import {Images} from '@assets/images';
import ArrowRightSingleIcon from '@assets/icons/ArrowRightSingle';
import {useAsyncStorage} from 'src/hooks/useLocalStorage';
import {useDispatch} from 'react-redux';
import {firstOpenApp} from '@redux/slice/initApp';

const OnboardingScreen = ({navigation}: RootStackScreenProps<'Onboarding'>) => {
  const theme = useTheme();
  const {setItem} = useAsyncStorage();
  const dispatch = useDispatch();
  const styles = createStyles(theme);
  const {t} = useTranslation();
  const swiperRef = useRef<Swiper>(null);
  const slider: (sliderType & {
    title: string;
    description: string;
    button: React.ReactNode;
  })[] = [
    {
      id: 1,
      src: 'onboarding_01',
      title: t('Onboarding.facialAnalysis'),
      description: t('Onboarding.facialAnalysisDescription'),
      button: (
        <TouchableOpacity
          style={styles.buttonArrow}
          onPress={() => {
            if (swiperRef.current) {
              swiperRef.current && swiperRef.current?.scrollBy(1, true);
            }
          }}>
          <ArrowRightSingleIcon />
        </TouchableOpacity>
      ),
    },
    {
      id: 2,
      src: 'onboarding_02',
      title: t('Onboarding.facialAnalysis2'),
      description: t('Onboarding.facialAnalysisDescription2'),
      button: (
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() => {
            //todo save storage
            dispatch(firstOpenApp());
            navigation.navigate('SignIn');
          }}>
          <Text style={styles.beginText}>{t('Onboarding.begin')}</Text>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <SafeAreaView containerStyle={styles.container}>
      <Swiper
        ref={swiperRef}
        dotStyle={styles.dot}
        activeDotStyle={styles.dotActive}
        loop={false}>
        {slider.map((slide, index) => {
          return (
            <View key={`slide_key_${index + 1}`} style={styles.slide}>
              <Image
                source={Images[slide.src]}
                width={300 * scaleW}
                height={280 * scaleH}
                resizeMode="contain"
              />
              <View style={styles.text}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
              <View style={styles.button}>{slide.button}</View>
            </View>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral[10],
    },
    dot: {
      transform: [{translateY: -100 * scaleH}],
      backgroundColor: theme.colors.gray[10],
    },
    dotActive: {
      transform: [{translateY: -100 * scaleH}],
      width: 16 * scaleW,
      backgroundColor: theme.colors.primary[500],
    },
    slide: {
      flex: 1,
      padding: 27 * scaleH,
      width: '100%',
      alignItems: 'center',
      marginBottom: 50 * scaleH,
    },
    button: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonArrow: {
      height: 40 * scaleW,
      width: 40 * scaleW,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      backgroundColor: theme.colors.primary[500],
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    buttonText: {
      height: 48 * scaleH,
      width: 140 * scaleW,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8 * scaleH,
      backgroundColor: theme.colors.primary[500],
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    title: {
      fontSize: theme.fontSizes['2xl'],
      fontWeight: '700',
      lineHeight: 29.5 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[100],
    },
    description: {
      fontSize: theme.fontSizes.md,
      lineHeight: 26 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[800],
      marginTop: 8 * scaleH,
    },
    text: {
      marginTop: 56 * scaleH,
    },
    beginText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
    },
  });
