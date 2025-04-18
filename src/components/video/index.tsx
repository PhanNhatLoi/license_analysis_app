import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import VideoPlayer from 'react-native-video';
import {RootStackScreenProps} from '@type';
import {View} from 'native-base';
import {BackIcon} from '@assets/icons/Back';
import {scaleH, scaleW} from '@utils/dimensionUtil';

const ReactNaviveVideo = ({
  navigation,
  route,
}: RootStackScreenProps<'ReactNaviveVideo'>) => {
  const {videoURI} = route.params;
  const videoRef = useRef(null);
  return (
    <View style={{height: '100%', width: '100%'}}>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <VideoPlayer
          ref={videoRef}
          source={{uri: videoURI}}
          style={{
            width: '100%',
            height: '100%',
          }}
          controls={true}
          repeat={false}
          resizeMode="contain"
          muted
        />
      </View>
      <View
        style={{
          backgroundColor: '#000',
          height: 100 * scaleH,
          padding: 24 * scaleW,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            height: 30 * scaleW,
            width: 40 * scaleW,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BackIcon fill={'#ffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReactNaviveVideo;

const styles = StyleSheet.create({});
