import {
  StyleSheet,
  SafeAreaView as SafeAreaViewNative,
  Platform,
  ViewProps,
  StyleProp,
} from 'react-native';
import React from 'react';
import {useTheme} from 'native-base';
import {ViewStyle} from 'react-native';

export const SafeAreaView = ({
  children,
  containerStyle,
}: ViewProps & {containerStyle?: StyleProp<ViewStyle>}) => {
  const theme = useTheme();
  return (
    <SafeAreaViewNative
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {paddingTop: Platform.OS === 'android' ? theme.space[4] : 0},
        containerStyle,
      ]}>
      {children}
    </SafeAreaViewNative>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
