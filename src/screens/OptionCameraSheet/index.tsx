import React from 'react';
import {
  Center,
  VStack,
  Actionsheet,
  Text,
  HStack,
  Image,
  ITheme,
  useTheme,
} from 'native-base';
import {Platform, TouchableOpacity} from 'react-native';
import {Button} from '@components/buttons/Button';
import {widthScreen} from '@utils/dimensionUtil';

export type OptionCameraSheetProps = {
  optionCamera: boolean;
  setOptionCamera: (value: boolean) => void;
  handleCamera: () => void;
  chooseFile: () => void;
  title: string;
  isLoading?: boolean;
};

export const OptionCameraSheet = ({
  optionCamera,
  setOptionCamera,
  handleCamera,
  chooseFile,
  title,
  isLoading,
}: OptionCameraSheetProps) => {
  const theme = useTheme();

  return (
    <Actionsheet
      isOpen={optionCamera}
      onClose={() => {
        setOptionCamera(false);
      }}>
      <Actionsheet.Content>
        <VStack space="5">
          <Text
            fontSize="xl"
            fontWeight="500"
            color="primary.500"
            textAlign="center">
            {title}
          </Text>
          <HStack
            justifyContent={
              Platform.OS === 'android' ? 'space-between' : 'center'
            }
            width={widthScreen}
            px="12">
            {Platform.OS === 'android' && (
              <TouchableOpacity onPress={handleCamera}>
                <Image
                  source={theme?.images?.profileDetail.AccountCamera}
                  resizeMode="contain"
                  alt="Avatar"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={chooseFile}>
              <Image
                alt="Avatar"
                source={theme?.images?.profileDetail.Gallery}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </HStack>
          <Center mb="5">
            <Button
              title="button.cancel"
              width={widthScreen - theme.space['4'] * 2}
              backgroundColor={theme.colors.basic['500']}
              onPress={() => setOptionCamera(false)}
              loading={isLoading}
            />
          </Center>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
