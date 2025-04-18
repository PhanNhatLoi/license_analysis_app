import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect, SvgProps} from 'react-native-svg';

function DeleteIcon(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1415_2413)">
        <Path
          d="M9.33335 7.50789V11.5079M6.66669 7.50789V11.5079M4.00002 4.84123V12.8412C4.00002 13.1948 4.1405 13.534 4.39054 13.784C4.64059 14.0341 4.97973 14.1746 5.33335 14.1746H10.6667C11.0203 14.1746 11.3594 14.0341 11.6095 13.784C11.8595 13.534 12 13.1948 12 12.8412V4.84123M2.66669 4.84123H13.3334M4.66669 4.84123L6.00002 2.17456H10L11.3334 4.84123"
          stroke={props.color}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1415_2413">
          <Rect width={16} height={16} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DeleteIcon;
