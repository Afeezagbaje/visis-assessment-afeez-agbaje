import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import axios from 'axios';
import {colors} from '../../theme/colors';
import {metrics} from '../../theme/metrics';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader, Text} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../../navigation/models';

export const ScanImage: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>('');
  const [ocrResult, setOcrResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scannedAtleastOnce, setScannedAtleastOnce] = useState(false);

  const style = useStyles();

  const navigation = useNavigation<NavigationProp>();

  const goToBooksScreen = (books: any) => {
    navigation.navigate('Books', {
      data: {
        books,
      },
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to scan text',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted, PermissionsAndroid.RESULTS.GRANTED);
        if (
          granted === 'never_ask_again' ||
          PermissionsAndroid.RESULTS.GRANTED === 'granted' ||
          granted === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const cameraOptions: CameraOptions = {
    cameraType: 'back',
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 200,
    maxWidth: 200,
    quality: 1,
    // durationLimit: 30,
    presentationStyle: 'popover',
    // saveToPhotos: true,
  };

  const imagePickerOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true,
    selectionLimit: 1,
    presentationStyle: 'popover',
  };

  const selectImageFromCamera = async () => {
    setIsLoading(true);
    await requestCameraPermission();
    launchCamera(cameraOptions, (response: ImagePickerResponse) => {
      if (response.errorMessage) {
        setIsLoading(false);
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('', 'An error occurred while scanning the image');
      } else if (response?.assets?.length) {
        setImageUri(response?.assets[0]?.uri || '');
        recognizeText(response?.assets[0]?.uri || '');
        !scannedAtleastOnce && setScannedAtleastOnce(true);
        setIsLoading(false);
      } else if (response.didCancel) {
        setIsLoading(false);
        console.log('User cancelled image picker');
      }
    });
  };

  const selectImageFromGallery = () => {
    setIsLoading(true);
    launchImageLibrary(imagePickerOptions, (response: ImagePickerResponse) => {
      if (response?.assets?.length) {
        setImageUri(response?.assets[0]?.uri || '');
        recognizeText(response?.assets[0]?.uri || '');
        !scannedAtleastOnce && setScannedAtleastOnce(true);
      }
      setIsLoading(false);
    });
  };

  const recognizeText = async (uri: string) => {
    try {
      const result = await TextRecognition.recognize(uri);
      setOcrResult(result?.text);
    } catch (error) {
      console.error(error);
      Alert.alert('', 'An error occurred while scanning the image');
    }
  };

  const searchForBook = async (title: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=title:${title}`,
      );

      if (res?.status === 200) {
        if (res?.data?.items?.length) {
          goToBooksScreen(res?.data?.items);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Alert.alert('', 'We could not find the book in our database');
      }
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('', 'An error occurred while searching for the book');
    }
  };

  const formatText = (text: string) => {
    return text.replace(/(\r\n|\n|\r)/gm, ' ');
  };

  useEffect(() => {
    if (ocrResult) {
      searchForBook(ocrResult);
    }
    console.log('OCR result: ', ocrResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ocrResult]);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <>
        <View>
          <View style={style.headerContainer}>
            <Text style={style.header}>Scan your Book</Text>
          </View>
          <View style={style.imageContainer}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={style.image} />
            ) : (
              <Image
                style={style.image}
                source={require('../../assets/images/scanbook.png')}
              />
            )}
          </View>
          <View>
            {ocrResult ? (
              <Text numberOfLines={1} style={style.scanText}>
                {formatText(ocrResult)}
              </Text>
            ) : (
              <Text style={style.scanText}>
                {!scannedAtleastOnce
                  ? 'Scan to get text'
                  : 'No text recognized'}
              </Text>
            )}
          </View>
          <View style={style.buttonContainer}>
            <Pressable style={style.button} onPress={selectImageFromGallery}>
              <Text style={{color: colors?.white}}>Choose Photo</Text>
            </Pressable>
            <Pressable
              style={[style.button, {marginLeft: 20, paddingHorizontal: 30}]}
              onPress={selectImageFromCamera}>
              <Text style={{color: colors?.white}}>Take Photo</Text>
            </Pressable>
          </View>
        </View>
        <Loader visible={isLoading} />
      </>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerContainer: {
      marginTop: metrics.screenWidth * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    header: {
      color: colors?.primary,
      fontSize: 30,
      marginBottom: metrics.screenWidth * 0.2,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: 40,
    },
    image: {
      width: 300,
      height: 300,
    },
    scanText: {
      color: colors?.primary,
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 50,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      backgroundColor: colors?.primary,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
  });

  return style;
};
