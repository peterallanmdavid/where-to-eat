/* @flow */

import React, {type Children, Component} from 'react'
import {type Style, View} from 'react-native'

export default class Column extends Component {
    props: {|
        children?: Children,
        style?: Style,
        flex: number,
    |}

    render() {
        const {children, style} = this.props

        return (
            <View style={style} {...this.props} flexDirection="column">
                {children}
            </View>
        )
    }
}
