import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text, TextInput, TouchableHighlight,
  TouchableOpacity,
  View,
  Button,
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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
const contactData = require('../mocks/contact.json');
import { SearchBar } from "react-native-elements";
import {TagSelect} from 'react-native-tag-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './Main';



const Separator = () => {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    flex: {
      flex: 0,
    },
    separator:{
        marginVertical: 10,
        borderBottomColor: theme.colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      container: {
        marginTop: 20,
        marginLeft: 15,
      },
      buttonContainer: {
        padding: 15,
      },
      buttonInner: {
        marginBottom: 15,
      },
      labelText: {
        color: '#333',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
        fontWeight: 'bold',
        width: 300,
      },
      item: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 20
      },
      label: {
        color: '#333'
      },
      itemSelected: {
        backgroundColor: '#333',
      },
      labelSelected: {
        color: '#FFF',
      },
      topSearchContainer: {
        paddingTop: 10,

      },
      topSearchItem: {
        padding: 8,
        fontSize: 15,
      },
      titleContainer: {
           flexDirection: 'row',
           justifyContent: 'space-between',
      }

  });

export default class Search extends React.Component {

    constructor(){
        super()
        this.state = {
            search: '',
            selectedIndex: 0,
            searchHistory: [],
        };
        this.updateIndex = this.updateIndex.bind(this)
    }


    updateIndex (selectedIndex) {
        this.setState({selectedIndex});
    }

    updateSearch = (search) => {
        this.setState({ search });

    };

    clearHistory = async() => {
        await AsyncStorage.removeItem('SearchHistory')
        this.setState({ searchHistory: []});
    }

    componentDidMount = async() => {
        await AsyncStorage.getItem('SearchHistory')
            .then((stores) => {
                this.setState({ searchHistory: stores ? JSON.parse(stores) : []});
            });
    }

    handleSearch = async() => {
       let length = this.state.searchHistory.length
       let search = {
        id: this.state.searchHistory.length+1,
        label: this.state.search,
       }
       const searches = this.state.searchHistory;
       searches.push(search);
       AsyncStorage.setItem('SearchHistory', JSON.stringify(searches));
       return this.props.navigation.navigate('Main')
    }


    render() {
        const { searchHistory} = this.state
        const { selectedIndex } = this.state
        const { search } = this.state
        return (
              <View>
              <SearchBar
                placeholder="Search Place Here..."
                onChangeText={this.updateSearch}
                value={search}
                underlineColorAndroid={theme.colors.grey}
                showCancel = "true"
                showLoading = 'true'
                onSubmitEditing = {this.handleSearch}
              />
              <View style={styles.container}>
                <View style={styles.titleContainer}>
                <Text style={styles.labelText}>Recent Searches</Text>
                <TouchableOpacity onPress={() => {this.clearHistory()}}>
                  <FontAwesome
                    name="trash"
                    style={{ marginRight:15, justifyContent: 'center'}}
                    size={23}
                    color='grey'
                  />
                </TouchableOpacity>
                </View>
                <TagSelect
                  data={this.state.searchHistory}
                  itemStyle={styles.item}
                  ref={(tag) => {
                    this.tag = tag;
                  }}
                />
              </View>
              </View>
        );
    }
}
