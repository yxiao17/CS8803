import {
  AccessibilityInfo,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text, TouchableHighlight,
  TouchableOpacity, TouchableOpacityComponent,
  View,
} from 'react-native';
import * as theme from '../theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import mocks from '../RecommendeMock';
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
    bottom: 30,
    top: 30,
  },
  avatar: {
    width: theme.sizes.padding ,
    height: theme.sizes.padding *1.1,
    borderRadius: theme.sizes.padding *2 ,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },
  container: {
    bottom:40,
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
    padding: theme.sizes.padding/3,
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
    marginVertical: theme.sizes.margin/2,
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
    marginVertical: -10,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },


});

const Separator = () => {
  return <View style={styles.separator} />;
}

export default class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isBold:true,
      isLoading:true,

      d: "",
      items: "",
      // declare in this state
      token:"",
      cookie:"",
      userAvatar:""

    };
    this.handleBold = this.handleBold.bind(this);
     this.t = setInterval(() => {
          this.setState({ count: this.state.count + 1 });
        }, 1000);
  }

  handleBold() {
    this.setState(state => ({
      isBold: !state.isBold,

    }));
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
        this.setState({userAvatar:avatar})
      }
      if (cook !== null) {
        this.setState({cookie:cook})
      }
    } catch (err) {
      console.log(err)
    }

  }

  componentDidMount = async () => {
    // await CookieManager.clearAll()
    // calls the get data function
    const t = await this.getdata();

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
          d: responseJson,
          items:responseJson.data, //parse the first layer and get all the data under 'data' in JSON
        })
        // alert(this.state.d);
        console.log(this.state.items)
      })

  }

  render() {
    return (

      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

        <Text onPress={() => {this.handleBold()}} style={[{fontWeight: this.state.isBold? "normal":"bold" }, styles.top_text]}>Explore</Text>
        <Text onPress={() => {this.handleBold()}} style={[{fontWeight: this.state.isBold? "bold":"normal" }, styles.top_text]}>Follow</Text>
        <Icon
            name="search"
            size={theme.sizes.font * 1.5}
            color={theme.colors.caption}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Search')}
          />
        </View>


        <View style={styles.container}>
          {/*Here we use flatlist to access the data*/}

        <ScrollView style={styles.scrollview}>
          <FlatList
            data={this.state.items}
            renderItem={({item}) =>  {   return (
              <TouchableOpacity
                style={{flex:1/3, //here you can use flex:1 also
                 }} onPress={() => this.props.navigation.navigate('Article',{article: item})} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
                <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>


              </TouchableOpacity>
            )}} />
        </ScrollView>
        </View>
        <Separator/>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Icon
            name="home"
            size={theme.sizes.font * 2.5}
            color={theme.colors.black}
            style={styles.add}
            onPress={() => this.props.navigation.navigate('Main')}
          />
        <Icon
          name="plus-circle"
          size={theme.sizes.font * 2.5}
          color={theme.colors.black}
          style={styles.add}
          onPress={() => this.props.navigation.navigate('Post')}
        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>

        <Image
          style={styles.avatar}

          source={{uri:this.state.userAvatar}}
          />

        </TouchableOpacity>
        </View>

      </View>

);
        }
        };




