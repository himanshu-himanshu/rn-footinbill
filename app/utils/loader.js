/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

export const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.7)',
        height: '100%',
        width: '100%',
      }}>
      Loader......
    </View>
  );
};
export default Loader;
