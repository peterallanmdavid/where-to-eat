/* @flow */

import AppIntro from '../appIntro/AppIntro'
import HomeScreen from '../home/HomeScreen'
import {StackNavigator} from 'react-navigation'
import React, {Component} from 'react'

export default class MainNavigator extends Component<void, Props, void> {
    // eslint-disable-next-line class-methods-use-this
    shouldComponentUpdate() {
        return false
    }
    render() {
        return React.createElement(
            StackNavigator(
                {
                    appIntro: {screen: AppIntro},
                    homeScreen: {screen: HomeScreen},
                },
                {
                    initialRouteName: this.props.initialRouteName,
                    initialRouteParams: this.props.initialRouteParams,
                }
            )
        )
    }
}
