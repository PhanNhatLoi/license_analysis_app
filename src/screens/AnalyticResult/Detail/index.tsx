import {scaleH, scaleW} from '@utils/dimensionUtil';
import {HStack, ITheme, Text, VStack, View, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';
import {AnalyticsResultDetailDataType} from '../types';
import SuggestionIcon from '@assets/icons/Suggestion';
import {PartIcon} from '../constants';
import {useTranslation} from 'react-i18next';

type Props = {
  results: AnalyticsResultDetailDataType[];
  icon: React.ReactNode;
  title: string;
};
const DetailResult = (props: Props) => {
  const {results, title, icon} = props;
  const theme = useTheme();
  const styles = createStyles(theme);
  const {t} = useTranslation();
  return (
    <View>
      <HStack
        backgroundColor="primary.100"
        justifyContent="center"
        alignItems="center"
        space="4"
        padding="10"
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
              key={`humanlogy_key_${index + 1}`}
              style={[
                styles.marginBottom10,
                {paddingVertical: 12 * scaleH, paddingHorizontal: 20 * scaleW},
              ]}>
              <View style={styles.row}>
                {PartIcon[item.part as keyof typeof PartIcon]}
                <View style={styles.marginRight8} />
                <Text style={styles.titleText}>{item.part}:</Text>
              </View>
              {item.humanlogy.map((humanlogy: string, id: number) => {
                return (
                  <Text
                    style={styles.basicText}
                    key={`humanlogy_key_${index + 1}_${id}`}>
                    • {humanlogy}
                  </Text>
                );
              })}
              <View style={styles.marginTop10}>
                <Text style={styles.titleText2}>
                  {t('AnalyticResult.suggest')}:
                </Text>
                <View style={styles.row}>
                  <SuggestionIcon style={styles.marginRight8} />
                  <Text style={styles.basicText}>{item.suggestion}</Text>
                </View>
              </View>
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
    marginTop10: {
      marginTop: 10 * scaleW,
    },
    marginRight8: {
      marginRight: 8 * scaleW,
    },
    titleText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '700',
      lineHeight: 19.36 * scaleH,
      color: theme.colors.neutral[100],
    },
    titleText2: {
      fontSize: theme.fontSizes.md,
      fontWeight: '700',
      lineHeight: 19.36 * scaleH,
      color: theme.colors.second[500],
    },
    basicText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '400',
      lineHeight: 26 * scaleH,
      color: theme.colors.neutral[100],
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default DetailResult;
