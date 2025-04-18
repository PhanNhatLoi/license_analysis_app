import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function LogoutIcon(props: SvgProps) {
  return (
    <Svg width={19} height={20} viewBox="0 0 19 20" fill="none" {...props}>
      <Path
        d="M14.385 5.115A.91.91 0 0013.1 6.4l2.69 2.691H4.652a.91.91 0 000 1.818H15.79L13.1 13.6a.91.91 0 001.285 1.286l4.243-4.242a.909.909 0 000-1.286l-4.243-4.242z"
        fill="#171717"
      />
      <Path
        d="M8.894 20a.91.91 0 000-1.818h-6.97V1.818h6.97a.91.91 0 000-1.818H1.015a.91.91 0 00-.909.91v18.18c0 .503.407.91.91.91h7.878z"
        fill="#171717"
      />
    </Svg>
  );
}

export default LogoutIcon;
