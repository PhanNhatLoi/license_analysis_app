import * as React from 'react';
import Svg, {Mask, Path, G, SvgProps} from 'react-native-svg';

function CopyButtonIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}>
        <Path fill="#D9D9D9" d="M0 0H20V20H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M15.833 15.833H6.667c-.459 0-.851-.163-1.177-.49A1.605 1.605 0 015 14.168V2.5c0-.458.163-.85.49-1.177.326-.327.718-.49 1.177-.49h5.146a1.646 1.646 0 011.166.48l4.042 4.041a1.646 1.646 0 01.48 1.167v7.646c-.001.458-.164.85-.49 1.177-.327.326-.72.49-1.178.49zm0-9.166h-2.916c-.348 0-.643-.122-.886-.365a1.206 1.206 0 01-.364-.885V2.5h-5v11.667h9.166v-7.5zm-12.5 12.5c-.458 0-.85-.164-1.177-.49a1.605 1.605 0 01-.49-1.177V6.667c0-.237.08-.434.24-.594.16-.16.358-.24.594-.24s.434.08.594.24c.16.16.24.357.24.594V17.5h8.333c.236 0 .434.08.593.24.16.16.24.357.24.593s-.08.434-.24.594a.807.807 0 01-.593.24H3.333z"
          fill="#1C1B1F"
        />
      </G>
    </Svg>
  );
}

export default CopyButtonIcon;
