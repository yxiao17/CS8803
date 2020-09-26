/**
 * Sample React Native App
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
  Dimensions,
  FlatList,

} from 'react-native';
import * as theme from './theme';
const { width, height } = Dimensions.get('window');
import mocks from './RecommendeMock'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function HomeScreen({navigation}) {

  return (
      <View>
      <View style={{flexDirection: "row",
          justifyContent: "space-between"}}>
      <View>
          <Text style={{ color: theme.colors.caption, left: 20 }}>Search for place</Text>
          <Text style={{ fontSize: theme.sizes.font * 2, left:20 }}>Destination</Text>
      </View>
      <View style = {{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Profile')}
          >
        <ImageBackground source={require('./propic.png')} style={styles.avatar}
                         imageStyle={{ borderRadius: theme.sizes.radius }}></ImageBackground>
              <Text> Welcome, User1! </Text>
          </TouchableOpacity>
      </View>
      </View>
          <View style={{flexDirection: "row",
              justifyContent: "center"}}>
          <TouchableOpacity onPress={() => navigation.navigate('Article')}>
          <ImageBackground source={require('./atlanta.jpg')} style={{
              height: 250,
              width: 370,
          }}  imageStyle={{ borderRadius: theme.sizes.radius }}></ImageBackground>
          </TouchableOpacity>
          </View>

          {/*recommended*/}
          <View>

              {/*<Text style={{ fontSize: theme.sizes.font * 1.5, left:20 }}>Recommended</Text>*/}
              <View style={[styles.flex, styles.column, styles.recommended ]}>
                  <View
                      style={[
                          styles.row,
                          styles.recommendedHeader
                      ]}
                  >
                      <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recommended for you</Text>
                      <TouchableOpacity activeOpacity={0.5}>
                          <Text style={{ color: theme.colors.caption }}>More</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={[styles.column, styles.recommendedList]}>
                      <FlatList
                          horizontal
                          pagingEnabled
                          scrollEnabled
                          showsHorizontalScrollIndicator={false}
                          scrollEventThrottle={16}
                          snapToAlignment="center"
                          style={[ styles.shadow, { overflow: 'visible' }]}
                          data={mocks}
                          keyExtractor={(item, index) => `${item.id}`}
                          renderItem={({ item, index }) => {
                            const destinations = mocks;
                            const isLastItem = index === destinations.length - 1;
                            console.log(destinations.length);
                            return (
                              <View style={[
                                styles.flex, styles.column, styles.recommendation, styles.shadow,
                                index === 0 ? { marginLeft: theme.sizes.margin } : null,
                                isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
                              ]}>
                                <View style={[styles.flex, styles.recommendationHeader]}>
                                  <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
                                  <View style={[ styles.flex, styles.row, styles.recommendationOptions ]}>
                                    <Text style={styles.recommendationTemp}>
                                      {item.temperature}℃
                                    </Text>
                                    <FontAwesome
                                      name={item.saved ? 'bookmark' : 'bookmark-o'}
                                      color={theme.colors.white}
                                      size={theme.sizes.font * 1.25}
                                    />
                                  </View>
                                </View>
                                <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
                                  <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.sizes.padding / 4.5, }}>{item.title}</Text>
                                  <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
                                  <View style={[
                                    styles.row,
                                    { alignItems: 'center', justifyContent: 'space-between', marginTop: theme.sizes.margin }
                                  ]}>
                                    <Text style={{ color: theme.colors.active }}>
                                      {item.rating}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            )
                          }
                          }
                      />
                  </View>
              </View>
          </View>

      </View>

  );
}

function Profile() {
        return (
            <View>
            <View style = {{alignItems:'center',justifyContent:'center'}}>
                <Image source={require('./propic.png')} style={styles.propic}></Image>
                <Text>Click here to change profile</Text>
            </View>
            <View style = {{alignItems:'center',justifyContent:'center'}}>
                <Text></Text>
                <Text style={styles.info}>Profile Name:           User 1</Text>
                <Text style={styles.info}>First Name:               Jon</Text>
                <Text style={styles.info}>Last Name:               Smith</Text>
            </View>
            </View>

        );

}
function Article() {
    return (
        <View>
            <View style = {{alignItems:'center',justifyContent:'center'}}>
                <Text>Article</Text>
            </View>
        </View>

    );
}
const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen  name="Home" component={HomeScreen} options={{
              headerShown: false, // change this to `false`
          }}/>

          <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Article" component={Article} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    flex: {
        flex: 0,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },

    avatar: {
        width: theme.sizes.padding*1.5,
        height: theme.sizes.padding*1.5,
        borderRadius: theme.sizes.padding / 2,
        alignItems:'flex-end',
        resizeMode: 'contain',
    },
    info: { fontSize: theme.sizes.font * 1.3,  },
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode:'cover'
    },
    recommended: {
    },
    recommendedHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.sizes.padding,
    },
    recommendedList: {
    },
    recommendation: {
        width: (width - (theme.sizes.padding * 2)) / 2,
        marginHorizontal: 8,
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
        borderRadius: theme.sizes.radius,
        marginVertical: theme.sizes.margin * 0.5,
    },
    recommendationHeader: {
        overflow: 'hidden',
        borderTopRightRadius: theme.sizes.radius,
        borderTopLeftRadius: theme.sizes.radius,
    },
    recommendationOptions: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.sizes.padding / 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    recommendationTemp: {
        fontSize: theme.sizes.font * 1.25,
        color: theme.colors.white
    },
    recommendationImage: {
        width: (width - (theme.sizes.padding * 2)) / 2,
        height: (width - (theme.sizes.padding * 2)) / 2,
    },

})
export default App;
