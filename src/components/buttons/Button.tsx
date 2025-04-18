import {scaleH} from '@utils/dimensionUtil';
import {Center, HStack, ITextProps, Text, useTheme} from 'native-base';
import React, {ReactElement} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';

type ButtonProps = {
  type?: 'fill' | 'outline';
  title?: string;
  width?: number | string;
  height?: number | string;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: any;
  textStyle?: any;
  loading?: boolean;
  icon?: ReactElement;
  borderColor?: string;
  gapButton?: string;
} & ITextProps;

export const Button = ({
  type = 'fill',
  loading = false,
  title = '',
  onPress,
  disabled = false,
  containerStyle,
  color,
  fontStyle,
  fontSize = 'md',
  fontWeight = '600',
  backgroundColor,
  width,
  icon,
  borderColor,
  height,
  gapButton = '3',
}: ButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: width || theme.space.full,
          borderRadius: 8 * scaleH,
          backgroundColor:
            type === 'fill'
              ? disabled
                ? theme.colors.neutral[20]
                : backgroundColor
                ? backgroundColor
                : theme.colors.primary[500]
              : 'transparent',
          borderWidth: type === 'outline' ? 2 * scaleH : 0,
          borderColor: borderColor || theme.colors.primary[500],
        },
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <Center h={'12'}>
          <ActivityIndicator
            color={
              type === 'outline'
                ? theme.colors.second[500]
                : theme.colors.neutral[10]
            }
            size="small"
          />
        </Center>
      ) : (
        <Center h={height || '12'}>
          <HStack space={gapButton} alignItems="center">
            {icon}
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontStyle={fontStyle}
              color={
                disabled
                  ? theme?.colors?.neutral[20]
                  : color
                  ? color
                  : type === 'fill'
                  ? theme.colors.neutral[100]
                  : theme.colors.gradient[300]
              }>
              {title}
            </Text>
          </HStack>
        </Center>
      )}
    </TouchableOpacity>
  );
};
