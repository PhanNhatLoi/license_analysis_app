import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function BellIcon(props: SvgProps) {
  return (
    <Svg width={18} height={21} viewBox="0 0 18 21" fill="none" {...props}>
      <Path
        d="M11.73 15.772v.683a2.73 2.73 0 11-5.46 0v-.683m10.053-1.389c-1.096-1.34-1.869-2.023-1.869-5.719 0-3.384-1.728-4.59-3.15-5.176a.76.76 0 01-.425-.45C10.629 2.19 9.93 1.441 9 1.441s-1.63.748-1.877 1.598a.753.753 0 01-.424.45c-1.424.586-3.15 1.787-3.15 5.175-.003 3.696-.776 4.379-1.872 5.72-.453.554-.056 1.388.738 1.388H15.59c.79 0 1.184-.836.733-1.389z"
        stroke="#171717"
        strokeWidth={2.11206}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BellIcon;
