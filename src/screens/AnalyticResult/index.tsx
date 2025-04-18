import {NextIcon} from '@assets/icons/result/Next';
import {PreviousIcon} from '@assets/icons/result/Previous';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {RootStackScreenProps} from '@type';
import {scaleH, widthScreen} from '@utils/dimensionUtil';
import {
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import OverviewResult from './Overivew';
import {getPaginatedItems, getTotalPages} from '@utils/arrayUtil';
import {GeneralIcon} from '@assets/icons/result/General';
import DetailResult from './Detail';
import FaceIcon from '@assets/icons/Face';
import EyeSquareIcon from '@assets/icons/EyeSquare';
import ImpressionResult from './Impression';
import IdeaProfessionResult from './IdeaProfession';
import WorkIcon from '@assets/icons/Work';
import {Routes} from '@navigations/Routes';
import {Images} from '@assets/images';
import React from 'react';

const itemPerPage = 2;

const AnalyticsResultScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'AnalyticsResult'>) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const {videoURI, result, image} = route?.params;
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const pageOverview = {
    start: 1,
    end: getTotalPages(result.data, itemPerPage),
  };
  const pageHumanlogy = {
    start: pageOverview.end + 1,
    end: pageOverview.end + result.data.length,
  };

  const pageImpression = {
    start: pageHumanlogy.end + 1,
    end: pageHumanlogy.end + 1,
  };

  const pageIdealProfession = {
    start: pageImpression.end + 1,
    end: pageImpression.end + result.idealProfession.length,
  };

  const totalPage =
    pageOverview.end + result.data.length + 1 + result.idealProfession.length;
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    (videoRef.current as any)?.seek(1);
  }, [videoRef]);

  return (
    <View flex={1} backgroundColor="neutral.40">
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('AnalyticResult.title')}
        backgroundColor="primary.500"
      />
      <ScrollView flex={1} px="6">
        {currentPage <= pageOverview.end && (
          <OverviewResult
            title={t('AnalyticResult.faceOverview')}
            icon={<GeneralIcon />}
            results={getPaginatedItems(result.data, currentPage, itemPerPage)}
          />
        )}
        {currentPage >= pageHumanlogy.start &&
          currentPage <= pageHumanlogy.end && (
            <DetailResult
              title={`${t('AnalyticResult.firstGroup')} ${
                currentPage - pageOverview.end
              })`}
              icon={<FaceIcon />}
              results={getPaginatedItems(
                result.data,
                currentPage - pageOverview.end,
                1,
              )}
            />
          )}
        {currentPage === pageImpression.start && (
          <ImpressionResult
            title={t('AnalyticResult.3rdPersonPerspective')}
            icon={<EyeSquareIcon />}
            result={result.impression}
          />
        )}
        {currentPage >= pageIdealProfession.start &&
          currentPage <= pageIdealProfession.end && (
            <IdeaProfessionResult
              title={t('AnalyticResult.suitableJob')}
              icon={<WorkIcon />}
              results={getPaginatedItems(
                result.idealProfession,
                currentPage - pageImpression.start,
                1,
              )}
            />
          )}

        {videoURI && (
          <VStack flex={1} mt="5" mb="20">
            <Box borderRadius="lg" overflow="hidden">
              <TouchableOpacity
                style={{
                  height: widthScreen,
                  width: '100%',
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('ReactNaviveVideo', {
                    videoURI: videoURI || '',
                  });
                }}>
                <Image
                  source={{uri: image}}
                  style={{height: '100%', width: '100%'}}
                />
                <Image source={Images.play} style={{position: 'absolute'}} />
              </TouchableOpacity>
            </Box>
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
            currentPage > 1 && setCurrentPage(currentPage - 1);
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
            currentPage < totalPage && setCurrentPage(currentPage + 1);
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

export default AnalyticsResultScreen;
