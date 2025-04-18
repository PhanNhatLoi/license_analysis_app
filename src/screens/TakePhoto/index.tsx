import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {heightScreen, scaleH, scaleW, widthScreen} from '@utils/dimensionUtil';
import {
  Box,
  CloseIcon,
  HStack,
  ITheme,
  Modal,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Circle, Svg} from 'react-native-svg';
import {RootStackScreenProps} from '@type';
import React from 'react';
import {Asset, CameraOptions, launchCamera} from 'react-native-image-picker';
import {requestPermission} from '@utils/permissionUtil';
import {openSettings, PERMISSIONS} from 'react-native-permissions';
import {Button} from '@components/buttons/Button';
import axios from 'axios';
import {Routes} from '@navigations/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {pushResult} from '@redux/slice/initApp';
import {Images} from '@assets/images';
import {api} from 'src/provider/api';
import {OpenAI} from 'openai';
import RNFS from 'react-native-fs';
import {OPENAI_API_KEY} from '@env';

const prompt = `You are an expert in image analysis and Vietnamese numerology. I will send you an image. Please follow these instructions strictly, and respond with a JSON object only — no extra text, no explanation.

---

1. First, analyze the image and determine if it contains a license plate.

- If the image does **not** contain a license plate, return the following JSON:
{
  "readLicensePlate": null,
  "numerology": null,
  "generalConsultation": "Đây không phải là biển số xe."
}

---

2. If the image **does** contain a license plate:

- Extract the license plate number and assign it to "readLicensePlate".
- For the "numerology" field, perform a detailed Vietnamese-style numerology reading, including:
  - Tổng các chữ số trong biển số (bỏ ký tự và dấu cách).
  - Tính nút: nếu tổng >=10 thì cộng tiếp các chữ số đến khi còn 1 chữ số.
  - Phân tích các con số lặp lại (ví dụ: 2222).
  - Giải thích ý nghĩa riêng của các số (1–9) trong văn hóa Việt (ví dụ: 6 là lộc, 8 là phát, 2 là hòa hợp…).
  - Tóm lại phần này như một phân tích thần số học đầy đủ.

- In the "generalConsultation" field:
  - Đưa ra nhận xét tổng quan về biển số: đẹp hay xấu, có ý nghĩa phong thủy như thế nào.
  - Nhận định biển số có phù hợp cho kinh doanh, xe cá nhân, hoặc không nên dùng (nếu có yếu tố xui xẻo).
  - Viết ngắn gọn nhưng truyền cảm và dễ hiểu.

---

📌 Return the result as a valid JSON object with exactly these 3 fields:
{
  "readLicensePlate": "string | null",
  "numerology": "string | null",
  "generalConsultation": "string"
}

🚩 All values must be written in **Vietnamese**.
🚫 Do NOT include any extra explanation, markdown, or commentary.
❗ If multiple license plates exist, choose the clearest one.`;

export type DetectedDataType = {
  bounding_boxes: BoundingBox[];
  output_image: string;
};

