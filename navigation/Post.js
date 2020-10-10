import React, { Component } from 'react'
import { ImageBackground,Button, Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import ImagePicker from "react-native-image-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    right: theme.sizes.margin,
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
});

export default class Search extends Component{
    state = {
    curText: '',
    title: '',
    photo: null,
    location: '',
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri){
                this.setState({photo: response})
            }
            console.log("response", response);
        })
    }

    handleTitle = (text) => {
      this.setState({ title: text })
    }
    handleText = (text) => {
      this.setState({curText: text})
    }
    login = (email, pass) => {
          alert('email: ' + email + ' password: ' + pass)
    }
    handlelocation = (text) => {
      this.setState({location:text })
    }
    handleTag = (text) => {
        this.tag({tag:text})
    }

    submitPost = () => {
      alert("successfully submitted!");
    }

    render() {
        const {photo} = this.state;
        return (
            <View style={styles.flex}>
                <View style={[styles.flex, styles.content]}>
                    <View style={[styles.flex, styles.contentHeader]}>
                        <Image style={[styles.avatar, styles.shadow]} source={require('../propic.png')} />
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
                        <TextInput style={styles.location}
                        placeholder = "tags"
                        underlineColorAndroid = 'grey'
                        onChangeText = {this.handlelocation}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flex:1, alignItems:"center",justifyContent:'center'}}>
                        {photo && (
                            <Image
                                source={{uri: photo.uri}}
                                style={styles.imageUpload}
                            />
                        )}
                        <Button
                            title="Choose Photo"
                            onPress={this.handleChoosePhoto}
                            color="grey"
                        />
                    </View>
                    <TouchableOpacity>
                        <Button
                            title="Submit"
                            onPress={this.submitPost}
                            color="grey"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
