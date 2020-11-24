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
  FlatList, SafeAreaView,
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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import Follow from './Follow'
const styles = StyleSheet.create({
  scrollview: {

  },
  container: {
    flexDirection: "row",
    justifyContent:"space-around",
    padding: theme.sizes.padding/2,
  },
  col :{
    flexDirection: "column",
    padding: theme.sizes.padding/2,
  },

  name: {
    flexDirection:"row",
    alignItems: "center",

  },


  propic: {
    width: width/4,
    height: height/6,
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
  info:{
    flexDirection:"row",
    alignItems: "center",
    left: theme.sizes.padding,
  },
  text:{
    paddingHorizontal: theme.sizes.padding/2,
    marginHorizontal: theme.sizes.margin/4,
  },
  infoWObbutton: {
  flexDirection:"row",
    alignItems: "center",
    left: theme.sizes.padding,
    top: -theme.sizes.padding/2
}

});


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
        followers:0,
        gender:"",
        items:"",
        followingList: "",
        followerList: "",
        avatar:""

      };


    };
    saveData = async () => {
      AsyncStorage.setItem("username", this.state.username);
    };
  getdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const avatar = await AsyncStorage.getItem("avatar");
      const followed = await AsyncStorage.getItem("followed");
      if (token !== null) {
        this.setState({token:token})
      }
      if (avatar !== null) {
        this.setState({avatar:avatar})
      }
      if (followed!== null) {
        this.setState({followed:followed})
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
  handleFollow= async () => {
    if (this.state.followed) {
      console.log("followed"+ this.state.followed)
      this.setState({followed: false});
      this.setState({followers: this.state.followers - 1});
      this.UnfollowApi();
    } else {
      console.log(this.state.followed)
      this.setState({followed: true});
      this.setState({followers: this.state.followers + 1});
      this.followApi();

    }
  }
  followApi = () => {
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/follow/' + this.state.username , {
      method: 'POST',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers
        'cookie' : this.state.cookie,
      },
      body:{},


    })
      .then((response) => {console.log(response)})
      .catch((error) => {
        console.error(error);
      })
  }

  UnfollowApi = () => {
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/unfollow/' + this.state.username , {
      method: 'POST',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers
        'cookie' : this.state.cookie,
      },
      body:{},

    })
      .then((response) => {console.log(response)})
      .catch((error) => {

        console.error(error);
      })
  }

  followers = () => {
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/' + this.state.username + '/getFollower', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers
        'cookie': this.state.cookie,
      },


    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.followerList = responseJson.data
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
    this.props.navigation.navigate("Follow", {follow: this.state.followerList})
  }
  following = () => {
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/' + this.state.username + '/getFollowingUsers', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers
        'cookie': this.state.cookie,
      },

    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.followingList = responseJson.data
      })
      .catch((error) => {
        console.error(error);
      })
    console.log(this.state.followingList)
    this.props.navigation.navigate("Follow", {follow: this.state.followingList})
  }

  followButton() {

    if (this.state.token == this.state.username) {
      return <View style={styles.infoWObbutton}>
        <Text onPress={()=>this.followers()} style={styles.text}>Followers:{this.state.followers}</Text>
        <Text onPress={()=>this.following()}style={styles.text}>Following:{this.state.following}</Text>
      </View>
    } else if (this.state.followed == true && this.state.token != this.state.username){

      return <View style={styles.info}>
        <Text onPress={()=>this.followers()} style={styles.text}>Followers:{this.state.followers}</Text>
        <Text onPress={()=>this.following()} style={styles.text}>Following:{this.state.following}</Text>
        <Button type="outline"  onPress={() => this.handleFollow() }  color={"red"} title={ "unfollow"}>Follow</Button>
      </View>


    } else if (this.state.followed ==false && this.state.token != this.state.username){

      return <View style={styles.info}>
        <Text onPress={()=>this.followers()} style={styles.text}>Followers:{this.state.followers}</Text>
        <Text onPress={()=>this.following()} style={styles.text}>Following:{this.state.following}</Text>
        <Button type="outline"  onPress={() => this.handleFollow() }  color={"red"} title={ "follow"}>Follow</Button>
      </View>


    }
    // this.props.route.params.onGoBack();
  }
  getUserinfo = async () => {
   this.getdata();
    console.log(this.state.token)
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/'+this.state.username, {
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
        avatar = responseJson.data.avatar,
        this.state.gender = responseJson.data.gender
      })
    console.log("ava" + this.state.avatar)
  }
  genderIcon () {
    if (this.state.gender == 0) {
      return <Icon name="venus" color="pink" size={20} style={{marginHorizontal: theme.sizes.padding/3}}/>
    } else {
      return <Icon name="mars" color="blue" size={15}/>
    }
  }
  avatar() {
    if (this.state.username == this.state.token) {
      return <TouchableOpacity onPress={this.handleChoosePhoto}>
        <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
      </TouchableOpacity>
    }
      else {
      return <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
    }
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.container}>
            {this.avatar()}
            <View style={styles.name}>
              <Text style={{fontWeight: '700', fontSize: 20}}>{this.state.username}</Text>
              {this.genderIcon()}
            </View>
          </View>
            {this.followButton()}
        </View>
        <TabNavigator/>
      </View>


    );
  }
}

export default othersProfile;
