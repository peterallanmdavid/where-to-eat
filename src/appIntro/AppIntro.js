/* @flow */

import {NavigationActions} from 'react-navigation'
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})

export default class AppIntro extends Component {
    static navigationOptions = {
        header: false,
    }

    componentDidMount = () => {
        setTimeout(this.navigateToApplication, 2000)
    }

    navigateToApplication = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'homeScreen'})],
        })

        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Where To Eat</Text>
            </View>
        )
    }
}