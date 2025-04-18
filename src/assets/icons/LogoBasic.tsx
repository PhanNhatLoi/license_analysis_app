import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function LogoBasicSvg(props: SvgProps) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" {...props}>
      <G
        clipPath="url(#clip0_43_601)"
        stroke="#171717"
        strokeWidth={3.70093}
        strokeLinejoin="round">
        <Path d="M20.31 38.773c-10.194 0-18.46-8.265-18.46-18.459C1.85 10.12 10.116 1.85 20.31 1.85s18.46 8.266 18.46 18.46" />
        <Path d="M7.328 20.31c0-7.16 5.827-12.986 12.986-12.986 7.16 0 12.986 5.827 12.986 12.986M12.801 20.31c0-4.141 3.368-7.509 7.509-7.509" />
      </G>
      <Defs>
        <ClipPath id="clip0_43_601">
          <Path fill="#171717" d="M0 0H40.6239V40.6239H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default LogoBasicSvg;
