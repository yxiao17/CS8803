/**
 *  * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Article from './navigation/Article'
import Post from './navigation/Post'
import Personal from './navigation/Personal'

import {

  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import * as theme from './theme';
import Profile1 from './profile';
const {width, height} = Dimensions.get('window');
import mocks from './RecommendeMock';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import Main from './navigation/Main'
import Profile from './navigation/Profile'
import Search from './navigation/Search'


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false, // change this to `false`
          }}
        />

        <Stack.Screen name="Profile" component={Profile}  />
        <Stack.Screen name="Personal" component={Personal}  />
        <Stack.Screen name="Search" component={Search}
                      options={{
                        headerShown:false,}}/>
        <Stack.Screen name="Article" component={Article}
          // load title for article
                      options={{ headerTitle: props => <LoadTitle {...props} />,
                        headerTransparent: true,
                      }} />
        <Stack.Screen name="Post" component={Post}
                      options={{ headerTitle: props => <LoadTitle {...props} />,
                        headerTransparent: true,
                      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// customize header for Article screen
function LoadTitle() {
  return (
    <View style={[styles.flex, styles.row, styles.header]}>
    </View>
  );
}


const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },

});
export default App;
