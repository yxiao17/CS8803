import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Navigator,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-community/cookies';
import Profile from './Profile';
import otherProfile from './othersProfile'
// add bottom navigation bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Comments from './Comments'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');



const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
    height: width,
  },
  avatar: {
    // position: 'absolute',
    // top: -theme.sizes.margin * 2,
    // right: theme.sizes.margin /2,
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
    borderRadius: 100,
    height: width-200,
    fontSize: theme.sizes.font * 1.3,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption,
  },
  button:{
    backgroundColor: "white"
  },
  fixToText:{
    height: 50,
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

const Separator = () => {
  return <View style={styles.separator} />;
}

export default class Article extends Component{

     scrollX = new Animated.Value(0);
     constructor(props) {

       super(props);
       this.state= {
         article: this.props.route.params.article,
         saved: this.props.route.params.article.saved,
         liked: this.props.route.params.article.liked,
         likes: this.props.route.params.article.likes,
         username: this.props.route.params.article.user.username,
         cookie: '',
         token: '',
       };

     }


    /*handle save in react native*/
    handleSave = () => {
      if (this.state.saved){
        this.setState({saved: false});
        this.favoriteApi();
      }
      else{
      this.setState({saved: true})
      this.defavoriteApi();
      }
    }

    /*handle like in react native*/
    handleLike = () => {
      if (this.state.liked){
        this.setState({liked: false})
        this.setState({likes: this.state.likes - 1});
        this.delikeApi();
      }
      else{
        this.setState({liked: true});
        this.setState({likes: this.state.likes + 1});
        this.likeApi();
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


    likeApi = async () => {
        this.getCookie();
        fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/posts/' + this.state.article.id + "/like", {
            method: 'POST',
            credentials: 'include',
            headers:{
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            // set the cookie inside of the headers
            'cookie' : this.state.cookie,
            },
            body:{},

        })
          .then((response) => {})
          .catch((error) => {
            console.error(error);
          })
    }


    delikeApi = async () => {
        this.getCookie();
        fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/posts/' + this.state.article.id + '/delike', {
            method: 'POST',
            credentials: 'include',
            headers:{
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            // set the cookie inside of the headers
            'cookie' : this.state.cookie,
            },
            body:{}
        })
        .then((response) => {})
        .catch((error) => {
        console.error(error);
        })
    }

    defavoriteApi = async () => {
             this.getCookie();
             fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/posts/' + this.state.article.id + '/defavorite', {
                 method: 'POST',
                 credentials: 'include',
                 headers:{
                 'Accept': 'application/x-www-form-urlencoded',
                 'Content-Type': 'application/x-www-form-urlencoded',
                 // set the cookie inside of the headers
                 'cookie' : this.state.cookie,
                 },
                 body:{}
             })
             .then((response) => {})
             .catch((error) => {
             console.error(error);
             })
         }


    favoriteApi = async () => {
        this.getCookie();
        fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/posts/' + this.state.article.id + '/favorite', {
            method: 'POST',
            credentials: 'include',
            headers:{
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            // set the cookie inside of the headers
            'cookie' : this.state.cookie,
            },
            body:{}
        })
        .then((response) => {})
        .catch((error) => {
        console.error(error);
        })
    }




    renderDots = () => {
        const dotPosition = Animated.divide(this.scrollX, width);
        return (
          <View style={[ styles.flex, styles.row, styles.dotsContainer ]}>
            {this.state.article.images.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index-1, index, index+1],
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={`step-${item}-${index}`}
                  style={[styles.dots, { opacity }]}
                />
              )
            })}
          </View>
        )
      }


    renderRatings = (rating) => {
        const stars = new Array(5).fill(0);
        return (
          stars.map((_, index) => {
            const activeStar = Math.floor(rating) >= (index + 1);
            return (
              <FontAwesome
                name="star"
                key={`star-${index}`}
                size={theme.sizes.font}
                color={theme.colors[activeStar ? 'active' : 'gray']}
                style={{ marginRight: 4 }}
              />
            )
          })
        )
      }

    render() {
        return (
            <View style={styles.flex}>
                <View style = {[styles.flex]}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
                    >
                        {
                            this.state.article.images.map((img, index) =>
                                <Image
                                  key={`${index}-${img}`}
                                  source={{ uri: img }}
                                  resizeMode='cover'
                                  style={{ width, height: width - 15}}
                                />
                              )
                        }
                      </ScrollView>
                      {this.renderDots()}
                </View>
                <View style={[styles.flex, styles.content]}>
                    <View style={[styles.flex, styles.contentHeader]}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("othersProfile", {user: this.state.username})} >
                        <Image style={[styles.avatar, styles.shadow]} source={{uri: this.state.article.user.avatar}}  />

                      </TouchableOpacity>
                        <Text style={styles.title}>{this.state.article.title} </Text>
                      <View style={[
                          styles.row,
                          { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
                        ]}>
                          {this.renderRatings(4.7)}
                          <Text style={{ color: theme.colors.active }}> {4.7} </Text>
                          <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
                            ({this.state.likes} likes)
                          </Text>
                      </View>
                        <TouchableOpacity>
                          <Text style={styles.description}>
                          {this.state.article.article}
                          <Text style={{color: theme.colors.active}}> Read more</Text>
                          </Text>
                        </TouchableOpacity>

                        <Separator/>

                        <View style={[styles.fixToText]} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments",{postId: this.state.article.id})}>
                                <FontAwesome
                                    name='comment'
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.handleSave()}}>
                                <FontAwesome
                                    name={(this.state.saved? "bookmark":"bookmark-o")}
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {this.handleLike()}}>
                                <FontAwesome
                                    name={(this.state.liked? "heart":"heart-o")}
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
