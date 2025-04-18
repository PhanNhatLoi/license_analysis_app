import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, HStack, Text, useTheme} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {IHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {BackIcon} from '@assets/icons/Back';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {scaleW} from '@utils/dimensionUtil';

type HeaderProps = {
  colorBackIcon?: string;
  title?: string;
  rightElement?: ReactNode;
  onPressBack?: () => void;
  pt?: IHStackProps['pt'];
  pb?: IHStackProps['pb'];
  showBack?: boolean;
  colorTitle?: string;
} & IHStackProps;

const ScreenHeader = (props: HeaderProps) => {
  const theme = useTheme();
  const {
    colorBackIcon = theme.colors.neutral[100],
    title,
    rightElement,
    onPressBack,
    showBack = true,
  } = props;
  const navigation = useNavigation();
  return (
    <HStack
      zIndex={1000}
      justifyContent="space-between"
      px="4"
      pb="3"
      alignItems="center"
      style={styles.shadow}
      {...props}>
      {showBack ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onPressBack ? onPressBack : () => navigation.goBack()}>
          <BackIcon fill={colorBackIcon} />
        </TouchableOpacity>
      ) : (
        <Box w="12" />
      )}
      <Text
        fontSize="lg"
        fontWeight="500"
        color={props.colorTitle || 'neutral.100'}>
        {title}
      </Text>
      {rightElement || <Box w="12" backgroundColor={'red.100'} />}
    </HStack>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    justifyContent: 'center',
    height: 40 * scaleW,
    width: 40 * scaleW,
  },
});

export default ScreenHeader;
