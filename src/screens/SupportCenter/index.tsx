import {HotlineIcon} from '@assets/icons/support-center/Hotline';
import {LocationIcon} from '@assets/icons/support-center/Location';
import {TimeIcon} from '@assets/icons/support-center/Time';
import {WebsiteIcon} from '@assets/icons/support-center/Website';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {scaleW} from '@utils/dimensionUtil';
import {
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base';
import {useTranslation} from 'react-i18next';

const SUPPORT_INFORMATION = [
  {id: 1, title: 'supportCenter.location', icon: LocationIcon},
  {id: 2, title: 'supportCenter.time', icon: TimeIcon},
  {id: 3, title: 'supportCenter.hotline', icon: HotlineIcon},
  {id: 4, title: 'supportCenter.website', icon: WebsiteIcon},
];

const SupportCenterScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <View flex={1}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('supportCenter.title')}
        backgroundColor="primary.500"
      />
      <ScrollView mt="8" px="6">
        <VStack space="5">
          <Image
            source={require('@assets/icons/support-center/zen-s.png')}
            width={104 * scaleW}
            height={41 * scaleW}
            alt="zen-s"
          />
          <Text fontSize="sm" fontWeight="bold" color="black">
            {t('supportCenter.companyName')}
          </Text>
          <VStack space="5">
            {SUPPORT_INFORMATION.map(item => (
              <HStack key={item.id} space="2" alignItems="center">
                <item.icon />
                <Text fontSize="xs" color="black">
                  {t(item.title)}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default SupportCenterScreen;
