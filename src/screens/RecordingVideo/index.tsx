import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {createThumbnail} from 'react-native-create-thumbnail';
import {scaleH, scaleW, widthScreen} from '@utils/dimensionUtil';
import {
  Box,
  HStack,
  ITheme,
  Modal,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  Platform,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import {Asset, CameraOptions, launchCamera} from 'react-native-image-picker';
import {Circle, Svg} from 'react-native-svg';
import {Routes} from '@navigations/Routes';
import {RootStackScreenProps} from '@type';
import {api} from 'src/provider/api';
import {API_AI_URL} from '@env';
import axios from 'axios';
import {Button} from '@components/buttons/Button';
import {useDispatch, useSelector} from 'react-redux';
import {accountSelector} from '@redux/selectors/accountSelector';
import {saveVideo} from '@redux/slice/initApp';
import {initAppSelector} from '@redux/selectors/initAppSelector';
import NetInfo, {useNetInfoInstance} from '@react-native-community/netinfo';
import {Images} from '@assets/images';
import {requestPermission} from '@utils/permissionUtil';
import {openSettings, PERMISSIONS} from 'react-native-permissions';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const duration = 3;

const RecordingVideoScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'RecordingVideo'>) => {
  const theme = useTheme();
  const {t, i18n} = useTranslation();
  const account = useSelector(accountSelector);
  const initApp = useSelector(initAppSelector);

  const strokeWidth = 12;
  const radius = 76;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = useState(new Animated.Value(0));
  const [counter, setCounter] = useState(initApp?.video ? 0 : duration);
  const [video, setVideo] = useState<Asset | undefined>(
    initApp?.video || undefined,
  );
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshCamera, setRefreshCamera] = useState(new Date().getTime());
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [refreshData, setRefreshData] = useState<number>();
  const controller = new AbortController();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        controller.abort();
        axios.Cancel;
      }
    });
    return () => unsubscribe();
  }, []);

  const recordVideo = async () => {
    const options: CameraOptions = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 3,
      cameraType: 'front',
    };
    await requestPermission({
      permissionType:
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      handleGranted: async () =>
        await launchCamera(options, (response: any) => {
          if (response.didCancel) {
            navigation.goBack();
          } else if (response.errorCode) {
            console.log('Error:', response.errorMessage);
          } else {
            dispatch(saveVideo({video: response.assets[0]}));
            setVideo(response.assets[0]);
          }
        }),
      handleBlocked: () => {
        Alert.alert(
          t('recordingVideo.cameraPermission'),
          t('recordingVideo.cameraPermissionDes'),
          [
            {
              text: t('recordingVideo.cancel'),
              onPress: () => {},
            },
            {
              text: t('recordingVideo.ok'),
              onPress: () => {
                openSettings().catch(() => {});
              },
            },
          ],
        );
      },
    });
  };

  const onRecordingAgain = () => {
    setVideo(undefined);
    dispatch(saveVideo({video: undefined}));
    setRefreshCamera(new Date().getTime());
    setProgress(new Animated.Value(0));
    setCounter(duration);
  };

  const onWatchingVideo = () => {
    setPaused(!paused);
  };

  const onProgessAnalytics = async () => {
    setRefreshData(new Date().getTime());
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: duration * 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();

    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev === 0) {
        }
        if (prev === 1) {
          clearInterval(interval);
          recordVideo();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, refreshCamera]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!account?.accessToken) {
        setShowModal(true);
        return;
      }
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('video', {
          uri: video?.uri,
          type: 'video/mp4',
          name: 'video.mp4',
        });
        const res = await axios.post(API_AI_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${account?.accessToken}`,
          },
          signal: controller.signal,
        });
        if (res && res.data) {
          if (!res.data?.output_image) {
            Alert.alert(t('recordingVideo.noFace'));
            return;
          }
          const data = res.data;
          if (data?.output_image) {
            data.lang = i18n.language;
            delete data.output_image;
          }
          // save image
          const image = await generateImageThumbnail(video?.uri || '');
          const resResult = await api.post(
            '/face-analytics/submit-video',
            data,
            {
              signal: controller.signal,
            },
          );
          if (resResult && resResult.data) {
            dispatch(saveVideo({video: undefined}));
            navigation.navigate(Routes.AnalyticsResult, {
              videoURI: video?.uri,
              result: resResult.data?.response,
              image: image,
            });
          }
        }
      } catch (e: any) {
        if (axios.isCancel(e)) {
          return;
        }
        if (e?.code && e?.code === 'ERR_NETWORK') {
          Alert.alert(t('recordingVideo.error2'));
          return;
        }
        Alert.alert(t('recordingVideo.error'));
      } finally {
        setIsLoading(false);
      }
    };
    if (refreshData) fetchData();
    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, [refreshData]);

  const generateImageThumbnail = async (videoUri: string) => {
    const result = await createThumbnail({
      url: videoUri,
      timeStamp: 2000,
    });
    return result?.path || '';
  };

  return (
    <View flex={1}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('recordingVideo.title')}
        backgroundColor="primary.500"
      />
      {counter > 0 && (
        <VStack flex={1} justifyContent="center" alignItems="center">
          <View style={styles.container}>
            <Svg width={304 * scaleH} height={304 * scaleH}>
              <Circle
                cx={152 * scaleH}
                cy={152 * scaleH}
                r={radius}
                stroke={theme.colors.primary[500]}
                strokeWidth={strokeWidth}
                fill="none"
              />
              <AnimatedCircle
                cx={152 * scaleH}
                cy={152 * scaleH}
                r={radius}
                stroke={theme.colors.neutral[100]}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <Text
              position="absolute"
              fontSize={48 * scaleH}
              fontWeight="bold"
              color="black">
              {counter}s
            </Text>
            <Text position="absolute" bottom={28 * scaleH} fontSize="lg">{`${t(
              'recordingVideo.beginAfter',
            )} ${counter} ${t('recordingVideo.second')}...`}</Text>
          </View>
        </VStack>
      )}
      {video && (
        <VStack flex={1} mt="5" px="6">
          <Box borderRadius="lg" overflow="hidden">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.ReactNaviveVideo, {
                  videoURI: video?.uri || '',
                });
              }}>
              <VideoPlayer
                ref={videoRef}
                source={{
                  uri: video?.uri,
                }}
                style={{
                  width: '100%',
                  height: widthScreen,
                }}
                controls={false}
                paused={paused}
                resizeMode="cover"
                repeat
                muted
              />
            </TouchableOpacity>
          </Box>
          <HStack mt="10" mb="5" space="5">
            <TouchableOpacity
              style={[styles.button, {opacity: isLoading ? 0.5 : 1}]}
              onPress={onRecordingAgain}
              disabled={isLoading}>
              <Text fontSize="md" color="neutral.10">
                {t('buttons.back')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onWatchingVideo}>
              <Text fontSize="md" color="neutral.10">
                {paused ? t('buttons.watchVideo') : t('buttons.pause')}
              </Text>
            </TouchableOpacity>
          </HStack>
          <Button
            style={styleButton.button(theme.colors)}
            title={t('buttons.processingAnalytics')}
            onPress={onProgessAnalytics}
            loading={isLoading}>
            <Text fontSize="md" color="neutral.1000" fontWeight="semibold">
              {t('buttons.processingAnalytics')}
            </Text>
          </Button>
        </VStack>
      )}
      {counter === 0 && !video && (
        <VStack flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator color={theme.colors.neutral[1000]} size="large" />
        </VStack>
      )}
      <Modal isOpen={showModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <Image source={Images.requireLogin} />
          {/* <Text style={styles.modalTitleText}>{t('Profile.logout')}</Text> */}
          <Text style={styles.modalDesText}>
            {t('recordingVideo.requiredSignIn')}
          </Text>
          <View style={styles.flexRowJustifySpace}>
            <TouchableOpacity
              style={[styles.buttonModal, styles.buttonCancel]}
              onPress={() => {
                navigation.navigate('SignUp');
                setShowModal(false);
              }}>
              <Text style={styles.itemText}>{t('signUp.title')}</Text>
            </TouchableOpacity>
            <View style={{width: 20 * scaleW}} />
            <TouchableOpacity
              style={[styles.buttonModal, styles.buttonDelete]}
              onPress={() => {
                navigation.navigate('SignIn');
                setShowModal(false);
              }}>
              <Text
                style={[styles.itemText, {color: theme.colors.neutral[100]}]}>
                {t('signIn.title')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      marginTop: -32 * scaleH,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8 * scaleH,
      backgroundColor: theme.colors.neutral[100],
      height: 48 * scaleH,
      width: '50%',
    },
    modal: {
      paddingHorizontal: 24 * scaleW,
    },
    modalContent: {
      width: '100%',
      paddingHorizontal: 20 * scaleW,
      paddingVertical: 40 * scaleH,
      borderRadius: 12 * scaleW,
      backgroundColor: theme.colors.neutral[10],
      alignItems: 'center',
    },
    modalTitleText: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '700',
      lineHeight: 21.78 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[100],
    },
    modalDesText: {
      paddingHorizontal: 10 * scaleW,
      marginTop: 24 * scaleH,
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[900],
    },
    flexRowJustifySpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 14 * scaleW,
      paddingVertical: 12 * scaleH,
      marginTop: 36 * scaleH,
      borderRadius: 8 * scaleW,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    buttonCancel: {
      backgroundColor: theme.colors.neutral[100],
    },
    buttonDelete: {
      backgroundColor: theme.colors.primary[500],
    },
    itemText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[10],
    },
  });

const styleButton = {
  button: (colors: any) =>
    StyleSheet.create({
      button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8 * scaleH,
        backgroundColor: colors.primary[500],
        height: 48 * scaleH,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      },
    }).button,
};

export default RecordingVideoScreen;
