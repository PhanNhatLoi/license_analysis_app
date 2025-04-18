import React, {useState} from 'react';
import ArrowRightSingleIcon from '@assets/icons/ArrowRightSingle';
import LoadingButton from '@components/buttons/LoadingButton';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {IData, RootStackScreenProps} from '@type';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import axios from 'axios';
import {
  ITheme,
  View,
  useTheme,
  Text,
  Box,
  HStack,
  Image,
  VStack,
  Menu,
  Divider,
  Modal,
} from 'native-base';
import Input from '@components/inputs/Input';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DotIcon from '@assets/icons/DotIcon';
import ArrowRightIcon from '@assets/icons/ArrowRight';
import PencilIcon from '@assets/icons/PencilIcon';
import DeleteIcon from '@assets/icons/DeleteIcon';
import {initAppSelector} from '@redux/selectors/initAppSelector';
import {editResult, removeResult} from '@redux/slice/initApp';
import {formatDateTime} from '@utils/formatUtils';
import {Routes} from '@navigations/Routes';
import ModalSetting from './Modal';

const AnalyticHistory = ({
  navigation,
}: RootStackScreenProps<'AnalyticHistory'>) => {
  const theme = useTheme();
  const dataApp = useSelector(initAppSelector);
  const {t} = useTranslation();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultEdit, setResultEdit] = useState<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleRename = (item: any) => {
    const {id, name} = item;
    setResultEdit({
      id,
      name,
    });
    setModalVisible(true);
  };

  const saveNewName = () => {
    if (resultEdit) {
      const result = ((dataApp?.results as any[]) || []).find(
        f => f.id === resultEdit.id,
      );
      dispatch(editResult({...result, name: resultEdit.name}));
      setResultEdit(undefined);
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    dispatch(removeResult({id}));
  };

  return (
    <View flex={1} style={styles.container}>
      <ModalSetting
        {...{
          isModalVisible,
          setModalVisible,
          resultEdit,
          setResultEdit,
          saveNewName,
        }}
      />
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader title={t('analytic.title')} backgroundColor="primary.500" />
      <ScrollView>
        <View style={styles.content}>
          {dataApp?.results?.length === 0 ? (
            <Text fontSize="lg" color="#666" textAlign="center">
              {t('analytic.emtry')}
            </Text>
          ) : (
            ((dataApp?.results as IData[]) || []).map(item => (
              <Box
                key={item.id}
                bg="#E6FFFA"
                p="4"
                borderRadius="10"
                shadow="2"
                mb="4">
                <HStack space="4">
                  <Image
                    source={{
                      uri: item.imageUri,
                    }}
                    alt="Acne Result"
                    borderRadius="10"
                    width={110}
                    height={110}
                    style={{transform: [{rotate: '90deg'}]}}
                  />

                  <VStack flex="1" space="2">
                    <Text fontSize="lg" fontWeight="bold" color="#333">
                      {item.name || t('analytic.defaultName')}
                    </Text>
                    <Text fontSize="sm" color="#666">
                      {formatDateTime(new Date(item.createdDate))}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(Routes.AnalyticsResultImage, {
                          data: item,
                        });
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
                  <Menu
                    w="180"
                    borderRadius={12}
                    placement="top right"
                    trigger={triggerProps => {
                      return (
                        <Pressable
                          {...triggerProps}
                          style={{
                            alignSelf: 'flex-start',
                            height: 32 * scaleH,
                            width: 32 * scaleH,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <DotIcon />
                        </Pressable>
                      );
                    }}>
                    <Menu.Item onPress={() => handleRename(item)}>
                      <HStack space="2" alignItems="center">
                        <PencilIcon />
                        <Text>{t('analytic.changeName')}</Text>
                      </HStack>
                    </Menu.Item>
                    <Divider />
                    <Menu.Item onPress={() => handleDelete(item.id)}>
                      <HStack space="2" alignItems="center">
                        <DeleteIcon color={theme.colors.danger[100]} />
                        <Text color="red.500">{t('analytic.delete')}</Text>
                      </HStack>
                    </Menu.Item>
                  </Menu>
                </HStack>
              </Box>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral[20],
    },
    content: {
      padding: 24 * scaleW,
    },
  });

export default AnalyticHistory;
