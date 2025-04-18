import {
  StatusBar as MyStatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBarProps,
} from 'react-native';

const StatusBar = ({backgroundColor, ...props}: StatusBarProps) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <MyStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = MyStatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default StatusBar;
