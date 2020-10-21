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
    height: height,
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
       constructor(props){
       super(props);
       this.state= {
         save: false,
         like: false,
         data: {},
         };
       }

    fetchDataList(){
        fetch('https://feiertage-api.de/api/?jahr=2019&nur_land=hb', {
              method: 'GET'
            })
            .then((response)=>response.json())
            .then(
                (responseJson)=> {
                    let data = responseJson;
                    console.log(data);
                    this.setState({
                        data: data,
                    })
                }
            )
            .catch((error)=>console.error(error))
    }

     componentDidMount() {
            this.fetchDataList();
     }

    handleSave = () => {
      this.setState({save: true})
    }
    handleLike = () => {
      this.setState({like: true})
      article.likes = article.likes + 1;
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
                    <Image
                        source = {require('../atlanta.jpg')}
                        resizeMode = 'cover'
                        style = {{width, height:width-40}}
                    />
                </View>
                <View style={[styles.flex, styles.content]}>
                    <View style={[styles.flex, styles.contentHeader]}>
                        <Image style={[styles.avatar, styles.shadow]} source={require('../propic.png')} />
                        <Text style={styles.title}> {article.title} </Text>
                      <View style={[
                          styles.row,
                          { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
                        ]}>
                          {this.renderRatings(article.rating)}
                          <Text style={{ color: theme.colors.active }}> {article.rating} </Text>
                          <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
                            ({article.likes} likes)
                          </Text>
                      </View>
                        <TouchableOpacity>
                          <Text style={styles.description}>

                           {article.description.split('').slice(0, 250)}...

                          <Text style={{color: theme.colors.active}}> Read more</Text>
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
