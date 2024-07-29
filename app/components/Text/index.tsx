import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {colors} from '../../theme/colors';

export const Text: React.FC<TextProps> = ({children, style, ...props}) => {
  return (
    <RNText
      {...props}
      style={[{color: colors.primary, fontFamily: 'Jua-Regular'}, style]}>
      {children}
    </RNText>
  );
};
