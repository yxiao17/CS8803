import React, { Component } from 'react'
import { FlatList, ImageBackground, Button, Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import ImagePicker from "react-native-image-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tags from "react-native-tags"
import CookieManager from '@react-native-community/cookies'
const plusIcon = require('../icons/icons8-plus-256.png');
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import ImgToBase64 from 'react-native-image-base64';

const { width, height } = Dimensions.get('window');

var article = {
    title : 'Atlanta',
    rating: '4.7',
    reviews: 3212,
    description: 'Atlanta has been dubbed everything from the "capital of the new South" and "the next international city" to "the best place to do business." It\'s also a great place to visit. Fueled by the prosperity of local mega companies like Coca Cola and Holiday Inn, the prestige of hosting the 1996 Summer Olympic Games and the energy of young upwardly mobile types who have migrated to the city in droves - Atlanta is on fire. And this time it\'s a good thing. From world-class restaurants and a myriad of cultural attractions to a hip nightlife and sporting events galore, the city is cosmopolitan in every sense of the word. But Atlanta has also managed to maintain its historic character. Stop by the Atlanta History Center or visit the Martin Luther King Jr. Historical Site, a moving tribute to an American icon. Browse through the former home of famous author Margaret Mitchell or pop into the Jimmy Carter Library and Museum for details on the life and times of the former president and his family. Whether you choose modern urban endeavors or old southern pleasures, Atlanta will not disappoint.',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ]
  }



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
    padding: theme.sizes.padding,
    backgroundColor: "white",
    height: height,
  },
  contentHeader: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: 0,
  },
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: theme.sizes.padding *2,
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
    fontWeight: 'bold',
    width: width/2,
    fontStyle: 'italic',
  },
  description: {
    marginTop:5,
    fontSize: theme.sizes.font * 1.3,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption,
    fontStyle: 'italic',
    height: height/3
  },
  locationSection: {
  },
  locationIcon: {
    padding:10
  },
  location: {
      paddingLeft:10,
      fontStyle: 'italic',
  },
    button: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 10,
    },
    imageUpload: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderColor: theme.colors.grey,
        borderWidth:1,
    },
    imageInsert: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderWidth:1,
        borderColor: theme.colors.black,
       // resizeMode:'contain',
        marginHorizontal: 5,
    },
    fixUploadImages:{
     marginTop: 15,

    },
    plusIconStyle:{
        width: 30,
        height: 30,
    },
    tagStyle: {
    backgroundColor: '#6495ED',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    },
    textTag: {
    color: '#EBEBEB',
    fontWeight: 'bold',
    },
    containerTags: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    },
});

export default class Post extends Component{

    constructor(props) {
    super(props);
    this.state = {
    curText: '',
    title: '',
    photo: [],
    location: '',
    initialTags: [],
    initialText: '',
    token: '',
    cookie: '',
    avatar: '',
    photoUrl:[],
    };
    this.avatar()
    }

