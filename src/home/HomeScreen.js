/* @flow */

import React, {Component} from 'react'
import {Text, View} from 'react-native'

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'HomeScreen',
    }

    render() {
        return (
            <View>
                <Text>This is the homescreen</Text>
            </View>
        )
    }
}

export default HomeScreen
