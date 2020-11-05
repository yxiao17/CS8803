import React, {Component} from 'react';
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
import contactData from '../mocks/contact.json';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    width: width/2 -30 ,
    height: height/4 - 30,
    marginHorizontal: theme.sizes.margin/2-5,
    marginVertical: theme.sizes.margin/2,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.padding - 5,
    top: -theme.sizes.margin+5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
const Separator1 = () => {
  return <View style={styles.separator1} />;
}
const Separator2 = () => {
  return <View style={styles.separator2} />;
}
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data1:this.props.route.params.profile,
      data: "",
      items: "",
      // article: this.props.route.params.article,
      token:"",
      userAvatar:"",
      cookie:"",
    };


    this.call();

  }
  getdata = async () => {
    try {
      // get the two saved items token -> username and cookie for headers
      const val = await AsyncStorage.getItem("token");
      const cook = await AsyncStorage.getItem("cookie");
      const avatar = await AsyncStorage.getItem("avatar");
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

  call =  () => {

    this.getdata();
    alert(this.state.token);
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
        console.log(responseJson);
        this.setState({
          items: responseJson.data
        })

      })
  }

  render() {

    return (
      <View>
      <View style={styles.container}>
        <Image style={styles.propic} source={{uri:this.state.userAvatar}} />
        <View style={styles.info}>
          <Text style={{fontWeight: '700', marginRight: 5}}>ID:</Text>
          <Text>{this.state.token}</Text>
        </View>
      </View>
        {/*<Text style={styles.bio}>{this.state.data[0].article}</Text>*/}
        <Separator1/>

          <View style={styles.title}>
          <Text style={{fontWeight: '700'}}>Posts</Text>
          <Text style={{fontWeight: '700'}}>Favorites</Text>
          <Text style={{fontWeight: '700'}}>Liked</Text>
          </View>
        <ScrollView >
          <Text>{this.state.token}</Text>
          {/*<FlatList*/}
          {/*  data={this.state.items}*/}
          {/*  renderItem={({item}) =>  {   return (*/}
          {/*    <TouchableOpacity*/}
          {/*      style={{flex:1/3, //here you can use flex:1 also*/}
          {/*      }} onPress={() => this.props.navigation.navigate('Article')} hitSlop={{top: -25, bottom: -25, left: -35, right: -30}}>*/}
          {/*      <Image style = {styles.img} resizeMode='cover' source={{ uri: item.images[0]}}></Image>*/}

          {/*      <Text style={{alignSelf:"center", fontWeight:"bold"}}>{item.title}</Text>*/}
          {/*    </TouchableOpacity>*/}

          {/*  )}} />*/}
          <Text>{this.state.items}</Text>
          <Text>{this.state.userAvatar}</Text>
        </ScrollView>
      <Separator2/>
    <View style={styles.menu}>
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
        onPress={() => this.props.navigation.navigate('Search')}
      />
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
        <Image
          style={styles.avatar}
          source={{uri:this.state.userAvatar}}>
        </Image>
      </TouchableOpacity>
    </View>
      </View>


    );
  }
}
