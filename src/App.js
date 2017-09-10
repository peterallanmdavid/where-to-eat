/* @flow */

import MainNavigator from './navigation/MainNavigator'
import {Provider} from 'mobx-react'
import React from 'react'
import {AppRegistry, StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

const App = () => (
    <Provider>
        <View style={styles.container}>
            <MainNavigator initialRouteName="appIntro" initialRouteParams={{}} />
        </View>
    </Provider>
)

AppRegistry.registerComponent('whereToEat', () => App)
