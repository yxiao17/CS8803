import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';

// add bottom navigation bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width, height } = Dimensions.get('window');

var article = {
    title : 'Atlanta',
    rating: '4.7',
    likes: 3212,
    description: 'Atlanta has been dubbed everything from the "capital of the new South" and "the next international city" to "the best place to do business." It\'s also a great place to visit. Fueled by the prosperity of local mega companies like Coca Cola and Holiday Inn, the prestige of hosting the 1996 Summer Olympic Games and the energy of young upwardly mobile types who have migrated to the city in droves - Atlanta is on fire. And this time it\'s a good thing. From world-class restaurants and a myriad of cultural attractions to a hip nightlife and sporting events galore, the city is cosmopolitan in every sense of the word. But Atlanta has also managed to maintain its historic character. Stop by the Atlanta History Center or visit the Martin Luther King Jr. Historical Site, a moving tribute to an American icon..',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ]
  }



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
    height: width,
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

const Separator = () => {
  return <View style={styles.separator} />;
}

export default class Article extends Component{

     scrollX = new Animated.Value(0);
     constructor(props) {

       super(props);
       this.state= {
         save: false,
         like: false,
         data: [],
         user: [],
         images: [],
       };
     }


    componentDidMount = () => {
        var data_get = []
        var users_get = []
        var images_get = []
        fetch('http://cs8803projectserver-env.eba-ekap6gi3.us-east-1.elasticbeanstalk.com/api/getmockdata-2', {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          for (var i = 0; i < responseJson.data.length; i++){
            var data_i = responseJson.data[i];
             data_get.push(data_i)
             users_get.push(data_i.user)
          }
          this.setState({data:data_get[0]})
          this.setState({user:users_get[0]})

          for (var i = 0; i < data_get[0].images.length; i++){
            images_get.push(data_get[0].images[i])
          }
          this.setState({images:images_get})
          console.log(images_get.length)
          })
        .catch((error) => {
          console.error(error);
        });
        }

    /*handle save in react native*/
    handleSave = () => {
      if (this.state.save){
        this.setState({save: false})
      }
      else{
      this.setState({save: true})
      }
    }

    /*handle like in react native*/
    handleLike = () => {
      if (this.state.like){
        this.setState({like: false})
        article.likes = article.likes - 1;
      }
      else{
        this.setState({like: true})
        article.likes = article.likes + 1;
      }
    }

    renderDots = () => {
        const dotPosition = Animated.divide(this.scrollX, width);
        return (
          <View style={[ styles.flex, styles.row, styles.dotsContainer ]}>
            {article.images.map((item, index) => {
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
                          this.state.images.map((img, index) =>
                            <Image
                              key={`${index}-${img}`}
                              source={{ uri: img }}
                              resizeMode='cover'
                              style={{ width, height: width-15 }}
                            />
                          )
                        }
                      </ScrollView>
                      {this.renderDots()}
                </View>
                <View style={[styles.flex, styles.content]}>
                    <View style={[styles.flex, styles.contentHeader]}>
                        <Image style={[styles.avatar, styles.shadow]} source={{uri: this.state.user.avatar}} />
                        <Text style={styles.title}> {this.state.data.title} </Text>
                      <View style={[
                          styles.row,
                          { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
                        ]}>
                          {this.renderRatings(article.rating)}
                          <Text style={{ color: theme.colors.active }}> {article.rating} </Text>
                          <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
                            ({this.state.data.likes} likes)
                          </Text>
                      </View>
                        <TouchableOpacity>
                          <Text style={styles.description}>
                          <Text style={{color: theme.colors.active}}> Read more</Text>
                          {this.state.data.description}

                          </Text>
                        </TouchableOpacity>
                        <Separator/>
                        <View style={styles.fixToText} >
                            <TouchableOpacity onPress={() => {}}>
                                <FontAwesome
                                    name='comment'
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.handleSave()}}>
                                <FontAwesome
                                    name={(this.state.save? "bookmark":"bookmark-o")}
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.handleLike()}}>
                                <FontAwesome
                                    name={(this.state.like? "heart":"heart-o")}
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
