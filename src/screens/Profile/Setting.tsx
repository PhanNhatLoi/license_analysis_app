import ArrowRightSingleIcon from '@assets/icons/ArrowRightSingle';
import {Button} from '@components/buttons/Button';
import LoadingButton from '@components/buttons/LoadingButton';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {RootStackScreenProps} from '@type';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import axios from 'axios';
import {ITheme, View, useTheme, Text, Modal} from 'native-base';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {API_URL} from '@env';
import {accountSelector} from '@redux/selectors/accountSelector';
import {useDispatch, useSelector} from 'react-redux';
import {resetAccount} from '@redux/slice/account';

const SettingScreen = ({navigation}: RootStackScreenProps<'Setting'>) => {
  const theme = useTheme();
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const styles = createStyles(theme);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${account?.accessToken}`,
        },
      });
      if (res) {
        Alert.alert(t('Setting.deleteAccountSuccess'));
        dispatch(resetAccount());
        navigation.navigate('SignIn');
        return;
      }
    } catch (e: any) {
      Alert.alert(t('Setting.deleteAccountError'));
    } finally {
      setShowModalDelete(false);
      setLoading(false);
    }
  };

  return (
    <View flex={1} style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader title={t('Setting.title')} backgroundColor="primary.500" />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.navigate('Language');
          }}>
          <Text style={styles.itemText}>{t('Setting.language')}</Text>
          <ArrowRightSingleIcon />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setShowModalDelete(true);
          }}>
          <Text style={styles.itemTextDestroy}>
            {t('Setting.removeAccount')}
          </Text>
          <ArrowRightSingleIcon />
        </TouchableOpacity> */}
      </View>
      <Modal isOpen={showModalDelete} style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitleText}>{t('Setting.deleteTitle')}</Text>
          <Text style={styles.modalDesText}>{t('Setting.confirmDelete')}</Text>
          <View style={styles.flexRowJustifySpace}>
            <TouchableOpacity
              disabled={loading}
              style={[styles.buttonModal, styles.buttonCancel]}
              onPress={() => {
                setShowModalDelete(false);
              }}>
              <Text
                style={[styles.itemText, {color: theme.colors.neutral[100]}]}>
                {t('Setting.cancel')}
              </Text>
            </TouchableOpacity>
            <View style={{width: 20 * scaleW}} />
            <LoadingButton
              loading={loading}
              style={[styles.buttonModal, styles.buttonDelete]}
              onPress={onDeleteAccount}
              label={t('Setting.deleteAccount')}
              labelStyle={[styles.itemText, {color: theme.colors.neutral[10]}]}
            />
          </View>
        </View>
      </Modal>
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
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16 * scaleH,
    },
    itemText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
    },
    itemTextDestroy: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.second[500],
    },
    modal: {
      paddingHorizontal: 24 * scaleW,
    },
    modalContent: {
      width: '100%',
      paddingHorizontal: 20 * scaleW,
      paddingVertical: 24 * scaleH,
      borderRadius: 12 * scaleW,
      backgroundColor: theme.colors.neutral[10],
    },
    modalTitleText: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '700',
      lineHeight: 21.78 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[100],
    },
    modalDesText: {
      marginTop: 12 * scaleH,
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      textAlign: 'center',
      color: theme.colors.neutral[900],
    },
    flexRowJustifySpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 14 * scaleW,
      paddingVertical: 12 * scaleH,
      marginTop: 36 * scaleH,
      borderRadius: 8 * scaleW,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    buttonCancel: {
      backgroundColor: theme.colors.primary[500],
    },
    buttonDelete: {
      backgroundColor: theme.colors.neutral[100],
    },
  });

export default SettingScreen;
