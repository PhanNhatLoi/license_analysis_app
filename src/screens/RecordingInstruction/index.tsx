import BackgroundSvg from '@assets/icons/recording-instruction/background';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {RootStackScreenProps} from '@type';
import {recordingInstructions} from '@utils/arrayUtil';
import {scaleH} from '@utils/dimensionUtil';
import {requestPermission} from '@utils/permissionUtil';
import {
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {Alert, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {PERMISSIONS, openSettings} from 'react-native-permissions';
import React from 'react';

const RecordingInstructionScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'RecordingInstruction'>) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const openAppSettings = () => {
    openSettings().catch(() => {});
  };

  const onProgessRecording = async () => {
    await requestPermission({
      permissionType:
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      handleGranted: () => navigation.navigate('TakePhoto'),
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

  return (
    <View>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('recordingInstruction.title')}
        backgroundColor="primary.500"
      />
      <ScrollView>
        <Box
          pt="8"
          backgroundColor="primary.500"
          justifyContent="center"
          alignItems="center"
          borderBottomRightRadius={20 * scaleH}
          borderBottomLeftRadius={20 * scaleH}>
          <BackgroundSvg />
        </Box>
        <VStack mt="5" px="6">
          <Text fontWeight="normal" fontSize="md" color="green.100">
            {t('recordingInstruction.instructionTitle')}
          </Text>
          <VStack mt="4">
            {recordingInstructions.map(instruction => (
              <HStack
                key={instruction.id}
                alignItems="center"
                space="3"
                py="2"
                borderBottomColor="neutral.50"
                borderBottomWidth="1">
                <instruction.icon />
                <Text fontSize="md" fontWeight="normal" color="neutral.100">
                  {t(instruction.content)}
                </Text>
              </HStack>
            ))}
          </VStack>
          <TouchableOpacity
            style={styles.button(theme.colors)}
            onPress={onProgessRecording}>
            <Text fontSize="md" color="neutral.100" fontWeight="semibold">
              {t('recordingInstruction.processingRecord')}
            </Text>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </View>
  );
};

const styles = {
  button: (colors: any) =>
    StyleSheet.create({
      button: {
        marginTop: 40 * scaleH,
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
        marginBottom: 150 * scaleH,
      },
    }).button,
};

export default RecordingInstructionScreen;
