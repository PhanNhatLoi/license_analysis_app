import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ITheme, Modal, useTheme} from 'native-base';
import {useTranslation} from 'react-i18next';
import NetInfo, {useNetInfoInstance} from '@react-native-community/netinfo';
import {scaleH, scaleW} from './dimensionUtil';

const NetInfoScreen = () => {
  const {refresh} = useNetInfoInstance();
  const theme = useTheme();
  const styles = createStyles(theme);
  const {t} = useTranslation();

  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Modal
      isOpen={isConnected === false || isInternetReachable === false}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitleText}>
          {t('Error.netinfo_disconnect')}
        </Text>
        <Text style={styles.modalDesText}>
          {t('Error.netinfo_disconnect_des')}
        </Text>

        <View style={styles.flexRowJustifySpace}>
          <TouchableOpacity
            style={[styles.buttonModal, styles.buttonCancel]}
            onPress={() => {
              refresh();
            }}>
            <Text style={styles.itemText}>{t('Error.reconnect')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NetInfoScreen;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
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
      justifyContent: 'center',
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
    itemText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[100],
    },
  });
