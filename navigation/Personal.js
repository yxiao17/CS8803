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
  avatar: {
    width: theme.sizes.padding ,
    height: theme.sizes.padding *1.1,
    borderRadius: theme.sizes.padding / 2,
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
        style={styles.imgBig}/>
        <Text>{this.state.data.description}</Text>
      </View>
    );
  }
}
