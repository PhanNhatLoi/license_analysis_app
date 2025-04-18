import {AcneType, SeverityType} from '@screens/AnalyticResultImage/mockData';
import {Text, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

export const renderSeverity = [
  'acne.light',
  'acne.medium',
  'acne.heavy',
  'acne.veryHeavy',
];

export default function SkinAnalysis({acneList}: {acneList: AcneType[]}) {
  const {t} = useTranslation();

  return (
    <VStack space="4">
      <Text fontWeight="bold" fontSize="lg">
        {t('acne.skinAnalysis')}
      </Text>
      <VStack space="2">
        {acneList?.map((item, index) => (
          <VStack space="1" key={index}>
            <Text color="black" fontWeight="bold">
              • {t(item?.name)}:{' '}
              <Text
                color={
                  item?.severity === SeverityType.Light
                    ? '#08CF91'
                    : item?.severity === SeverityType.Medium
                    ? '#0095FF'
                    : item?.severity === SeverityType.Heavy
                    ? '#FF6633'
                    : '#B82E00'
                }>
                {t(renderSeverity[item?.severity])}
              </Text>
            </Text>
            <Text color="black" fontWeight="bold">
              {t('acne.consolution')}:{' '}
            </Text>
            <Text color="black">{t(`${item?.conclusion}`)}</Text>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
