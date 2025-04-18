import {useTheme} from 'native-base';
import * as React from 'react';
import Svg, {Circle, SvgProps} from 'react-native-svg';

function CheckboxIcon(
  props: SvgProps & {enable: boolean; color?: string; activeColor?: string},
) {
  const theme = useTheme();
  const {
    enable = false,
    activeColor = theme.colors.second[500],
    color = theme.colors.neutral[30],
  } = props;
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Circle
        cx={10}
        cy={10}
        r={9.5}
        fill="#fff"
        stroke={enable ? activeColor : color}
      />
      {enable && <Circle cx={10} cy={10} r={7} fill={activeColor} />}
    </Svg>
  );
}

export default CheckboxIcon;
