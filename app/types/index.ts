export type ImageLinks = {
  thumbnail: string;
  smallThumbnail: string;
};

export type VolumeInfo = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks: {
    thumbnail: string;
  };
};

export type GoogleBook = {
  id: string;
  volumeInfo: VolumeInfo;
};
