import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import * as theme from '../theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import mocks from '../RecommendeMock';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import Profile1 from '../profile';
import {NavigationContainer} from '@react-navigation/native';
import Article from './Article';
import Post from './Post';
import React from 'react';
import {Button} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
const contactData = require('../mocks/contact.json');



const styles = StyleSheet.create({
    flex: {
      flex: 0,
    },
    column: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row'
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
    back: {
      width: theme.sizes.base * 3,
      height: theme.sizes.base * 3,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    content: {
      // backgroundColor: theme.colors.active,
      // borderTopLeftRadius: theme.sizes.border,
      // borderTopRightRadius: theme.sizes.border,
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
      top: -theme.sizes.margin,
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
    title: {
      fontSize: theme.sizes.font * 2,
      fontWeight: 'bold'
    },
    description: {
      fontSize: theme.sizes.font * 1.3,
      lineHeight: theme.sizes.font * 2,
      color: theme.colors.caption,
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
    separator:{
      marginVertical: 8,
      borderBottomColor: theme.colors.grey,
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });

export default class Search extends React.Component {
  handleText = (text) => {
    this.setState({curText: text})
  }

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

        <View styles={[styles.flex]} >
          <TouchableOpacity>
            <TextInput style={styles.description}
                       multiline
                       underlineColorAndroid = 'grey'
                       placeholder = 'Search...'
                       onChangeText = {this.handleText}/>
          </TouchableOpacity>
          <Icon
            name="search"
            size={theme.sizes.font * 1.5}
            color={theme.colors.caption}
            style={styles.button}

            onPress={() => this.props.navigation.navigate('Search')}
          />
          <Text
            placeholder="Type here to translate!"
            onChangeText={(text) => {
              this.fetchData(text);
            }}
          />
        </View>

    );
  }
}
