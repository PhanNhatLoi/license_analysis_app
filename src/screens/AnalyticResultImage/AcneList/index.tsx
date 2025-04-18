import {HStack, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

export default function AcneList({result}: {result: string}) {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <VStack space="4">
      <VStack
        space="2"
        backgroundColor="white"
        p={4}
        borderRadius="lg"
        borderWidth={1}
        borderColor={theme.colors.primary[500]}>
        {result
          .split('. ')
          .filter(f => f)
          .map((res, index) => {
            return (
              <HStack key={index} space="2">
                <VStack space="1">
                  <Text color="black" fontWeight="bold">
                    • {t(res)}
                  </Text>
                </VStack>
              </HStack>
            );
          })}
      </VStack>
    </VStack>
  );
}
