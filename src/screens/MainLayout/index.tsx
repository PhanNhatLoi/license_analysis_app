import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabBar} from '@utils/arrayUtil';
import {RootStackScreenProps} from '@type';
import {Box, Text, useTheme, View} from 'native-base';
import {Routes} from '@navigations/Routes';
import {scaleH} from '@utils/dimensionUtil';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, Animated} from 'react-native';
import {initAppSelector} from '@redux/selectors/initAppSelector';
import {useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();

const MainLayout = ({
  navigation,
  route,
}: RootStackScreenProps<'MainLayout'>) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const initApp = useSelector(initAppSelector);

  return (
    <Tab.Navigator
      initialRouteName={route?.params?.tabBar || Routes.Home}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 16 * scaleH,
          borderTopRightRadius: 16 * scaleH,
          height: 74 * scaleH,
          borderWidth: 1,
          borderColor: theme.colors.neutral[20],
          shadowColor: theme.colors.neutral[900],
          shadowOpacity: 0.1,
        },
      }}
      sceneContainerStyle={{backgroundColor: theme.colors.white}}>
      {tabBar?.map((tab, index) => {
        if (tab.id === 2)
          return (
            <Tab.Screen
              key={index}
              name={tab?.name}
              component={tab?.component}
              options={{
                tabBarHideOnKeyboard: true,
                tabBarItemStyle: {
                  justifyContent: 'center',
                  height: 60 * scaleH,
                },
                tabBarStyle: {display: 'none'},
                tabBarIcon: () => (
                  <TouchableOpacity
                    onPress={() => {
                      if (initApp?.video) {
                        navigation.navigate(Routes.RecordingVideo);
                        return;
                      }
                      navigation.navigate('RecordingInstruction');
                    }}
                    style={{
                      marginTop: -28 * scaleH,
                      width: 64 * scaleH,
                      height: 64 * scaleH,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <tab.icon />
                    <Text fontSize="xs" color={'neutral.100'}>
                      {t(tab?.label)}
                    </Text>
                  </TouchableOpacity>
                ),
                tabBarLabel: '',
              }}
            />
          );
        return (
          <Tab.Screen
            key={index}
            name={tab?.name}
            component={tab?.component}
            options={{
              tabBarHideOnKeyboard: true,
              tabBarItemStyle: {
                justifyContent: 'center',
                height: 60 * scaleH,
              },
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    position: 'relative',
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {focused && (
                    <View
                      style={{
                        top: 0,
                        position: 'absolute',
                        width: '60%',
                        height: 2 * scaleH,
                        backgroundColor: theme.colors.primary[500],
                      }}
                    />
                  )}
                  <Box mt="2">
                    {focused ? <tab.activeIcon /> : <tab.icon />}
                  </Box>
                </View>
              ),
              tabBarLabel: ({focused}) => (
                <Text
                  fontSize="xs"
                  color={focused ? 'gradient.300' : 'neutral.800'}>
                  {t(tab?.label)}
                </Text>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MainLayout;
