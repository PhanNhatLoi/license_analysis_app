import {ITheme, useTheme} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';

const DividerWithText = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{t('signIn.or')}</Text>
      <View style={styles.line} />
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.gray[10],
    },
    text: {
      marginHorizontal: 10,
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[100],
    },
  });

export default DividerWithText;
