module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.png', '.jpg'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          // '@apis': './src/apis',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@redux': './src/redux',
          '@type': './src/type',
          '@navigations': './src/navigations',
          '@theme': './src/theme',
          '@translations': './src/translations',
          '@hooks': './src/hooks',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        allowUndefined: true,
      },
    ],
    // 'react-native-reanimated/plugin',
  ],
};
