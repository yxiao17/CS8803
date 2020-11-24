
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

import CookieManager from '@react-native-community/cookies'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import othersProfile from './othersProfile';
const styles = StyleSheet.create({
  scrollview: {

  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  // container: {
  //   flexDirection: "row",
  //   justifyContent:"space-around",
  //   padding: theme.sizes.padding/2,
  // },
  col :{
    flexDirection: "column",
    padding: theme.sizes.padding/2,
  },

  name: {
    flexDirection:"row",
    alignItems: "center",
    fontSize:16,
    fontWeight:"bold",

  },

  content: {
    marginLeft: 15,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1.5,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft: 5
  },
  time:{
    fontSize:11,
    color:"#808080",
  },


  CommentContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 20
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
    left: theme.sizes.padding
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
  },
  root: {
    marginTop: 50,
  },

});

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: this.props.route.params.follow
    }
    console.log("a"+this.state.follow)
  }
  // follow =  () => {
  //   if (this.state.follow) {
  //     return
  //   } else {
  //     return <View style={styles.root}>
  //       <Text style={{alignSelf: 'center'}}>It's empty!</Text>
  //     </View>
  //
  //   }
  // }
  render() {
    return (
      <View>
        <FlatList
          style={styles.root}
          data={this.state.follow}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={({item}) =>  {
            return (
              <View style={styles.container}>
                <Image style={styles.image} resizeMode='cover' source={{ uri: item.avatar}}></Image>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.name}>{item.username}</Text>

                  </View>
                </View>
              </View>
            )}} />
      </View>
       )
      }
}
export default Follow;
