import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect, SvgProps} from 'react-native-svg';

function PencilIcon(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1415_2404)">
        <G clipPath="url(#clip1_1415_2404)">
          <Path
            d="M9.64036 5.69271L10.389 6.44136L3.15733 13.6571H2.42461V12.9244L9.64036 5.69271ZM12.5076 0.914062C12.3084 0.914062 12.1014 0.993707 11.95 1.14503L10.4926 2.60252L13.4792 5.58917L14.9367 4.13168C15.2473 3.82107 15.2473 3.30339 14.9367 3.0087L13.073 1.14503C12.9137 0.985742 12.7146 0.914062 12.5076 0.914062ZM9.64036 3.45471L0.831726 12.2633V15.25H3.81838L12.627 6.44136L9.64036 3.45471Z"
            fill="#161719"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1415_2404">
          <Rect width={16} height={16} fill="white" />
        </ClipPath>
        <ClipPath id="clip1_1415_2404">
          <Rect width={16} height={16} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PencilIcon;
