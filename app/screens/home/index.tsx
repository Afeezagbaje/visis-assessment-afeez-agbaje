import {View, StyleSheet, Pressable, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {metrics} from '../../theme/metrics';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../navigation/models';
import {Text} from '../../components';

export const Home: React.FC = () => {
  const style = useStyles();

  const navigation = useNavigation<NavigationProp>();

  const goToScanScreen = () => {
    navigation.navigate('ScanImage');
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Text style={style.logo}>BOOKWORM</Text>
      <View>
        <Text style={style.desc}>
          Unlock the Story Behind the Cover! Scan your favorite books to
          discover their hidden gems. Get instant access to the author's
          insights, intriguing summaries, publication history, and much more.
          Dive deeper into the world of your beloved reads with just one scan!
        </Text>
        <Pressable style={style.button} onPress={goToScanScreen}>
          <Text style={style.buttonText}>Start Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    logoContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
    logo: {
      color: colors?.primary,
      fontSize: 30,
      marginTop: 20,
      marginBottom: metrics.screenWidth * 0.3,
    },
    desc: {
      color: colors?.primary,
      fontSize: 20,
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors?.primary,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: metrics.screenWidth * 0.2,
    },
    buttonText: {
      color: colors?.white,
      fontSize: 20,
    },
  });

  return style;
};