export type BoundingBox = {
  percentage_conf: string;
  class_id: string;
  cords: number[];
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const duration = 2;

const TakePhotoScreen = ({navigation}: RootStackScreenProps<'TakePhoto'>) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [imagePath, setImagePath] = useState<Asset | undefined>();
  const [refreshCamera, setRefreshCamera] = useState(new Date().getTime());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModalImage, setOpenModalImage] = useState<boolean>(false);
  const styles = createStyles(theme);
  const strokeWidth = 12;
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [counter, setCounter] = useState(duration);
  const [showModal, setShowModal] = useState(false);

  const capture = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.5,
      durationLimit: 3,
      cameraType: 'back',
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
            setImagePath(response.assets[0]);
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

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const onCaptureAgain = () => {
    setImagePath(undefined);
    setRefreshCamera(new Date().getTime());
    setProgress(new Animated.Value(0));
    setCounter(duration);
  };

  const handleProcess = async () => {
    if (!imagePath?.uri) return;

    setIsLoading(true);

    try {
      const base64Image = await RNFS.readFile(imagePath.uri, 'base64');
      const mimeType = imagePath.type || 'image/jpeg';

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: prompt,
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: `data:${mimeType};base64,${base64Image}`,
                      detail: 'high',
                    },
                  },
                ],
              },
            ],
            max_tokens: 1000,
          }),
        },
      );

      const json = await response.json();

      if (json?.choices?.[0]?.message?.content) {
        const result: string = json.choices[0].message.content;
        const resultJson = JSON.parse(
          result.replace('```json', '').replace('```', ''),
        );
        const data = {
          name: resultJson.readLicensePlate,
          imageUri: imagePath.uri,
          id: new Date().getTime().toString(),
          createdDate: new Date().toUTCString(),
          result: resultJson,
        };
        dispatch(pushResult(data));
        navigation.navigate(Routes.AnalyticsResultImage, {data});
      } else {
        console.log('Raw OpenAI response:', json);
        Alert.alert('Không phân tích được ảnh!');
      }
    } catch (e) {
      console.error('GPT error:', e);
      Alert.alert('Đã xảy ra lỗi khi xử lý ảnh.');
    } finally {
      setIsLoading(false);
    }
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
          capture();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCamera, duration]);

  return (
    <View flex={1} backgroundColor="white">
      {isLoading && (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5,
            zIndex: 3000,
          }}>
          <Box
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex={3000}
            p={5}
            borderRadius="2xl">
            <ActivityIndicator size="large" color="white" />
          </Box>
        </View>
      )}
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('recordingVideo.title')}
        backgroundColor="primary.500"
      />
      <SafeAreaView style={{flex: 1}}>
        {counter > 0 && (
          <VStack flex={1} justifyContent="center" alignItems="center">
            <View style={styles.container}>
              <Svg width={304 * scaleH} height={304 * scaleH}>
                <Circle
                  cx={152 * scaleH}
                  cy={152 * scaleH}
                  r={radius}
                  stroke={theme.colors.second[500]}
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <AnimatedCircle
                  cx={152 * scaleH}
                  cy={152 * scaleH}
                  r={radius}
                  stroke={theme.colors.primary[100]}
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
              <Text
                position="absolute"
                bottom={28 * scaleH}
                fontSize="lg">{`${t(
                'recordingVideo.beginAfter',
              )} ${counter} ${t('recordingVideo.second')}...`}</Text>
            </View>
          </VStack>
        )}
        {imagePath && (
          <VStack flex={1} mt="5" px="6" alignItems="center">
            <Image
              source={{uri: `${imagePath?.uri}`}}
              style={{width: 330 * scaleH, height: 380 * scaleH}}
              alt="capture image"
            />
            <HStack mt="10" mb="5" space="5">
              <TouchableOpacity
                onPress={onCaptureAgain}
                disabled={isLoading}
                style={[styles.button, {opacity: isLoading ? 0.5 : 1}]}>
                <Text fontSize="md" color="neutral.10">
                  {t('buttons.back')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {opacity: isLoading ? 0.5 : 1}]}
                disabled={isLoading}
                onPress={() => setOpenModalImage(true)}>
                <Text fontSize="md" color="neutral.10">
                  {t('buttons.watchVideo')}
                </Text>
              </TouchableOpacity>
            </HStack>
            <Button
              style={styleButton.button(theme.colors)}
              disabled={isLoading}
              onPress={handleProcess}
              title={t('buttons.processingAnalytics')}>
              <Text fontSize="md" color="neutral.1000" fontWeight="semibold">
                {t('buttons.processingAnalytics')}
              </Text>
            </Button>
          </VStack>
        )}
        {openModalImage && (
          <Box
            width={widthScreen}
            height={heightScreen}
            position="absolute"
            zIndex={1000}>
            <TouchableOpacity
              onPress={() => setOpenModalImage(false)}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                position: 'absolute',
                zIndex: 2000,
                top: 16 * scaleH,
                right: 20 * scaleH,
              }}>
              <Box bgColor="primary.500" borderRadius="full" p={2}>
                <CloseIcon />
              </Box>
            </TouchableOpacity>
            <Image
              source={{uri: `${imagePath?.uri}`}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                top: 0,
                width: '100%',
                height: '100%',
              }}
              alt="capture image"
            />
          </Box>
        )}
      </SafeAreaView>

      <Modal isOpen={showModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <Image source={Images.requireLogin} />
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

export default TakePhotoScreen;
