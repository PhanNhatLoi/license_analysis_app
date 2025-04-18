import {scaleH, scaleW} from '@utils/dimensionUtil';
import {HStack, ITheme, Text, VStack, View, useTheme} from 'native-base';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

type Props = {
  result: string;
  icon: React.ReactNode;
  title: string;
};
const ImpressionResult = (props: Props) => {
  const {result, title, icon} = props;
  const theme = useTheme();
  const styles = createStyles(theme);
  const {t} = useTranslation();

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
        <View style={styles.marginBottom10}>
          <Text style={styles.basicText}>
            <Text style={styles.titleText}>
              {t('AnalyticResult.comment')}:{' '}
            </Text>
            {result}
          </Text>
        </View>
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
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
    },
    basicText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '400',
      lineHeight: 26 * scaleH,
      color: theme.colors.neutral[100],
    },
  });

export default ImpressionResult;
