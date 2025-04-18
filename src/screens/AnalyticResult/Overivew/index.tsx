import {scaleH, scaleW} from '@utils/dimensionUtil';
import {HStack, ITheme, Text, VStack, View, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';
import {AnalyticsResultDetailDataType} from '../types';
import React from 'react';

type Props = {
  results: AnalyticsResultDetailDataType[];
  icon: React.ReactNode;
  title: string;
};
const OverviewResult = (props: Props) => {
  const {results, title, icon} = props;
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      <HStack
        backgroundColor="primary.100"
        justifyContent="center"
        space="4"
        py="2.5"
        roundedBottomLeft="xl"
        roundedBottomRight="xl">
        {icon}
        <Text fontSize="lg" fontWeight="bold" color="primary.500">
          {title}
        </Text>
      </HStack>
      <VStack
        mt="5"
        rounded="xl"
        px="3"
        py="5"
        borderWidth="2"
        borderColor="primary.500"
        backgroundColor="#fff">
        {results?.map((item: AnalyticsResultDetailDataType, index: number) => {
          return (
            <View
              key={`overview_key_${index + 1}`}
              style={styles.marginBottom10}>
              <Text style={styles.titleText}>{item.part}:</Text>
              {item.overview.map((overview: string, id: number) => {
                return (
                  <Text
                    style={styles.basicText}
                    key={`overview_key_${index + 1}_${id}`}>
                    • {overview}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </VStack>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    marginBottom10: {
      marginBottom: 10 * scaleW,
    },
    titleText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '700',
      lineHeight: 19.36 * scaleH,
      color: theme.colors.neutral[100],
    },
    basicText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '400',
      lineHeight: 26 * scaleH,
      color: theme.colors.neutral[100],
    },
  });

export default OverviewResult;
