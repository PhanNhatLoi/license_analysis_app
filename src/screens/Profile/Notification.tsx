import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {View, Text, useTheme, Box, HStack, Center} from 'native-base';
import {RootStackScreenProps} from '@type';
import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {scaleH, scaleW} from '@utils/dimensionUtil';
import {useTranslation} from 'react-i18next';
import NotificationIcon from '@assets/icons/NotificationIcon';
import DeleteIcon from '@assets/icons/DeleteIcon';
import {truncateString} from '@utils/formatUtils';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const data: NotificationItem[] = [
  {
    id: '1',
    title: 'Lorem ipsum dolor!!',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: '25/02',
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet co...',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: '05/03',
  },
  {
    id: '3',
    title: 'Lorem ipsum dolor sit amet co...',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: '05/02',
  },
];

const Notification = ({navigation}: RootStackScreenProps<'Notification'>) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = createStyles(theme);
  const [listData, setListData] = useState(data);

  const renderItem = (data: {item: NotificationItem}) => (
    <View style={styles.rowFront}>
      <View style={styles.notificationContainer}>
        <NotificationIcon />
        <View style={{marginLeft: 10}}>
          <Text bold fontSize="md">
            {truncateString(data.item.title, 25)}
          </Text>
          <Text color="gray.500" isTruncated>
            {truncateString(data.item.description, 25)}
          </Text>
        </View>
        <Text style={styles.date}>{data.item.date}</Text>
      </View>
    </View>
  );

  return (
    <View flex={1} style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('Setting.notification')}
        backgroundColor="primary.500"
      />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={() => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={{
                height: '100%',
                position: 'absolute',
                right: 0,
              }}>
              <Center
                w="16"
                h="full"
                borderTopLeftRadius={5}
                borderBottomLeftRadius={5}>
                <DeleteIcon color={theme.colors.neutral[10]} />
                <Text color="white" fontSize="xs">
                  {t('Delete')}
                </Text>
              </Center>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-70}
        disableRightSwipe
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.neutral[20],
    },
    content: {
      padding: 16 * scaleW,
    },
    rowFront: {
      backgroundColor: theme.colors.neutral[10],
      borderRadius: 8,
      marginVertical: 4,
      padding: 16,
      shadowColor: 'transparent',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    rowBack: {
      backgroundColor: theme.colors.danger[100],
      flex: 1,
      paddingRight: 16 * scaleW,
      borderRadius: 8,
      marginVertical: 5 * scaleH,
    },
    notificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    date: {
      color: 'gray',
      fontSize: 12,
      position: 'absolute',
      right: 0,
    },
  });

export default Notification;
