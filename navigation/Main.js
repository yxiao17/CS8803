import {
  AccessibilityInfo,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text, TouchableHighlight,
  TouchableOpacity, TouchableOpacityComponent,
  View,
} from 'react-native';
import * as theme from '../theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './Profile';
import Search from './Search';
import Article from './Article';

import Post from './Post';
import React from 'react';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-community/cookies';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');

import { NavigationEvents } from 'react-navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Explore from './Explore';



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
  top_text: {
    fontSize: theme.sizes.font * 1.4,
    // fontFamily:"Times New Roman",
    fontFamily:"Times New Roman",
    left: theme.sizes.padding-5,
    marginTop: 10,
  },
  scrollview:{
    height: height-90,
    top : -theme.sizes.base * 2,
    bottom: 30,
  },
  avatar: {
    width: theme.sizes.padding-5 ,
    height: theme.sizes.padding-5 ,
    paddingVertical: theme.sizes.margin + 5,
    borderRadius: theme.sizes.padding  ,
    resizeMode: 'contain',



  },
  container: {
    top : theme.sizes.base * 2,
    bottom: 0,

  },
  locations: {
    flex: 3,
    justifyContent: 'space-between',
    paddingBottom: 30,
    alignItems:"center",
    marginTop: 10,
    // flexDirection: "row",

  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    left: theme.sizes.padding,
  },

  add: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingVertical: theme.sizes.padding/1.75,
    paddingHorizontal: -theme.sizes.padding,

  },
  imgMain: {
    width: width/1.25,
    height: height/4,
    alignSelf: 'center',
    borderRadius: theme.sizes.padding - 5,
    marginTop: theme.sizes.padding * 2,
    padding: 5,
  },
  addbold:{
    fontWeight:"bold",
    marginTop: 10,
  },
  img: {
    alignSelf: 'center',
    // marginTop: theme.sizes.padding * 2,
    width: width/1.25 ,
    height: height/4,
    marginHorizontal: theme.sizes.margin/2-5,
    marginVertical: theme.sizes.margin/5,
    // paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.padding - 5,
  },

  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: -250,
    left: 40,
    backgroundColor: theme.colors.white,
    width: 270,
  },

  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.sizes.padding,
  },

  recommendation: {
    // width: (width - theme.sizes.padding * 2) / 2,
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
    color: theme.colors.white,
  },
  separator:{
    marginVertical: -20,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },


});


const Tab = createMaterialTopTabNavigator();
const TabNavigator = (navigation) => (
  <Tab.Navigator>
    <Tab.Screen name="Explore" component={Explore} />
    <Tab.Screen name="Following" component={Home} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)


class Home extends React.Component{

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      d: "",
      items: "",
      // declare in this state
      token:"",
      cookie:"",
      active: 0,
    };


  }

  // get data function to read the saved data to persist the user info
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const val = await AsyncStorage.getItem("token");
      const cook = await AsyncStorage.getItem("cookie");
      const avatar = await AsyncStorage.getItem("avatar");


      console.log(avatar,val);
      if (val !== null) {
        this.setState({token:val})
      }
      if (avatar !== null) {
        this.setState({avatar:avatar})
      }
      if (cook !== null) {
        this.setState({cookie:cook})
      }
    } catch (err) {
      console.log(err)
    }

  }

  handler = () => {

      this.setState({items: ''});
      this.setState({d: ''});
      this.componentDidMount();

  }

  componentDidMount = async () => {
    // await CookieManager.clearAll()
    // calls the get data function
    const t = await this.getdata();

    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/recommendation', {

      method: 'GET',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers
        'cookie' : this.state.cookie,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          d: responseJson,
          items:responseJson.data, //parse the first layer and get all the data under 'data' in JSON
        })
        // alert(this.state.d);
        console.error(error)
      })

  }

  render() {
    return (
      <View>

      {/*<TabNavigator/>*/}
          {/*Here we use flatlist to access the data*/}

          <SafeAreaView style={styles.container}>

        <ScrollView style={styles.scrollview}>
          <FlatList
            data={this.state.items}
            renderItem={({item}) =>  {   return (
              <TouchableOpacity
                style={{flex:1/3, //here you can use flex:1 also
                 }} onPress={() => this.props.navigation.navigate('Article',{article: item, onGoBack: ()=> this.handler()})} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
                <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>

               <Text style={{alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>
              </TouchableOpacity>

            )}} />
        </ScrollView>

          </SafeAreaView>
    </View>





);
        }
        };

export default class Main extends React.Component{
  render() {
    return (
      <TabNavigator/>
    );
  }
}



