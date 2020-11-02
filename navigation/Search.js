import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text, TextInput, TouchableHighlight,
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
import Post from './Post';
import React from 'react';
import {Button} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
const contactData = require('../mocks/contact.json');
import { SearchBar, ButtonGroup } from "react-native-elements"



const styles = StyleSheet.create({
    flex: {
      flex: 0,
    },
    separator:{
        marginVertical: 8,
        borderBottomColor: theme.colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },

    fixToButton:{
        height: height/3,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

    button: {
        backgroundColor: 'yellow',
        borderRadius: 25,
    },

    buttonText: {
        color: 'black',
        fontSize: 20,
    },

  });


const Separator = () => {
return <View style={styles.separator} />;
};

export default class Search extends React.Component {
    constructor(){
        super()
        this.state = {
            search: '',
            selectedIndex: 2
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex});
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {

        const buttons = ['Hello', 'World', 'Buttons','hello']
        const { selectedIndex } = this.state
        const { search } = this.state;
        return (
              <View>
              <SearchBar
                placeholder="Search Place Here..."
                onChangeText={this.updateSearch}
                value={search}
                underlineColorAndroid={theme.colors.grey}
                showCancel = "true"
              />
              </View>
        );
    }
}
