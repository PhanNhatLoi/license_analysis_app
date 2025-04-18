import CopyButtonIcon from '@assets/icons/CopyButton';
import {Images} from '@assets/images';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {ITheme, View, useTheme, Text, useClipboard} from 'native-base';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

const inviteCode = 'S456SDFG';

const InviteFriendScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const styles = createStyles(theme);
  const clipboard = useClipboard();

  return (
    <View flex={1} style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader title={t('Invite.title')} backgroundColor="primary.500" />
      <View style={styles.backgroundHeader} />
      <View style={styles.content}>
        <View style={styles.card}>
          <Image source={Images.inviteFriendBackground} style={styles.image} />
          <Text style={styles.descriptionText}>{t('Invite.description')}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => {
              clipboard.onCopy(inviteCode);
            }}>
            <CopyButtonIcon />
            <Text>{inviteCode}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t('Invite.share')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral[20],
    },
    backgroundHeader: {
      zIndex: -1,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 342 * scaleH,
      backgroundColor: theme.colors.primary[500],
      borderBottomLeftRadius: 16 * scaleW,
      borderBottomRightRadius: 16 * scaleW,
    },
    content: {
      paddingHorizontal: 24 * scaleW,
      marginTop: 31 * scaleH,
    },
    card: {
      backgroundColor: theme.colors.neutral[10],
      borderRadius: 12 * scaleW,
      paddingVertical: 40 * scaleH,
      paddingHorizontal: 27 * scaleW,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 89 * scaleH,
      marginBottom: 32 * scaleH,
    },
    image: {},
    descriptionText: {
      marginTop: 24 * scaleH,
      color: theme.colors.neutral[900],
      fontSize: theme.fontSizes.sm,
      fontWeight: '400',
      lineHeight: 20 * scaleH,
      textAlign: 'center',
    },
    copyButton: {
      marginTop: 24 * scaleH,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12 * scaleW,
      backgroundColor: theme.colors.primary[500],
      borderRadius: 8 * scaleW,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },

    button: {
      backgroundColor: theme.colors.neutral[100],
      borderRadius: 8 * scaleW,
      width: '100%',
      height: 48 * scaleH,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20 * scaleH,
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
    },
    buttonText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      lineHeight: 24 * scaleH,
      color: theme.colors.neutral[10],
      marginLeft: 10 * scaleW,
    },
  });

export default InviteFriendScreen;
