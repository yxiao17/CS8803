import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text, TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import * as theme from '../theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import mocks from '../RecommendeMock';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import Profile1 from '../profile';
import {NavigationContainer} from '@react-navigation/native';
import Article from './Article';
import Search from './Search';
import React from 'react';
import {Button} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
const contactData = require('../mocks/contact.json');
const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  top_text: {
    fontSize: theme.sizes.font * 1.4,
    fontFamily:"Times New Roman",
    left: theme.sizes.padding,

  },
  scrollview:{
    height: height-90,
  },
  avatar: {
    width: theme.sizes.padding ,
    height: theme.sizes.padding *1.1,
    borderRadius: theme.sizes.padding / 2,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },
  locations: {
    flex: 3,
    justifyContent: 'space-between',
    paddingBottom: 30,
    flexDirection: "row",

  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 5,
    left: theme.sizes.padding,
  },

  add: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    padding: 5,

  },
  imgMain: {
    width: width/1.25,
    height: height/4,
    alignSelf: 'center',
    borderRadius: theme.sizes.padding - 5,
  },
  img: {
    width: width/2 -30 ,
    height: height/4 - 15,
    marginHorizontal: theme.sizes.margin/2-5,
    marginVertical: theme.sizes.margin/2,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.padding - 5,
  },

  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: -250,
    left: 40,
    backgroundColor: theme.colors.white,
    width: 270,
  },

  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.sizes.padding,
  },
  recommendedList: {},
  recommendation: {
    // width: (width - theme.sizes.padding * 2) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.sizes.padding / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white,
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

export default class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      click: false,

    };
  }
  handleClick = () => {
    this.setState({click: true})
  }
  render() {

    return (
      <View>
      <ScrollView style={styles.scrollview}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text style={styles.top_text}>Nearby</Text>
        <Text style={styles.top_text} >Explore</Text>
        <Text style={styles.top_text}>Follow</Text>
        <Icon
            name="search"
            size={theme.sizes.font * 1.5}
            color={theme.colors.caption}
            style={styles.button}

            onPress={() => this.props.navigation.navigate('Search')}
          />
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Article')}>
        <Image
          source = {require('../atlanta.jpg')}
          resizeMode = 'cover'
          style = {styles.imgMain}
        />
        </TouchableOpacity>
        <View style={styles.locations}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
          <Image
            source = {require('../santorini.jpg')}
            resizeMode = 'cover'
            style = {styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
          <Image
            source = {require('../santorini.jpg')}
            resizeMode = 'cover'
            style = {styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
          <Image
            source = {require('../santorini.jpg')}
            resizeMode = 'cover'
            style = {styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
          <Image
            source = {require('../santorini.jpg')}
            resizeMode = 'cover'
            style = {styles.img}
          />
        </TouchableOpacity>


        </View>
        <Text>{contactData.name}</Text>
      </ScrollView>
        <Separator/>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Icon
            name="home"
            size={theme.sizes.font * 2.5}
            color={theme.colors.black}
            style={styles.add}
            onPress={() => this.props.navigation.navigate('Main')}
          />
        <Icon
          name="plus-circle"
          size={theme.sizes.font * 2.5}
          color={theme.colors.black}
          style={styles.add}
          onPress={() => this.props.navigation.navigate('Search')}
        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
        <Image
          style={styles.avatar}
          source={require('../propic.png')}>
        </Image>
        </TouchableOpacity>
        </View>
      </View>

    );
  }
}
// function HomeScreen({navigation}) {
//   return (
//     <View>
//
//         <View>
//
//           <Text style={{fontSize: theme.sizes.font * 2, left: 20}}>
//             Destination
//           </Text>
//         </View>
//
//         <View
//           style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('Profile')}>
//             <ImageBackground
//               source={require('./propic.png')}
//               style={styles.avatar}
//               imageStyle={{borderRadius: theme.sizes.radius}}
//             />
//             <Text> Welcome, User1! </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//
//       <View>
//         <TouchableOpacity onPress={() => navigation.navigate('Article')}>
//           <ImageBackground
//             source={require('./atlanta.jpg')}
//             style={{
//               left: 20,
//               height: 250,
//               width: 370,
//             }}
//             imageStyle={{borderRadius: theme.sizes.radius}}>
//             <View style={{flexDirection: 'row'}}>
//               <Image
//                 style={{
//                   left: 55,
//                   top: 30,
//                   height: 50,
//                   width: 50,
//                 }}
//                 imageStyle={{borderRadius: theme.sizes.radius}}
//                 source={require('./propic.png')}
//               />
//               <Text
//                 style={{
//                   fontWeight: 'bold',
//                   left: 75,
//                   top: 30,
//                   color: theme.colors.white,
//                 }}>
//                 Julia Smith
//               </Text>
//               <Text style={{color: theme.colors.white, bottom: -50, left: 10}}>
//                 <Octicons
//                   name="location"
//                   size={theme.sizes.font * 0.8}
//                   color={theme.colors.white}
//                 />
//                 <Text>Atlanta, GA USA</Text>
//               </Text>
//               <Text
//                 style={{
//                   color: theme.colors.white,
//                   bottom: 0,
//                   left: 80,
//                   top: 10,
//                 }}>
//                 <Icon
//                   name="thumbs-up"
//                   size={theme.sizes.font * 0.8}
//                   color={theme.colors.white}
//                 />
//                 <Text>1,553</Text>
//               </Text>
//
//               <View
//                 style={[styles.column, styles.destinationInfo, styles.shadow]}>
//                 <Text
//                   style={{
//                     fontSize: theme.sizes.font * 1.25,
//                     fontWeight: '500',
//                     paddingBottom: 8,
//                   }}>
//                   Atlanta
//                 </Text>
//                 <View
//                   style={[
//                     styles.row,
//                     {justifyContent: 'space-between', alignItems: 'flex-end'},
//                   ]}>
//                   <Text style={{color: theme.colors.caption}}>
//                     Atlanta has been dubbed everything from the "capital of the
//                     new South" and "the next international city" to...
//                   </Text>
//                   <Icon
//                     name="chevron-right"
//                     size={theme.sizes.font * 0.75}
//                     color={theme.colors.caption}
//                   />
//                 </View>
//               </View>
//             </View>
//           </ImageBackground>
//         </TouchableOpacity>
//       </View>
//       {/*recommended*/}
//       <View>
//         {/*<Text style={{ fontSize: theme.sizes.font * 1.5, left:20 }}>Recommended</Text>*/}
//         <View style={[styles.flex, styles.column, styles.recommended]}>
//           <View style={[styles.row, styles.recommendedHeader]}>
//             <Text style={{fontSize: theme.sizes.font * 1.4}}>
//               {'\n'}
//               {'\n'}
//               {'\n'}
//               Recommended for you
//             </Text>
//             <TouchableOpacity activeOpacity={0.5}>
//               <Text style={{color: theme.colors.caption}}>More</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={[styles.column, styles.recommendedList]}>
//             <FlatList
//               horizontal
//               pagingEnabled
//               scrollEnabled
//               showsHorizontalScrollIndicator={false}
//               scrollEventThrottle={16}
//               snapToAlignment="center"
//               style={[styles.shadow, {overflow: 'visible'}]}
//               data={mocks}
//               keyExtractor={(item, index) => `${item.id}`}
//               renderItem={({item, index}) => {
//                 const destinations = mocks;
//                 const isLastItem = index === destinations.length - 1;
//                 console.log(destinations.length);
//                 return (
//                   <View
//                     style={[
//                       styles.flex,
//                       styles.column,
//                       styles.recommendation,
//                       styles.shadow,
//                       index === 0 ? {marginLeft: theme.sizes.margin} : null,
//                       isLastItem ? {marginRight: theme.sizes.margin / 2} : null,
//                     ]}>
//                     <View style={[styles.flex, styles.recommendationHeader]}>
//                       <Image
//                         style={[styles.recommendationImage]}
//                         source={{uri: item.preview}}
//                       />
//                       <View
//                         style={[
//                           styles.flex,
//                           styles.row,
//                           styles.recommendationOptions,
//                         ]}>
//                         <Text style={styles.recommendationTemp}>
//                           {item.temperature}℃
//                         </Text>
//                         <FontAwesome
//                           name={item.saved ? 'bookmark' : 'bookmark-o'}
//                           color={theme.colors.white}
//                           size={theme.sizes.font * 1.25}
//                         />
//                       </View>
//                     </View>
//                     <View
//                       style={[
//                         styles.flex,
//                         styles.column,
//                         styles.shadow,
//                         {
//                           justifyContent: 'space-evenly',
//                           padding: theme.sizes.padding / 2,
//                         },
//                       ]}>
//                       <Text
//                         style={{
//                           fontSize: theme.sizes.font * 1.25,
//                           fontWeight: '500',
//                           paddingBottom: theme.sizes.padding / 4.5,
//                         }}>
//                         {item.title}
//                       </Text>
//                       <Text style={{color: theme.colors.caption}}>
//                         {item.location}
//                       </Text>
//                       <View
//                         style={[
//                           styles.row,
//                           {
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             marginTop: theme.sizes.margin,
//                           },
//                         ]}>
//                         <Text style={{color: theme.colors.active}}>
//                           {item.rating}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 );
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }



