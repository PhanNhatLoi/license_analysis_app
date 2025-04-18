import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import ScreenHeader from '@components/headers/ScreenHeader';
import {ITheme, ScrollView, View, useTheme} from 'native-base';
import StatusBar from '@components/headers/StatusBar';
import {scaleW} from '@utils/dimensionUtil';
import {useTranslation} from 'react-i18next';

const PrivacyPolicyScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {t} = useTranslation();

  return (
    <View flex={1}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('privacyPolicy.text1')}
        backgroundColor={theme.colors.primary[500]}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>{t('privacyPolicy.text2')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text3')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text4')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text5')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text6')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text7')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text8')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text9')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text7b')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text8b')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text9b')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text10')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text11')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text12')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text13')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text15')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text16')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text17')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text18')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text19')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text20')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text21')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text22')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text23')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text24')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text25')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text26')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text27')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text28')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text29')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text30')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text31')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text32')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text33')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text34')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text35')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text36')}</Text>
        <Text style={styles.subheading}>{t('privacyPolicy.text37')}</Text>
        <Text style={styles.paragraph}>{t('privacyPolicy.text38')}</Text>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginVertical: 15,
    },
    contentContainer: {
      paddingHorizontal: 24 * scaleW,
      paddingTop: 24 * scaleW,
      paddingBottom: 32 * scaleW,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.neutral[100],
    },
    h1: {
      fontSize: 27,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.neutral[100],
    },
    subheading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 15,
      marginBottom: 5,
      color: theme.colors.neutral[100],
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.colors.neutral[900],
    },
  });

export default PrivacyPolicyScreen;
