import Input from '@components/inputs/Input';
import {Button, HStack, Modal, useTheme} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

const ModalSetting = ({
  isModalVisible,
  setModalVisible,
  setResultEdit,
  resultEdit,
  saveNewName,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resultEdit: any;
  setResultEdit: React.Dispatch<React.SetStateAction<any>>;
  saveNewName: () => void;
}) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header> {t('analytic.changeName')}</Modal.Header>
        <Modal.Body>
          <Input
            value={resultEdit?.name || ''}
            onChangeText={value => {
              setResultEdit({
                ...resultEdit,
                name: value,
              });
            }}
            placeholder={t('analytic.newName')}
          />
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}>
              {t('analytic.cancel')}
            </Button>
            <Button
              onPress={saveNewName}
              backgroundColor={theme.colors.neutral[100]}>
              {t('analytic.save')}
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalSetting;
