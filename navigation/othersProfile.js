import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TextPropTypes,
  FlatList,
} from 'react-native';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {  createStackNavigator, createAppContainer } from 'react-navigation';
import Explore from './Explore';
import Main from './Main';
import Search from './Search';
const styles = StyleSheet.create({
  scrollview: {

  },
  container: {
    flexDirection: "row",
    justifyContent:"space-around",
    padding: theme.sizes.padding,
  },
  col :{
    flexDirection: "column",
    padding: theme.sizes.padding/2,
  },

  name: {
    flexDirection:"column",
    alignItems: "center",
    // padding: theme.sizes.padding * 1.5,
    top: theme.sizes.padding ,
  },


  propic: {
    width: width/3,
    height: height/5,
    borderRadius: theme.sizes.radius * 4 ,
    resizeMode: 'contain',

  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: 270,
    marginTop:height /5,
  },

  img: {
    width: width/3 + theme.sizes.margin  ,
    height: height/5 ,
    borderRadius: theme.sizes.padding - 5,

  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});

// HEAD
class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      userAvatar:"",
      userid:this.props.match.params.user,

    };
    alert(this.state.userid)
    this.getdata();
  }
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const val = await AsyncStorage.getItem("token");
      const avatar = await AsyncStorage.getItem("avatar");
      if (val !== null) {
        this.setState({token:val})
      }
      if (avatar !== null) {
        this.setState({userAvatar:avatar})
      }

    } catch (err) {
      console.log(err)
    }

  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
          <View style={styles.name}>
            <Text style={{fontWeight: '700', fontSize: 20}}>{this.state.token}</Text>



            <Text style={{ }}>Followers:{this.state.token}</Text>
            <Text style={{}}>Following:{this.state.token}</Text>
            <Text style={{ marginRight: 5}}>Likes:{this.state.token}</Text>
          </View>
        </View>
      </View>


    );
  }
}


// POST
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      items: "",
      token:"",
      cookie:"",

    };


    this.call();

  }
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const val = await AsyncStorage.getItem("token");
      const cook = await AsyncStorage.getItem("cookie");

      if (val !== null) {
        this.setState({token:val})
      }
      if (cook !== null) {
        this.setState({cookie:cook})
      }
      console.log(this.state.token)
    } catch (err) {
      console.log(err)
    }

  }
  call = async () => {


    await this.getdata();

    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/' + this.state.token + '/posts', {
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
          items: responseJson.data
        })
        console.log("items " + JSON.stringify(this.state.items))
      })
  }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <FlatList
          data={this.state.items}
          columnWrapperStyle={{justifyContent:"space-between", padding:theme.sizes.base}}
          contentContainerStyle={{flex:1}}
          numColumns={2}
          renderItem={({item}) =>  {   return (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Article',{article: item})} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
              <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>

              <Text style={{ alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>
            </TouchableOpacity>

          )}} />
      </ScrollView>
    );
  }
}


// SAVED
class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      items: "",
      token:"",
      cookie:"",


    };
    alert(this.props.route.params)
    console.log(this.state.username);

    this.call();

  }
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const val = await AsyncStorage.getItem("token");
      const cook = await AsyncStorage.getItem("cookie");

      if (val !== null) {
        this.setState({token:val})
      }
      if (cook !== null) {
        this.setState({cookie:cook})
      }
      console.log(this.state.token)
    } catch (err) {
      console.log(err)
    }

  }
  call = async () => {


    await this.getdata();
    alert(this.state.username)
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/' + this.state.token + '/posts', {
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
          items: responseJson.data
        })
        console.log("items " + JSON.stringify(this.state.items))
      })
  }
  render() {
    return (

      <ScrollView style={styles.scrollview}>
        <FlatList
          data={this.state.items}
          columnWrapperStyle={{justifyContent:"space-between", padding:theme.sizes.base}}
          contentContainerStyle={{flex:1}}
          numColumns={2}
          renderItem={({item}) =>  {   return (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Article',{article: item})} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
              <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>

              <Text style={{ alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>
            </TouchableOpacity>

          )}} />
      </ScrollView>

    );
  }
}


const Tab = createMaterialTopTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>

    <Tab.Screen name="Posts" component={Posts} />
    <Tab.Screen name="Saved" component={Saved} />

  </Tab.Navigator>
)


class Profile extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Head />
        <TabNavigator/>
      </View>
    );
  }
}

export default Profile;
