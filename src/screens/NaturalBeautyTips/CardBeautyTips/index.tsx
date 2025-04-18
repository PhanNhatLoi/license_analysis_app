import ArrowRightIcon from '@assets/icons/ArrowRight';
import {Routes} from '@navigations/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@type';
import {scaleH} from '@utils/dimensionUtil';
import {Box, HStack, Image, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';

type Props = {
  navigation: StackNavigationProp<
    RootStackParamList,
    'NaturalBeautyTips',
    undefined
  >;
  image: string;
  title: string;
  id: number;
};

export default function CardBeautyTips({navigation, title, id}: Props) {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Box key={id} bg="#E6FFFA" p="4" mb="4" borderRadius="12">
      <HStack space="4">
        <Image
          source={require('@assets/images/beautyTips1.jpg')}
          alt="Acne Result"
          borderRadius="12"
          width={110 * scaleH}
          height={110 * scaleH}
        />
        <VStack flex="1" space="2">
          <Text fontSize="sm" fontWeight="bold" color="#333">
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.DetailBeautyTips);
            }}>
            <Box
              bg="black"
              py="2"
              px="4"
              alignSelf="flex-start"
              borderRadius="20">
              <HStack alignItems="center" space="2">
                <Text color="white" fontWeight="bold" fontSize="sm">
                  {t('analytic.view')}
                </Text>
                <ArrowRightIcon fill={theme.colors.neutral[10]} />
              </HStack>
            </Box>
          </TouchableOpacity>
        </VStack>
      </HStack>
    </Box>
  );
}
