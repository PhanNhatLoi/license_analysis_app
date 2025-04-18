import {scaleH, scaleW} from '@utils/dimensionUtil';
import {HStack, ITheme, Text, VStack, View, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';

type Props = {
  results: string[];
  icon: React.ReactNode;
  title: string;
};
const IdeaProfessionResult = (props: Props) => {
  const {results, title, icon} = props;
  const theme = useTheme();
  const styles = createStyles(theme);
  const textResult = results[0].split(':') || [];

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
        <View style={{}}>
          <Text style={styles.basicText}>
            <Text style={styles.titleText}>{textResult[0]}: </Text>
            {textResult[1]?.trim()}
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

export default IdeaProfessionResult;