    postImageGetUrl = (img) => {

    var data = new FormData();
    data.append("key", "d086ed635a22615e22b698dfaf132365");
    data.append("image", img);
    fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    body:data,
    })
    .then((response) => response.json())
    .then((responseJson) => {
        var tempUrls = this.state.photoUrl;
        tempUrls.push(responseJson.data.url);
        this.setState({"photoUrl": tempUrls});
    })
    .catch((error) => {
      console.error(error);
    });

    }

    handleChoosePhoto = async() => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri){
                this.setState({
                photo: this.state.photo.concat([response.uri]),
                    })

                ImgToBase64.getBase64String(response.uri)
                  .then(base64String => this.postImageGetUrl(base64String))
                  .catch(err => console.log(err));

            }
            console.log("response", response);
        })
    }

    componentDidMount = async () => {
        this.getAvatar();
    }

    handleTitle = (text) => {
      this.setState({ title: text })
    }
    handleText = (text) => {
      this.setState({curText: text})
    }
    handlelocation = (text) => {
      this.setState({location:text })
    }
    handleTag = (text) => {
        this.tag({tag:text})
    }

    submitPost = () => {
      alert("successfully submitted!");
      this.PostData();
      return this.props.navigation.navigate('Home');
     // this.props.route.params.onGoBack();
    }

    renderImages() {
        let images = []
        this.state.photo.map((item, index) => {
            images.push(
                       <TouchableOpacity onPress={this.handleChoosePhoto}>
                           <Image source={{uri: item}} // Use item to set the image source
                           style={styles.imageInsert}
                           />
                       </TouchableOpacity>
                )})
        return images
    }

      renderTag = ({ tag, index, onPress, deleteTagOnPress, readonly }) => {
        return (
          <TouchableOpacity
            key={`${tag}-${index}`}
            onPress={onPress}
            style={styles.tagStyle}>
            <Text style={styles.textTag}>{tag}</Text>
          </TouchableOpacity>
        );
      };

    onChangeTags = tags => {
        this.setState({ initialTags: tags });
    };

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

  avatar = async () => {
     await this.getCookie();
    fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/user/'+this.state.token, {
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
        console.log(responseJson)
        this.setState({avatar:responseJson.avatar})

      })

  }



  getCookieOriginal = () => {
        fetch('http://Cs8803ProjectServer-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/jason',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
          },
          credentials: "include",
          body: "username=test&password=password",
        })
          .then((response) => {
            console.log(response.url)
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

    // getAvatar = async() => {
    //     try{
    //         const tempAvatar = await AsyncStorage.getItem("avatar");
    //         if (tempAvatar !== null){
    //             this.setState({avatar: tempAvatar});
    //         }
    //         console.log(this.state.avatar)
    //     } catch(err){
    //         console.log(err)
    //     }
    //
    // }

    PostData = async () => {
        this.getCookie();
        try {
            // get the two saved items token -> username and cookie for headers
            const val = await AsyncStorage.getItem("token");
            const cook = await AsyncStorage.getItem("cookie");
            if (val !== null) {
             this.setState({username:val})
            }
            if (cook !== null) {
             this.setState({cookie:cook})
            }
            } catch (err) {
            console.log(err)
            }

      var formBody = [];
      var newPost = {
        'username': this.state.username,
        'title': this.state.title,
        'location': this.state.location,
        'description': this.state.curText,
        'tags': this.state.initialTags,
        'article': this.state.curText,
        'images': this.state.photoUrl,
      }

      for (var property in newPost){
        var encodeKey = encodeURIComponent(property);
        var encodeValue = encodeURIComponent(newPost[property]);

        formBody.push(encodeKey + '=' + encodeValue);
      }
      formBody = formBody.join("&");

      var url_post = "http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/" + this.state.username + "/posts";
      fetch(url_post, {
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
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
    }

    render() {
        const {textfinal} = this.state;
        const {photo} = this.state;
        return (
            <View style={styles.flex}>
                <View style={[styles.flex, styles.content]}>
                    <View style={[styles.flex, styles.contentHeader]}>
                        <Image style={[styles.avatar, styles.shadow]} source={{uri:this.state.avatar}}/>
                        <TextInput style={styles.title}
                        underlineColorAndroid = 'grey'
                        placeholder = 'Title'
                        onChangeText = {this.handleTitle}/>
                    </View>

                    <View styles={[styles.flex]} >
                        <TouchableOpacity>
                            <TextInput style={styles.description}
                            multiline
                            underlineColorAndroid = 'grey'
                            placeholder = 'Start sharing'
                            onChangeText = {this.handleText}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.locationSection}>
                    <TouchableOpacity>
                       <FontAwesome name="location-arrow" color="blue"/>
                        <TextInput style={styles.location}
                        placeholder = "location"
                        underlineColorAndroid = 'grey'
                        onChangeText = {this.handlelocation}/>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.locationSection}>
                    <TouchableOpacity>
                       <FontAwesome name="tag" color="blue"/>
                            <Tags
                                containerStyle={styles.containerTags}
                                initialText={this.state.initialText}
                                textInputProps={{
                                placeholderTextColor: theme.colors.grey,
                                placeholder: 'Add tags here',
                                fontStyle: 'italic',
                                }}
                                inputStyle={styles.location}
                                initialTags={this.state.initialTags}
                                onChangeTags={this.onChangeTags}
                                renderTag={this.renderTag}
                            />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.fixUploadImages}>
                    <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.photo}
                    renderItem={({item}) => (
                    <TouchableOpacity onPress={this.handleChoosePhoto}>
                        <Image source={{uri: item}} // Use item to set the image source
                        style={styles.imageInsert}
                        />
                    </TouchableOpacity>
                    )}
                    />
                    </View>

                    <View style={{marginLeft:width-theme.sizes.padding*2-15, marginTop:-15}}>
                    <TouchableOpacity onPress={this.handleChoosePhoto}>
                        <Image source={plusIcon}
                        style={styles.plusIconStyle}
                        />
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Button
                            title="Submit"
                            onPress={this.submitPost}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
