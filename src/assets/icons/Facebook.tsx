import { ClipPath, Defs, G, Path, Rect, Svg, SvgProps } from "react-native-svg";

export const FacebookIcon = (props: SvgProps) => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <G clip-path="url(#clip0_39_43)">
      <Path
        d="M24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 17.9895 4.8882 22.954 10.625 23.8542V15.4688H7.57812V12H10.625V9.35625C10.625 6.34875 12.4166 4.6875 15.1576 4.6875C16.4701 4.6875 17.8438 4.92188 17.8438 4.92188V7.875H16.3306C14.84 7.875 14.375 8.80008 14.375 9.75V12H17.7031L17.1711 15.4688H14.375V23.8542C20.1118 22.954 24.5 17.9895 24.5 12Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_39_43">
        <Rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);
