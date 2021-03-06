import React, { Component } from 'react'
import { Button } from 'react-native-elements';

import {
  Alert,
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
  TextInput,
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
import Modal from 'react-native-modalbox';

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
    marginTop: -theme.sizes.padding * 2 ,
    height: width,
  },
  Header: {
    marginLeft: width-130,
  },
  avatar: {
    // position: 'absolute',
    // top: -theme.sizes.margin * 2,
    // right: theme.sizes.margin /2,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
    // marginTop: -60,
    // marginLeft: width - 130,

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
    fontSize: theme.sizes.font * 1.3,
    lineHeight: theme.sizes.font * 2,
    color: 'grey',
  },
  button:{
    backgroundColor: "white"
  },
  fixToText:{
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator:{
    marginVertical: 8,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  modal4: {
      height: 380,
  },

  modalContent: {
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
  },

  rewardButtons: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -30,
  },

  rewardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
    marginLeft: 30,
  },

  rewardButtonText:{
    fontSize: 50,
  },

  rewardAvatar:{
    top: 30,
    justifyContent: 'center',
    width: theme.sizes.padding * 2.5,
    height: theme.sizes.padding * 2.5,
    borderRadius: theme.sizes.padding * 2.5,
  },

  modalButtons: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 50,
    marginTop: 20
  },

  modalButton: {
    width : 150,
  },


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
         user: this.props.route.params.article.user,
         cookie: '',
         token: '',
         oneDollar: 'white',
         twoDollar: 'white',
         threeDollar: 'white',
         fiveDollar: 'white',
         oneDollarText: 'black',
         twoDollarText: 'black',
         threeDollarText: 'black',
         fiveDollarText: 'black',
         visibleModal: 'true',
         selected: false,
         customerAmount: '',
         finalSubmit: '',
       };

     }

    /*handle save in react native*/

    handleAmount = (text) =>{
        this.setState({customerAmount: text})
    }

    handleSave = () => {
      if (this.state.saved){
        this.setState({saved: false});
        this.defavoriteApi();
        this.props.route.params.onGoBack();
      }
      else{
      this.setState({saved: true})
      this.favoriteApi();
      this.props.route.params.onGoBack();
      }
    }

    handler(){
        this.setState({items:''});

        this.componentDidMount();
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
      this.props.route.params.onGoBack();
    }

    handleOneReward = () => {
        this.setState({finalSubmit: '1'});
        this.setState({oneDollar: theme.colors.active});
        this.setState({twoDollar: "white"});
        this.setState({threeDollar: 'white'});
        this.setState({fiveDollar: 'white'});
        this.setState({oneDollarText: 'white'})
        this.setState({twoDollarText: 'black'})
        this.setState({threeDollarText: 'black'})
        this.setState({fiveDollarText: 'black'})
    }

    handleTwoReward = () => {
        this.setState({finalSubmit: '2'});
        this.setState({twoDollar: theme.colors.active});
        this.setState({oneDollar: "white"});
        this.setState({threeDollar: 'white'});
        this.setState({fiveDollar: 'white'});

        this.setState({twoDollarText: 'white'})
        this.setState({oneDollarText: 'black'})
        this.setState({threeDollarText: 'black'})
        this.setState({fiveDollarText: 'black'})
    }

    handleThreeReward = () => {
        this.setState({finalSubmit: '3'});
        this.setState({threeDollar: theme.colors.active});
        this.setState({oneDollar: "white"});
        this.setState({twoDollar: 'white'});
        this.setState({fiveDollar: 'white'});

        this.setState({threeDollarText: 'white'})
        this.setState({oneDollarText: 'black'})
        this.setState({twoDollarText: 'black'})
        this.setState({fiveDollarText: 'black'})
    }

    handleFiveReward = () => {
        this.setState({finalSubmit: '5'});
        this.setState({fiveDollar: theme.colors.active});
        this.setState({oneDollar: "white"});
        this.setState({twoDollar: 'white'});
        this.setState({threeDollar: 'white'});

        this.setState({fiveDollarText: 'white'})
        this.setState({oneDollarText: 'black'})
        this.setState({twoDollarText: 'black'})
        this.setState({threeDollarText: 'black'})
    }



    submitReward = () => {
        var val = '';
        if(this.state.selected){
            val = this.state.customerAmount
        }
        else{
            val = this.state.finalSubmit;
        }

        var data = new FormData();
        data.append("uploader", this.state.article.user.username);
        data.append("value", val);

        fetch('http://Cs8803ProjectServer-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/reward', {
          method: 'POST',
          credentials: "include",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'cookie' : this.state.cookie,
          },
          body: data
        })
        .then((response) => response.json())
        .then((responseJson) => {

        })
        .catch((error) => {
          console.error(error);
        });

    }

    handleModalClose = () => {

        this.setState({customerAmount: ''});
        this.setState({finalSubmit:''});
        this.setState({selected: false});

        this.setState({fiveDollar: 'white'});
        this.setState({oneDollar: 'white'});
        this.setState({twoDollar: 'white'});
        this.setState({threeDollar: 'white'});

        this.setState({fiveDollarText: 'black'})
        this.setState({oneDollarText: 'black'})
        this.setState({twoDollarText: 'black'})
        this.setState({threeDollarText: 'black'})
        this.refs.modal7.close()
    }

    handleModalSubmit = () => {

        this.submitReward();

        this.setState({selected: false});
        this.setState({finalSubmit: ''});
        this.setState({customerAmount: ''});
        this.setState({fiveDollar: 'white'});
        this.setState({oneDollar: 'white'});
        this.setState({twoDollar: 'white'});
        this.setState({threeDollar: 'white'});

        this.setState({fiveDollarText: 'black'})
        this.setState({oneDollarText: 'black'})
        this.setState({twoDollarText: 'black'})
        this.setState({threeDollarText: 'black'})
        this.refs.modal7.close()
    }


    handleCustomerAmount(){
        this.setState({selected: true});

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
          .then((response) => {

          })
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
        .then((response) => {

        })
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


    renderReward = () => {
        if (this.state.finalSubmit == ''){
        if (!this.state.selected){
        return (
            <View>
               <TouchableOpacity onPress={()=> {this.handleCustomerAmount()}}>
               <Text style={{fontSize: 15, marginVertical: 15, color: theme.colors.active }}> Enter customize amount </Text>
               </TouchableOpacity>
          </View>
        )}
        else{
            return(
                <TextInput
                  style={{ marginVertical:15, fontSize: 15, color: 'grey', justifyContent:'center' }}
                  placeholder = 'Enter customize amount here'
                  onChangeText={this.handleAmount}
                />
            )
        }
    }
    else{
        return(
            <View>
            </View>
        )
    }

      }



render() {

        return (
            <View style={styles.flex}>
                <View >
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
                                  style={{ width, height: width - 80}}
                                />
                              )
                        }
                      </ScrollView>
                      {this.renderDots()}
                </View>
                <View style={[styles.flex, styles.content]}>
                    <View style={[styles.flex, styles.contentHeader]}>
                      <View style={styles.Header}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("othersProfile", { user:this.state.user})} >
                        <Image style={[styles.avatar, styles.shadow]} source={{uri: this.state.article.user.avatar}}  />
                      </TouchableOpacity>
                      </View>
                        <Text style={styles.title}>{this.state.article.title} </Text>
                      <View style={[
                          styles.row,
                          { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
                        ]}>
                          <Text style={{ marginLeft: 8, color: theme.colors.active }}>
                            {this.state.likes} likes
                          </Text>
                      </View>

                      <ScrollView>
                        <TouchableOpacity>
                          <Text style={styles.description}>
                          {this.state.article.article}
                          </Text>
                        </TouchableOpacity>
                        </ScrollView>
                        </View>
                        <Separator/>

                        <View style={[styles.fixToText]} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments",{postId: this.state.article.id,user:this.state.user})}>
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

                            <TouchableOpacity onPress={() => this.refs.modal7.open()}>
                                <FontAwesome
                                    name={"gift"}
                                    color="grey"
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal ref={"modal7"} style={[styles.modal, styles.modal4]} position={"center"}
                     animationType="slide"
                     transparent={true}
                     visible={false}
                    >
                      <View style={styles.modalContent}>
                        <Text style={{fontSize: 15, marginTop:20}}> Give a reward for {this.state.article.user.username}'s sharing </Text>
                        <Image style={[styles.rewardAvatar, styles.shadow]} source={{uri: this.state.article.user.avatar}}/>
                        <View style={styles.rewardButtons}>

                            <TouchableOpacity
                                style={[{backgroundColor:this.state.oneDollar},styles.rewardButton]}
                                onPress={()=>{this.handleOneReward()}}
                            >
                            <Text style={{color: this.state.oneDollarText}}>$1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[{backgroundColor:this.state.twoDollar},styles.rewardButton]}
                                onPress={()=>{this.handleTwoReward()}}
                            >
                            <Text style={{color: this.state.twoDollarText}}>$2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[{backgroundColor:this.state.threeDollar},styles.rewardButton]}
                                onPress={()=>{this.handleThreeReward()}}
                            >
                            <Text style={{color: this.state.threeDollarText}}>$3</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[{backgroundColor:this.state.fiveDollar},styles.rewardButton]}
                                onPress={()=>{this.handleFiveReward()}}
                            >
                            <Text style={{color: this.state.fiveDollarText}}>$5</Text>
                            </TouchableOpacity>
                        </View>
                        {this.renderReward()}
                        <View style={styles.modalButtons}>
                        <View style={styles.modalButton}>
                        <Button title='CANCEL'
                            onPress={() => this.handleModalClose()}
                        />
                        </View>
                        <View style={styles.modalButton}>
                        <Button title='DONE'
                            onPress={() => this.handleModalSubmit()}
                        />
                        </View>
                        </View>
                      </View>
                    </Modal>
            </View>
        );
    }
}
