import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableHighlight,
  TouchableOpacity, TouchableOpacityComponent,
  View,
  Navigator,
} from 'react-native';
import * as theme from '../theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './Profile';

import Main from './Main';
import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
import t from 'tcomb-form-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-community/cookies';

const Form = t.form.Form;
const RegisterFields = t.struct({
  // email: t.String,
  username: t.String,
  password: t.String,
  confirm: t.String,
  email: t.String,
  gender: t.enums({1: 'Male', 0: 'Female'}, 'gender'),
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    fontSize: theme.sizes.font *3,
    fontWeight: "bold",
  },
  button: {
    width: '30%',
    alignSelf: 'center',
    fontWeight: '200',
    marginVertical: 30,
  },
  info: {
    flexDirection: 'row',
    padding: theme.sizes.padding * 1.5,
    left: -theme.sizes.padding,
  },
});

const options = {
  fields: {
    password: {
      type: 'password',
      placeholder: 'password',
      error: 'Password cannot be empty',
      secureTextEntry: true
    },
    username: {
      placeholder: 'username',
      error: 'Insert a valid username'
    },
    confirm:{
      placeholder:'confirm password',
      // error: "Password different!",
      secureTextEntry: true
    } ,
    email:{
      placeholder: 'email'
    },
    gender:{
      placeholder: "gender"
    }
  }
};
export default class Registration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      buttonState: true,
      value: {},
      token: "",
      cookie: "",
      avatar:""

    }
  }
  _onSubmit = async () => {
    const value = this.refs.form.getValue();

    try {
      //set the token to username
      this.setState({token: value.username});
      await AsyncStorage.setItem("token",value.username)
      this.setState({avatar:"https://i.dlpng.com/static/png/5066008-circled-user-icon-user-profile-icon-png-png-image-transparent-profile-icon-png-820_860_preview.png"});
      await AsyncStorage.setItem("avatar","https://i.dlpng.com/static/png/5066008-circled-user-icon-user-profile-icon-png-png-image-transparent-profile-icon-png-820_860_preview.png")
    } catch (err) {
      // console.log(err)
      // alert(err)
    }
    var formBody = [];
    for (var property in value) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(value[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody.push("avatar=https://i.dlpng.com/static/png/5066008-circled-user-icon-user-profile-icon-png-png-image-transparent-profile-icon-png-820_860_preview.png")
    formBody = formBody.join("&");
    console.log(formBody)
    if (value) { // if validation fails, value will be null
      console.log("val"+value);
      // cDM function used to get the user login info
      this.componentDidMount(formBody);
      // call the save data function to add the cookie info in by using asyncstorage

    }

    }

  componentDidMount=(formBody) => {
    fetch('http://Cs8803ProjectServer-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/register', {

      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
      },
      credentials: "include",
      body: formBody
    })

      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status == 406) {

          this.props.navigation.navigate("Login");
        }
        else {
          console.log("login error")
        }
      })

      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }



  onChange = () => {
    const value = this.refs.form.getValue();
    if(value) {
      this.setState({
        value,
        buttonState: false,
      });
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Please Register</Text>
        <Form
          ref="form"
          type={RegisterFields}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />

        <View style={styles.button}>
          {/*<Button>*/}
          <Button  onPress={this._onSubmit.bind(this)}
                   title="Register">
            Submit</Button>
          <Text onPress={() => this.props.navigation.navigate('Login')} > Already have an account? Please login! </Text>
        </View>
      </View>
    );
  }
};
