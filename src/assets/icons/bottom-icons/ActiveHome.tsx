import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  SvgProps,
} from 'react-native-svg';

export const ActiveHomeIcon = (props: SvgProps) => (
  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
    <Path
      d="M11.758 2.574a1.531 1.531 0 011.884 0l7.97 6.266a.75.75 0 00.927-1.18l-7.97-6.265a3.03 3.03 0 00-3.738 0L2.86 7.66a.75.75 0 00.928 1.18l7.969-6.266z"
      fill="#6DF9CE"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.37 10.75a3 3 0 011.08 2.304v7.196a3 3 0 01-3 3H5.95a3 3 0 01-3-3v-7.196a3 3 0 011.08-2.305l7.71-6.425a1.5 1.5 0 011.92 0l7.71 6.425zm-1.92 11H17.2V15a2.25 2.25 0 00-2.25-2.25h-4.5A2.25 2.25 0 008.2 15v6.75H5.95a1.5 1.5 0 01-1.5-1.5v-7.196a1.5 1.5 0 01.54-1.152l7.71-6.426 7.71 6.426a1.5 1.5 0 01.54 1.152v7.196a1.5 1.5 0 01-1.5 1.5zM15.7 15v6.75h-6V15a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75z"
      fill="#6DF9CE"
    />
    <Path
      d="M15.7 15v6.75h-6V15a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75z"
      fill="#6DF9CE"
    />
  </Svg>
);
