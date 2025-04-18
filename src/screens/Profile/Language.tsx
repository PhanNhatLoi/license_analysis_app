import CheckboxIcon from '@assets/icons/Checkbox';
import {Images} from '@assets/images';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {setLanguage} from '@redux/slice/initApp';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {ITheme, View, useTheme} from 'native-base';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAsyncStorage} from 'src/hooks/useLocalStorage';

const LANGUAGE_KEY = 'user-language';

const LanguageScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();

  const ItemData: {
    icon: keyof typeof Images;
    text: string;
    id: number;
    value: string;
  }[] = [
    {
      id: 1,
      icon: 'en',
      text: 'English',
      value: 'en',
    },
    {
      id: 2,
      icon: 'vn',
      text: 'Vietnamese',
      value: 'vi',
    },
    // {
    //   id: 3,
    //   icon: 'jp',
    //   text: 'Japan',
    // },
    // {
    //   id: 4,
    //   icon: 'in',
    //   text: 'Hindi',
    // },
    // {
    //   id: 5,
    //   icon: 'de',
    //   text: 'German',
    // },
    // {
    //   id: 6,
    //   icon: 'fr',
    //   text: 'French',
    // },
  ];

  const RenderItem = ({
    icon,
    text,
    id,
    value,
  }: {
    icon: keyof typeof Images;
    text: string;
    id: number;
    value: string;
  }) => {
    const {t, i18n} = useTranslation();
    const {setItem} = useAsyncStorage();
    const dispatch = useDispatch();
    const enable = Boolean(i18n.language === value);
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: enable
              ? theme.colors.primary[500]
              : theme.colors.neutral[10],
          },
        ]}
        onPress={() => {
          dispatch(setLanguage({language: value}));
          i18n.changeLanguage(value);
          navigation.goBack();
        }}>
        <View style={styles.row}>
          <Image source={Images[icon]} style={{borderRadius: 100}} />
          <Text
            style={[
              styles.itemText,
              {color: theme.colors.neutral[enable ? 10 : 100]},
            ]}>
            {text}
          </Text>
        </View>
        <CheckboxIcon enable={enable} />
      </TouchableOpacity>
    );
  };

  return (
    <View flex={1} style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader title={t('Language.title')} backgroundColor="primary.500" />
      <FlatList
        style={styles.content}
        data={ItemData}
        renderItem={({item}) => <RenderItem {...item} />}
      />
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral[20],
    },
    item: {
      shadowColor: '#0000001A',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 6,
      borderRadius: 12 * scaleW,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.neutral[50],
      padding: 12 * scaleW,
      marginBottom: 20 * scaleW,
    },
    content: {
      padding: 24 * scaleW,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      fontSize: theme.fontSizes.md,
      fontWeight: '700',
      letterSpacing: 1,
      lineHeight: 24 * scaleH,
      marginLeft: 12 * scaleW,
    },
  });

export default LanguageScreen;
