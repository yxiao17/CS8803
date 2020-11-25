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
import Registration from './Registration';
import Main from './Main';
import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
import t from 'tcomb-form-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-community/cookies'

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
      error: 'Password cannot be empty',
      secureTextEntry: true
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
      value: {},
      token :"",
      cookie: "",
      avatar:"",
      code:"",
      email:"",
      gender:"",
      coin:""


    }
  }
  _onSubmit = async () => {
    const value = this.refs.form.getValue();
    try {
      //set the token to username

      this.setState({token: value.username});
      await AsyncStorage.setItem("token",value.username)
      this.setState({email: value.email});
      await AsyncStorage.setItem("email",value.email)
      this.setState({gender: value.gender});
      await AsyncStorage.setItem("gender",value.gender)
      this.setState({coin: value.coin});
      await AsyncStorage.setItem("coin",value.coin)
      this.setState({avatar: value.avatar});
      await AsyncStorage.setItem("avatar", value.avatar)

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
    formBody = formBody.join("&");


    if (value) { // if validation fails, value will be null
      console.log(value);
      // cDM function used to get the user login info
      this.componentDidMount(formBody);
      // call the save data function to add the cookie info in by using asyncstorage
      this.saveData(formBody);

    }
  }
  saveData = async (formBody) => {
    fetch('http://Cs8803ProjectServer-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/login', {

      method: 'POST',
      headers: {

        // 'Accept': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Connection': 'keep-alive',
      },
      credentials: "include",
      body: formBody
    })
      .then((response) => {
      //   fetch(response.url, {
      //     method: 'GET',
      //   })
      //     .then((response) => response.json())
      //     .then((responseJson) => {
      //       this.setState({
      //         avatar: responseJson.data,
      //       })
      //       console.log("avatar " +this.state.avatar.avatar)
      //       AsyncStorage.setItem("avatar", JSON.stringify(this.state.avatar.avatar));
      //     })
        CookieManager.get(response.url)
          .then(cookies => {
            console.log(cookies['JSESSIONID'])
          //  set the cookie
          this.setState({cookie: cookies['JSESSIONID'].value});
          console.log(this.state.cookie)
          //  async set item
          //  todo: not sure if omitting await is a potential issue or not
          AsyncStorage.setItem("cookie", cookies['JSESSIONID'].value);
            });
      })

      .catch((error) => {
        console.error(error);
      });

  }

  componentDidMount =(formBody) => {


    fetch('http://Cs8803ProjectServer-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/login', {

      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
      },
      credentials: "include",
      body: formBody
    })

      .then((response) => {
          fetch(response.url, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)

              if (responseJson.code == 100 ) {
                this.props.navigation.navigate("Main");
        }
            })

      })

      .catch((error) => {
        console.error(error);
      });
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
          <Text onPress={() => this.props.navigation.navigate('Registration')} > No account? Please register! </Text>
        </View>
      </View>
    );
  }
};
