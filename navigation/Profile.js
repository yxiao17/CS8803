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
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
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
    alignItems: "center",
    flexDirection:"row",
    // left: theme.sizes.padding ,

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
    left: theme.sizes.padding/2,
    top: -theme.sizes.padding/2
  },
  text:{
    paddingHorizontal: theme.sizes.padding,
    marginHorizontal: theme.sizes.margin/2,
  }
});

// HEAD
class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cook:"",
      token:"",
      avatar:"",
      followers:"",
      following:"",
      gender:"",
      photoUrl:[],
    };

    this.getUserinfo();
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
    } catch (err) {
      console.log(err)
    }

  }
  postImageGetUrl = (img) => {

    var data = new FormData();
    data.append("key", "d00b213c9dfedf8b18907316a685f791");
    data.append("image", img);
    fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body:data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var tempUrls = this.state.photoUrl;
        tempUrls.push(responseJson.data.url);
        this.setState({"photoUrl": tempUrls});
      })
      .catch((error) => {
        console.error(error);
      });

  }
  handleChoosePhoto = async() => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri){
        this.setState({
          photo: this.state.photo.concat([response.uri]),
        })

        ImgToBase64.getBase64String(response.uri)
          .then(base64String => this.postImageGetUrl(base64String))
          .catch(err => console.log(err));

      }
      console.log("response", response);
    })
  }

  componentDidMount = async () => {
    await this.getdata();
    console.log(this.state.token)
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/' + this.state.token + '/getFollowCount', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // set the cookie inside of the headers
        'cookie': this.state.cookie,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          following: responseJson.data["followingCount"],
          followers: responseJson.data["followerCount"]
        })
      })
  }

    getUserinfo = async () => {
      await this.getdata();
      console.log(this.state.token)
      fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/'+this.state.token, {
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
          this.state.gender = responseJson.gender,
          this.state.avatar = responseJson.avatar
          })
      console.log(this.state.avatar)
        }
  genderIcon () {
    if (this.state.gender == 0) {
      return <Icon name="venus" color="pink" size={20} style={{marginHorizontal: theme.sizes.padding/3}}/>
    } else {
      return <Icon name="mars" color="blue" size={15}/>
    }
}

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.handleChoosePhoto}>
          <Image style={styles.propic} source={{uri:this.state.avatar}} />
          </TouchableOpacity>
          <View style={styles.name}>
            <Text style={{fontWeight: '700', fontSize: 20}}>{this.state.token}</Text>
            {this.genderIcon()}
          </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Followers:{this.state.followers}</Text>
            <Text style={styles.text}>Following:{this.state.following}</Text>
          </View>
      </View>


    );
  }
}


// POST
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      data: "",
      items: "",
      token:"",
      cookie:"",
    };

    this.call();

    if(this.props.navigation.isFocused){
    this.call();
    }
  }

  componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)

  }

  onScreenFocus = () => {
    this.call();
  }


  handler(){
     this.setState({items:''});
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
               onPress={() => this.props.navigation.navigate('Article',{article: item,onGoBack:()=> this.handler(), })} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
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
    this.handler = this.handler.bind(this);
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
    } catch (err) {
      console.log(err)
    }
  }


    handler(){
      this.setState({items:''});
      this.call();
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
       this.setState({items:responseJson.data})
        console.log(this.state.items)
      })

  }
  render() {
    return (
        <ScrollView style={styles.scrollview}>
          <FlatList
            data={this.state.items}
            columnWrapperStyle={{justifyContent:"space-between", padding:theme.sizes.base}}
            contentContainerStyle={{flex:1}}
            numColumns={3}
            renderItem={({item}) =>  { if (item.saved == true) {
              return (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Article',{article: item, onGoBack: ()=> this.handler()})} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
                  <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>
                  <Text style={{ alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>
                  <Text>{item.saved}</Text>
                </TouchableOpacity>
              )
            } else {
              return (null)
            }}} />
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

