import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ArrowRightIcon(props: SvgProps) {
  return (
    <Svg width={16} height={13} viewBox="0 0 16 13" fill="none" {...props}>
      <Path
        d="M9.13 11.928a.625.625 0 00.883 0L15.22 6.72a.625.625 0 000-.883L10.013.628a.624.624 0 10-.884.884l4.142 4.141H1.238a.625.625 0 100 1.25H13.27l-4.142 4.142a.625.625 0 000 .883z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default ArrowRightIcon;
