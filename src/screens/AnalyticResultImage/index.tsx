import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {RootStackScreenProps} from '@type';
import {scaleH} from '@utils/dimensionUtil';
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
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {PreviousIcon} from '@assets/icons/result/Previous';
import {Routes} from '@navigations/Routes';
import {NextIcon} from '@assets/icons/result/Next';
import AcneList from '@screens/AnalyticResultImage/AcneList';
import FaceDetect from '@assets/icons/FaceDetect';

enum Page {
  AcneList = 1,
  SkinAnalysis = 2,
  Suggest = 3,
}

const AnalyticsResultImageScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'AnalyticsResultImage'>) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 3;
  const {
    data: {imageUri, result},
  } = route?.params;
  const scrollViewRef = useRef<any>(null);
  const renderHeader = [
    '',
    t('analytic.readLicensePlate'),
    t('analytic.numerology'),
    t('analytic.generalConsultation'),
  ];

  const renderPage = () => {
    switch (currentPage) {
      case Page.AcneList:
        return <AcneList result={result.readLicensePlate} />;
      case Page.SkinAnalysis:
        return <AcneList result={result.numerology} />;
      case Page.Suggest:
        return <AcneList result={result.generalConsultation} />;

      default:
        return null;
    }
  };

  return (
    <View flex={1} backgroundColor="neutral.40">
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('AnalyticResult.title')}
        backgroundColor="primary.500"
      />
      <HStack
        space="2"
        backgroundColor="neutral.100"
        borderBottomRadius="lg"
        alignItems="center"
        alignSelf="center"
        width="90%"
        justifyContent="center"
        py={2}>
        <FaceDetect />
        <Text color={theme.colors.primary[50]} fontWeight="bold">
          {renderHeader[currentPage]}
        </Text>
      </HStack>
      <ScrollView flex={1} px="6" ref={scrollViewRef}>
        {route?.params?.data && (
          <VStack flex={1} mt="5" mb="20" alignItems="center" space="2">
            <Box borderRadius="lg" overflow="hidden">
              <TouchableOpacity
                disabled={true}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  height: 250 * scaleH,
                  width: 250 * scaleH,
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: imageUri}}
                  style={{
                    height: '100%',
                    width: '100%',
                    transform: [{rotate: '90deg'}],
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Box>
            {renderPage()}
          </VStack>
        )}
      </ScrollView>
      <HStack
        position="absolute"
        bottom="10"
        mt="5"
        width="100%"
        px="6"
        justifyContent="space-between"
        alignItems="center">
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
              scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
            }
            if (currentPage === 1) {
              navigation.goBack();
            }
          }}>
          <PreviousIcon />
          <Text fontSize="xs" fontWeight="medium" color="neutral.100">
            {t('AnalyticResult.back')}
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <Text fontSize="xs" color="neutral.1000" fontWeight="medium">
            {currentPage}/{totalPage}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentPage < totalPage) {
              setCurrentPage(currentPage + 1);
              scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
            }
            if (currentPage === totalPage) {
              navigation.navigate(Routes.Home);
            }
          }}>
          <Text fontSize="xs" fontWeight="medium" color="neutral.100">
            {t(
              currentPage === totalPage
                ? 'BottomTabs.Home'
                : 'AnalyticResult.next',
            )}
          </Text>
          <NextIcon />
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 * scaleH,
    borderRadius: 48 * scaleH,
    backgroundColor: '#FFFFFF',
    paddingVertical: 4 * scaleH,
    paddingHorizontal: 20 * scaleH,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AnalyticsResultImageScreen;
