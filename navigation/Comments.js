import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  Dimensions,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-community/cookies';

import * as theme from '../theme';


export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {

      postId: this.props.route.params.postId,
      cookie: '',
      token: '',
      item: null,

      value: '',

    }
    this.textInput = React.createRef();
  }

    getCookie = async () => {
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


      submitCommand = async () => {
        var formBody = [];
        var newPost = {
          'content': this.state.value,
        }
        for (var property in newPost){
          var encodeKey = encodeURIComponent(property);
          var encodeValue = encodeURIComponent(newPost[property]);
          formBody.push(encodeKey + '=' + encodeValue);
        }
        formBody = formBody.join("&");

        var url_command = "http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/posts/" + this.state.postId + "/comments";
        fetch(url_command, {
          method: 'POST',
          credentials: "include",
          headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Connection': 'keep-alive',
          'cookie': this.state.cookie,
          },
          body: formBody,
        })
        .then((response) => {
        })
        .catch((error) => {
          console.error(error);
        })
        this.textInput.current.clear();
        this.setState({items: null});
        this.getInitialData();
      }

  handleText = (text) => {
        this.setState({value: text})
      }

  componentDidMount = () => {
    this.getInitialData();
  }

  getInitialData = async () => {
    // await CookieManager.clearAll()
    // calls the get data function
    const t = await this.getCookie();


    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/posts/' + this.state.postId+ '/comments', {

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
                items:responseJson.data, //parse the first layer and get all the data under 'data' in JSON
            })
      })
  }


  render() {
    console.log(JSON.stringify(this.state.items))
    return (
    <View style={styles.page}>
      <FlatList
        style={styles.root}
        data={this.state.items}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: Notification.user.avatar}}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.user.username}</Text>
                  <Text style={styles.time}>
                    {Notification.createTime.slice(0,10)}
                  </Text>
                </View>
                <Text rkType='primary3 mediumLine'>{Notification.content}</Text>
              </View>
            </View>
          );
        }}/>
        <View style={styles.CommentContainer}>
        <TextInput style={styles.newComments}
           multiline
           placeholder = 'Say something'
           onChangeText = {this.handleText}
           ref={this.textInput}
           />
         <View style={styles.buttonStyle}>
         <Button
            title='send'
            onPress={this.submitCommand}
         />
         </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 50,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
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
    height: 1,
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
  name:{
    fontSize:16,
    fontWeight:"bold",
  },

  CommentContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 20
  },
  newComments: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    width: 250,
  },
  buttonStyle: {
    justifyContent: 'center',
    width: 70,
    borderRadius: 20,
  }
});

