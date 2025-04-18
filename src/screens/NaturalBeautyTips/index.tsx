import ScreenHeader from '@components/headers/ScreenHeader';
import CardBeautyTips from '@screens/NaturalBeautyTips/CardBeautyTips';
import {listBeautyTips} from '@screens/NaturalBeautyTips/mockData';
import {RootStackScreenProps} from '@type';
import {scaleW} from '@utils/dimensionUtil';
import {ITheme, useTheme, View} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet} from 'react-native';
import StatusBar from '@components/headers/StatusBar';

export default function NaturalBeautyTips({
  navigation,
}: RootStackScreenProps<'NaturalBeautyTips'>) {
  const theme = useTheme();
  const {t} = useTranslation();
  const styles = createStyles(theme);
  return (
    <View flex={1} style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('Home.naturalBeautyTips')}
        backgroundColor="primary.500"
      />
      <View style={styles.content}>
        <FlatList
          data={listBeautyTips}
          numColumns={1}
          renderItem={({item}) => (
            <CardBeautyTips {...item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral[20],
    },
    content: {
      padding: 24 * scaleW,
    },
  });
