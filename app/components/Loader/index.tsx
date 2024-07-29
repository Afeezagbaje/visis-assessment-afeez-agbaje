import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {colors} from '../../theme/colors';

type Props = {
  visible: boolean;
};

export const Loader: React.FC<Props> = ({visible}) => {
  const style = useStyles();

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={style.container}>
        <BlurView style={style.absolute} blurType="light" blurAmount={10} />
        <View style={style.loaderContainer}>
          <ActivityIndicator size={50} color={colors?.primary} />
        </View>
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    loaderContainer: {
      width: 300,
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return styles;
};
