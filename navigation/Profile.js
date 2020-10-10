import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import contactData from '../mocks/contact.json';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: theme.sizes.padding,
  },
  col :{
    flexDirection: "column",
    padding: theme.sizes.padding/2,
  },
 name: {
    fontSize:theme.sizes.font + 5,
    fontFamily: "notoserif",
  },
  bio:{
    paddingVertical: -theme.sizes.padding,
    padding: theme.sizes.padding/2,
  },
  propic: {
    width: width/3,
    height: height/5,
    borderRadius: theme.sizes.radius *2 ,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },
  avatar: {
    width: theme.sizes.padding ,
    height: theme.sizes.padding *1.1,
    borderRadius: theme.sizes.padding / 2,
    alignItems: 'flex-end',
    resizeMode: 'contain',

  },
  menu: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    // top: height/3+10,
    marginTop:height /2.5,

  },
  separator1:{
    marginVertical: 8,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,

  },
  separator2:{
    top:height /2.5,
    marginVertical: 8,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
},
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
const Separator1 = () => {
  return <View style={styles.separator1} />;
}
const Separator2 = () => {
  return <View style={styles.separator2} />;
}
export default class Profile extends Component {

  render() {
    // const getPost = contactData && contactData.map(({image, words},id) => {
    //   return (
    //     <View key={id}>
    //       <Image source={{uri: image}} />
    //     </View>
    //   )
    // })
    return (
      <View>
      <View style={styles.container}>
        <Image style={styles.propic} source={{uri:contactData.avatar}} />
        <View style={styles.col}>
        <Text style={styles.name}>{contactData.name}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: '700', marginRight: 5}}>ID:</Text>
          <Text>{contactData.username}</Text>
        </View>
        </View>
      </View>
        <Text style={styles.bio}>{contactData.bio}</Text>
        <Separator1/>
        <ScrollView >
          <View style={styles.title}>
          <Text>Posts</Text>
          <Text>Favorites</Text>
          <Text>Liked</Text>
          </View>

        </ScrollView>
      <Separator2/>
    <View style={styles.menu}>
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
