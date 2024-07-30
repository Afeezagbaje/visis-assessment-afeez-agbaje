import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {BooksRoute} from '../../navigation/models';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '../../components';
import {colors} from '../../theme/colors';

const placholderImage =
  'https://res.cloudinary.com/afeezagbaje/image/upload/v1722327985/images/v61lmvmdsxip7gcj6yye.png';

export const Books: React.FC = () => {
  const style = useStyles();

  const {params} = useRoute<BooksRoute>();

  const renderBook = (book: any, index: number) => {
    return (
      <View key={`Books-${index}`} style={style.bookContainer}>
        <View style={style.imageContainer}>
          <Image
            source={{
              uri:
                book?.imageLinks?.thumbnail ||
                book?.imageLinks?.small ||
                placholderImage,
            }}
            width={200}
            height={200}
            resizeMode="contain"
            // style={{aspectRatio: 1}}
          />
        </View>
        <View style={style.descContainer}>
          <Text style={style.title} numberOfLines={3}>
            {book?.title}
          </Text>
          {book?.subtitle && (
            <Text style={style.subtitle} numberOfLines={2}>
              {book?.subtitle}
            </Text>
          )}
          {book?.authors?.length > 0 && (
            <View style={style.infoContainer}>
              <Text style={style.heading}>Author</Text>
              <Text style={style.p}>{book?.authors[0]}</Text>
            </View>
          )}
          {book?.industryIdentifiers?.length > 0 && (
            <View style={style.infoContainer}>
              <Text style={style.heading}>ISBN</Text>
              <Text style={style.p}>
                {book?.industryIdentifiers?.length > 0
                  ? book?.industryIdentifiers[0]?.identifier
                  : ''}
              </Text>
            </View>
          )}
          {book?.publishedDate && (
            <View style={style.infoContainer}>
              <Text style={style.heading}>Published</Text>
              <Text style={style.p}>{book?.publishedDate}</Text>
            </View>
          )}
          {/* {book?.pageCount && ( */}
          <View style={style.infoContainer}>
            <Text style={style.heading}>Pages</Text>
            <Text style={style.p}>{`${book?.pageCount ?? 0}`}</Text>
          </View>
          {/* )} */}
        </View>
      </View>
    );
  };

  const renderBooks = () => {
    return (
      <View>
        {params?.data?.books?.map((book: any, index: number) => {
          return renderBook(book?.volumeInfo, index);
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>{renderBooks()}</ScrollView>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    bookContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 40,
      maxWidth: '100%',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    descContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginLeft: 20,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      color: colors.gray,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 5,
      overflow: 'hidden',
      color: colors.gray,
    },
    infoContainer: {
      lineHeight: 25,
      marginBottom: 5,
    },
    heading: {
      color: colors.lightGray,
      fontSize: 12,
      fontWeight: 'normal',
      marginBottom: 0,
    },
    p: {
      color: colors.gray,
      fontSize: 16,
      marginTop: 0,
    },
  });

  return styles;
};
