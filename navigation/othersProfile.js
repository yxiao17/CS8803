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
  FlatList, Button,
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
import CookieManager from '@react-native-community/cookies'
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
// class Head extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token:"",
//       userAvatar:"",
//       user:this.props.route.params.name
//
//
//     };
//     alert("hi"+this.state.user)
//     this.getdata();
//   }
//   getdata = async () => {
//     try {
//       // get the two saved items token -> username and cookie for headers
//       const val = await AsyncStorage.getItem("token");
//       const avatar = await AsyncStorage.getItem("avatar");
//       if (val !== null) {
//         this.setState({token:val})
//       }
//       if (avatar !== null) {
//         this.setState({userAvatar:avatar})
//       }
//
//     } catch (err) {
//       console.log(err)
//     }
//
//   }
//   render() {
//
//     return (
//
//
//
//     );
//   }
// }
//
//
// POST
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      items: "",
      username: "",


    };


    this.call();

  }
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const username = await AsyncStorage.getItem("username");
      if (username !== null) {
        this.setState({username:username})
      }
    } catch (err) {
      console.log(err)
    }
  }
  call = async () => {
    await this.getdata();

    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/' + this.state.username + '/posts', {
      method: 'GET',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers

      }
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          items: responseJson.data
        })
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
      username:"",


    };


    this.call();

  }
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const username = await AsyncStorage.getItem("username");
      const token = await AsyncStorage.getItem("token");
      if (username !== null) {
        this.setState({username:username})
      }
      if (token !== null) {
        this.setState({token:token})
      }
    } catch (err) {
      console.log(err)
    }
  }
  call = async () => {


    await this.getdata();

    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/' + this.state.username+ '/posts', {
      method: 'GET',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers

      }
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          items: responseJson.data
        })
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


class othersProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: "",
        user: this.props.route.params.user,
        username:this.props.route.params.user.username,
        userAvatar:this.props.route.params.user.avatar,
        followed:false,
        following:0,
        followers:0

      };
      this.saveData();

    };
    saveData = async () => {
      AsyncStorage.setItem("username", this.state.username);
    };
  getdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token !== null) {
        this.setState({token:token})
      }
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount = async () => {
    await this.getdata();
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/'+this.state.username+'/getFollowCount', {
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
        console.log(responseJson)
        this.setState({
          following: responseJson.data["followingCount"],
          followers: responseJson.data["followerCount"]
        })
        // alert(this.state.d);
        console.log("test"+this.state.d+this.state.following)
      })

  }
  handleFollow= () => {
    if (this.state.followed) {
      this.setState({followed: false});
      this.setState({followers: this.state.followers + 1});
      this.UnfollowApi();
    } else {

      this.setState({followed: true});
      this.setState({followers: this.state.followers - 1});
      this.followApi();
    }
  }
  followApi = () => {
    this.getdata();
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/follow/' + this.state.username , {
      method: 'POST',
      credentials: 'include',
      headers:{
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        // set the cookie inside of the headers
        'cookie' : this.state.cookie,
      },
      body:{},


    })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      })
  }

  UnfollowApi = () => {
    this.getdata();
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/unfollow/' + this.state.username , {
      method: 'POST',
      credentials: 'include',
      headers:{
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        // set the cookie inside of the headers
        'cookie' : this.state.cookie,
      },
      body:{},

    })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      })
  }
  followButton() {
    this.getdata();
    if (this.state.token == this.state.username) {
      return null
    } else {
      return <Button onPress={() => this.handleFollow() } style={{borderRadius: 10}} title={this.state.followed ?  "unfollow":"follow"}>Follow</Button>
    }
  }
  render() {


    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.container}>
            <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
            <View style={styles.name}>
              <Text style={{fontWeight: '700', fontSize: 20}}>{this.state.username}</Text>
              <Text>Followers:{this.state.followers}</Text>
              <Text>Following:{this.state.following}</Text>
              <Text style={{ marginRight: 5}}>Likes:{this.state.user.username}</Text>
              {this.followButton()}



            </View>
          </View>

        </View>
        <TabNavigator/>
      </View>
    );
  }
}

export default othersProfile;
