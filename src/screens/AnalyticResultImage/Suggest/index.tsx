import SuggestImprove from '@assets/icons/SuggestImprove';
import {AcneType} from '@screens/AnalyticResultImage/mockData';
import {Box, HStack, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

export default function Suggest({acneList}: {acneList: AcneType[]}) {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <VStack
      space="2"
      backgroundColor="white"
      p={2}
      borderRadius="lg"
      borderWidth={1}
      borderColor={theme.colors.primary[500]}>
      <HStack space="2">
        <SuggestImprove />
        <Text>{t('AnalyticResult.suggest')}:</Text>
      </HStack>
      {acneList?.map((item, index) => (
        <Box key={index}>
          <Text color="black" fontWeight="bold" mb={2}>
            {t(item?.name)}:
          </Text>
          {item?.suggest?.map((childItem, childIndex) => (
            <HStack space="2" key={childIndex}>
              <VStack space="1">
                <Text color="black">• {t(childItem)}</Text>
              </VStack>
            </HStack>
          ))}
        </Box>
      ))}
    </VStack>
  );
}
