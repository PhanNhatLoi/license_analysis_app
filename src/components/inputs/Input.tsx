import {scaleH} from '@utils/dimensionUtil';
import {Input as NativeBaseInput, IInputProps, useTheme} from 'native-base';

interface InputProps extends IInputProps {
  placeholder?: string;
  fontSize?: string;
  color?: string;
  borderRadius?: string;
  borderColor?: string;
  [key: string]: unknown;
}

export default function Input({
  placeholder,
  fontSize,
  color,
  borderRadius,
  borderColor,
  ...props
}: InputProps) {
  const theme = useTheme();

  return (
    <NativeBaseInput
      fontSize={fontSize || 'sm'}
      color={color || theme?.colors?.neutral[1000]}
      borderRadius={borderRadius || 'lg'}
      borderColor={borderColor || theme.colors.neutral[50]}
      backgroundColor={props.backgroundColor || theme.colors.neutral[20]}
      height="10"
      {...props}
    />
  );
}
