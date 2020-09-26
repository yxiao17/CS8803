import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function showProfile() {
    return (
        <View>
            <View style = {{alignItems:'center',justifyContent:'center'}}>

                <Image source={require('./propic.png')} style={styles.propic}></Image>
                <Text>Click here to change profile</Text>
                {/*</View>*/}
                {/*<View style = {{alignItems:'center',justifyContent:'center'}}>*/}
                <Text>Profile Name:           User 1</Text>
                <Text>First Name:               Jon</Text>
                <Text>Last Name:               Smith</Text>
            </View>

        </View>

    );

}
export default Profile;
