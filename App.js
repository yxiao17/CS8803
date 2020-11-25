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
import Login from './navigation/Login'
import Registration from './navigation/Registration';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchResult from './navigation/SearchResult';
import OthersArticle from './navigation/OthersArticle';

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

const {width, height} = Dimensions.get('window');
import mocks from './RecommendeMock';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import Main from './navigation/Main'
import Profile from './navigation/Profile'
import Search from './navigation/Search'
import Comments from './navigation/Comments'
import othersProfile from './navigation/othersProfile'
import Explore from './navigation/Explore';
import Follow from './navigation/Follow'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
console.disableYellowBox = true;

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();
const TabBottom = createBottomTabNavigator();
const shouldTabBarVisible = (navigation) => {
  try {
    return navigation.route.state.index < 1;
  } catch (e) {
    return true;
  }
};
const TabNavigator = (navigation) => (
  <TabBottom.Navigator tabBarOptions={{showLabel:false,showIcon: true}}>
    <Tab.Screen name="Home" component={Main}
                options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={color} size={30} />
      ),
    }}/>
    <Tab.Screen name="Post" component={Post} options={{

      tabBarVisible: shouldTabBarVisible(navigation),
      // tabBarLabel: 'Post',
      tabBarIcon: ({ color, size }) => (
        <Icon name="plus-circle" color={'#900C3F'} size={45} />
      ),
    }}/>
    <Tab.Screen name="User" component={Profile} options={{
    // tabBarLabel: 'User',
    tabBarIcon: ({ color, size }) => (
      <Icon name="user" color={color} size={30} />
    ),
  }}/>
  </TabBottom.Navigator>
)




function App() {
// const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false,}} />
        <Stack.Screen name="Registration" component={Registration} options={{
          headerShown: false,}} />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerShown: false, // change this to `false`
          }}
        />

        <Stack.Screen name="Profile" component={TabNavigator}  options={{
          headerShown:true,}}/>
        <Stack.Screen name="othersProfile" component={othersProfile}  options={{
          headerTitle: props => <LoadTitle {...props} />,
          headerTransparent:true,}}/>
        <Stack.Screen name="Search" component={Search}
                      options={{
                        headerShown:false,
                      }}/>
        <Stack.Screen name="Article" component={Article}
          // load title for article
                      options={{ headerTitle: props => <LoadTitle {...props} />,
                        headerTransparent: true,

                      }} />
        <Stack.Screen name="Comments" component={Comments}
                  // load title for article
                              options={{ headerTitle: props => <LoadTitle {...props} />,
                                headerTransparent: true,
        }} />
        <Stack.Screen name="Post" component={Post}
                      options={{ headerTitle: props => <LoadTitle {...props} />,
                        headerTransparent: true,
                      }}/>
        <Stack.Screen name="SearchResult" component={SearchResult}
                      options={{ headerTitle: props => <LoadTitle {...props} />,
                        headerTransparent: true,
                      }}/>
        <Stack.Screen name="OthersArticle" component={OthersArticle}
                      options={{ headerTitle: props => <LoadTitle {...props} />,
                        headerTransparent: true,
                      }}/>
        <Stack.Screen name="Follow" component={Follow}
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
