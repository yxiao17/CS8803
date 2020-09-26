/**
 *  * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
} from 'react-native';
import * as theme from './theme';
import Profile1 from './profile';

function HomeScreen({navigation}) {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{color: theme.colors.caption, left: 20}}>
            Search for place
          </Text>
          <Text style={{fontSize: theme.sizes.font * 2, left: 20}}>
            Destination
          </Text>
        </View>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}>
            <ImageBackground
              source={require('./propic.png')}
              style={styles.avatar}
              imageStyle={{borderRadius: theme.sizes.radius}}
            />
            <Text> Welcome, User1! </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Article')}>
          <ImageBackground
            source={require('./atlanta.jpg')}
            style={{
              height: 250,
              width: 370,
            }}
            imageStyle={{borderRadius: theme.sizes.radius}}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize: theme.sizes.font * 1.5, left: 20}}>
          Recommended
        </Text>
      </View>
    </View>
  );
}

const Profile1Stack = createStackNavigator();
function Profile() {
  return (
    <Profile1Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Profile1Stack.Screen name="Profile" component={Profile1} />
    </Profile1Stack.Navigator>
  );
}
function Article() {
  return (
    <View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Article</Text>
      </View>
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false, // change this to `false`
          }}
        />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: theme.sizes.padding * 1.5,
    height: theme.sizes.padding * 1.5,
    borderRadius: theme.sizes.padding / 2,
    alignItems: 'flex-end',
    resizeMode: 'contain',
  },
  info: {fontSize: theme.sizes.font * 1.3},
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
});
export default App;
