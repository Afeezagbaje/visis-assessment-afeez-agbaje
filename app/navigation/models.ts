import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

type data = {
  data: {
    books: any;
  };
};
export type RootStackParamList = {
  Home: undefined;
  ScanImage: undefined;
  Books: Pick<data, 'data'> | undefined;
};

export type ScreenNames = 'Home' | 'ScanImage' | 'Books';

export type routeUrlsType = {
  home: ScreenNames;
  scanImage: ScreenNames;
  books: ScreenNames;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ScanImageRoute = RouteProp<RootStackParamList, 'ScanImage'>;
export type BooksRoute = RouteProp<RootStackParamList, 'Books'>;
