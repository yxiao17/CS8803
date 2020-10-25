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

const Form = t.form.Form;

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
const LoginFields = t.struct({
  username: t.String,  // a required string
  password: t.String, // a required string
});

const options = {
  fields: {
    password: {
      type: 'password',
      placeholder: 'password',
      error: 'Password cannot be empty'
    },
    username: {
      placeholder: 'username',
      error: 'Insert a valid email'
    }
  }
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: true,
      value: {}
    }
  }
  _onSubmit() {
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value);
      // value here is an instance of LoginFields
    }
    this.props.navigation.navigate('Main')

  }

  componentDidMount =() => {
    fetch('http://test-env.eba-dmkj2yrm.us-east-1.elasticbeanstalk.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: 'test',
        password: 'password',
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson / login
        })
      })
  }



  onChange = () => {
    const value = this.refs.form.getValue();
    if(value) {
      this.setState({
        value,
        buttonState: false
      });
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Please Login</Text>
        {/*<View style={styles.info}>*/}
        {/*<Text >Username:</Text>*/}
        {/*<TextInput placeholder='username'/>*/}
        {/*</View>*/}
        {/*<View style={styles.info}>*/}
        {/*<Text >Password:</Text>*/}
        {/*<TextInput placeholder='password'/>*/}
        {/*</View>*/}
        <Form
          ref="form"
          type={LoginFields}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
        <View style={styles.button}>
        <Button  onPress={this._onSubmit.bind(this)}
                 title="Login"
                >Submit</Button>
        </View>
      </View>
    );
  }
};
