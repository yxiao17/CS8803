import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Frank Odalthh",    comment:"How much do you spend on the meal?"},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",     comment:"When is a good time for us to go there?"},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", comment:"Can u recommend some food for us"},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  comment:"How long have you been there?"},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  comment:"Wow, thanks for sharing!"},
      ],
      postId: this.props.route.params.postId,
      cookie: '',
      token: '',
      item: null,
    }
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

  componentDidMount = async () => {
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
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:50,
  },
  container: {
    paddingLeft: 19,
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
});