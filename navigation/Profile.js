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
    justifyContent: "space-between",
    flexDirection: "row",
    padding: theme.sizes.padding,
  },
  col :{
    flexDirection: "column",
    padding: theme.sizes.padding/2,
  },
  info: {
    flexDirection: 'row',
    padding: theme.sizes.padding * 1.5,
    left: -theme.sizes.padding,
  },
  name: {
    fontSize:theme.sizes.font + 5,
    fontFamily: "notoserif",
  },
  bio:{
    paddingVertical: -theme.sizes.padding,
    padding: theme.sizes.padding/2,
  },
  propic: {
    width: width/3,
    height: height/5,
    borderRadius: theme.sizes.radius * 4 ,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },
  avatar: {
    width: theme.sizes.padding ,
    height: theme.sizes.padding *1.1,
    borderRadius: theme.sizes.padding ,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },
  menu: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: 270,
    marginTop:height /5,

  },
  separator1:{
    marginVertical: 8,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,

  },
  separator2:{
    // marginBottom: 30,
    top: 410,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  img: {
    width: width/3 + theme.sizes.margin  ,
    height: height/5 ,
    left: -theme.sizes.base,
    marginVertical: theme.sizes.margin,
    // paddingHorizontal: theme.sizes.padding,

    borderRadius: theme.sizes.padding - 5,
    // top: -theme.sizes.margin+5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  posts: {
    marginHorizontal:40

    // marginLeft: -theme.sizes.margin
  }
});
class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      userAvatar:"",
    };
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

        <View style={styles.container}>
          <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
          <View style={styles.info}>
            <Text style={{fontWeight: '700', marginRight: 5}}>ID:</Text>
            <Text>{this.state.token}</Text>
          </View>
        </View>

    );
  }
}

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
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={styles.posts}
          numColumns={2}
          renderItem={({item}) =>  {   return (
            <TouchableOpacity
              style={{flex:1/3, //here you can use flex:1 also
              }} onPress={() => this.props.navigation.navigate('Article')} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
              <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>

              <Text style={{alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>
            </TouchableOpacity>

          )}} />
      </ScrollView>
    );
  }
}

class Saved extends React.Component {
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
            columnWrapperStyle={{justifyContent: 'space-around'}}
            contentContainerStyle={styles.posts}
            numColumns={2}
            renderItem={({item}) =>  {   return (
              <TouchableOpacity
                style={{flex:1/3, //here you can use flex:1 also
                }} onPress={() => this.props.navigation.navigate('Article')} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>
                <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>

                <Text style={{alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>
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
// import React, {Component} from 'react';

// import contactData from '../mocks/contact.json';

//
//
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import ScrollableTabBarExample from 'react-native-tab-view/lib/typescript/example/src/ScrollableTabBarExample';
//
// const Tab = createMaterialTopTabNavigator();
// const ProfileNavigate = () => (
//   <Tab.Navigator style={{}}>
//
//     <Tab.Screen name="Posts" component={Profile} />
//     <Tab.Screen name="Favorites" component={ProfileSaved} />
//
//   </Tab.Navigator>
// );

// const Separator1 = () => {
//   return <View style={styles.separator1} />;
// }
// const Separator2 = () => {
//   return <View style={styles.separator2} />;
// }
// export default class Profile extends Component {


//

//   render() {
//
//     return (
//       <View>
//       <View style={styles.container}>
//         <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
//         <View style={styles.info}>
//           <Text style={{fontWeight: '700', marginRight: 5}}>ID:</Text>
//           <Text>{this.state.token}</Text>
//         </View>
//       </View>
//         {/*<Text style={styles.bio}>{this.state.data[0].article}</Text>*/}
//         <Separator1/>
//
//           <View style={styles.title}>
//           <Text style={{fontWeight: '700'}}>Posts</Text>
//           <Text style={{fontWeight: '700'}}>Favorites</Text>
//           <Text style={{fontWeight: '700'}}>Liked</Text>
//           </View>
//         {/*<NavigationContainer>*/}
//         {/*<Tab.Navigator style={{}}>*/}
//
//         {/*  <Tab.Screen name="Posts" component={Profile} />*/}
//         {/*  <Tab.Screen name="Favorites" component={ProfileSaved} />*/}
//
//         {/*</Tab.Navigator>*/}
//         {/*</NavigationContainer>*/}
//         <ScrollableTabView>j</ScrollableTabView>

//         </ScrollView>
//       <Separator2/>
//     <View style={styles.menu}>
//       <Icon
//         name="home"
//         size={theme.sizes.font * 2.5}
//         color={theme.colors.black}
//         style={styles.add}
//         onPress={() => this.props.navigation.navigate('Main')}
//       />
//       <Icon
//         name="plus-circle"
//         size={theme.sizes.font * 2.5}
//         color={theme.colors.black}
//         style={styles.add}
//         onPress={() => this.props.navigation.navigate('Search')}
//       />
//       <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
//         <Image
//           style={styles.avatar}
//           source={{uri:this.state.userAvatar}}>
//         </Image>
//       </TouchableOpacity>
//     </View>
//       </View>
//
//
//     );
//   }
// }
