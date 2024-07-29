import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import {colors} from '../theme/colors';

interface RenderScreenProps {
  name: string;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
  noHeaderTitle?: boolean;
}

interface GenerateStackProps {
  paths: RenderScreenProps[];
}

const Stack = createStackNavigator();

const renderScreen = (
  {name, component, options = {}, noHeaderTitle}: RenderScreenProps,
  index: number | string,
  {tint}: {tint: string},
) => {
  return (
    <Stack.Screen
      name={name}
      key={index}
      options={() =>
        // {
        //   navigation
        // }
        ({
          title: noHeaderTitle ? '' : options?.title,
          headerTitleStyle: {
            fontFamily: 'Jua-Regular',
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
          },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomWidth: 0,
            shadowOffset: {height: 0, width: 0},
            height: Platform.OS === 'ios' ? 130 : 95,
          },
          cardStyle: {},
          headerTintColor: tint,
          // headerLeft: () => (
          //   <Pressable
          //     onPress={() => navigation.goBack()}
          //     style={{marginLeft: 20}}>
          //     <View
          //       style={{
          //         backgroundColor: colors?.black30,
          //         padding: 15,
          //         borderRadius: 14,
          //       }}>
          //       <Text
          //         style={{
          //           fontFamily: 'Gilroy-Bold',
          //           fontSize: 20,
          //           color: colors.white,
          //         }}>
          //         Cancel
          //       </Text>
          //       {/* <ChevronLeftIcon size={15} strokeWidth={3} color={colors.white} /> */}
          //     </View>
          //   </Pressable>
          // ),
          ...options,
        })
      }
      component={component}
    />
  );
};

const GenerateStack: React.FC<GenerateStackProps> = ({paths}) => {
  if (paths) {
    return (
      <Stack.Navigator>
        {paths.map((item, index) => {
          return renderScreen(item, index, {tint: '#000'});
        })}
      </Stack.Navigator>
    );
  }

  return <></>;
};

export default GenerateStack;
