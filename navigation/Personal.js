import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import contactData from '../mocks/contact.json';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    borderRadius: theme.sizes.radius *2 ,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },

  menu: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    // top: height/3+10,
    marginTop:height /2.25,

  },
  separator1:{
    marginVertical: 8,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,

  },
  separator2:{
    top:height /2.25,
    marginVertical: 8,
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
  },
  imgBig: {
    width: width/2 -30 ,
    height: height/4 - 30,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: theme.sizes.font *2,
    fontWeight:"bold",
    top : -theme.sizes.margin * 4.5,
  },
  content: {

    borderTopLeftRadius: theme.sizes.border,
    borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: 'transparent',
    padding: theme.sizes.padding,

    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
    height: height,
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin * 4.5,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  description: {
    fontSize: theme.sizes.font * 1.3,
    lineHeight: theme.sizes.font * 2,
    top: -20,
    left: 10,
    right: 10,
  },
  button:{
    backgroundColor: "white"
  },
  fixToText:{
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
const Separator1 = () => {
  return <View style={styles.separator1} />;
}
const Separator2 = () => {
  return <View style={styles.separator2} />;
}
export default class Personal extends Component {
  state = {
    data: ''
  }

  componentDidMount = () => {
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/getmockdata', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson
        })

      })
  }

  render() {

    return (
      <View>
        <Image source={{uri:this.state.data.images}}
               resizeMode = 'contain'
               style = {{width, height:width-40, top:-50}}/>
        <Text style={styles.description}>{this.state.data.description}...</Text>

    <View style={[styles.flex, styles.content]}>
      <View style={[styles.flex, styles.contentHeader]}>
        {/*<Image style={[styles.avatar, styles.shadow]} source={{uri:this.state.data.avatar}} />*/}
        <Text style={styles.title}> {this.state.data.title} </Text>
      </View>
    </View>
    </View>
    );
  }
}
