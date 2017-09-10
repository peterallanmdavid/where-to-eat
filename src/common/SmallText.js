/* @flow */

import React from 'react'
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    },
})

const SmallText = ({value, style, color}) => {
    const colorStyles = color ? {color} : {}
    const computedStyles = [styles.text, style, colorStyles]

    return <Text style={computedStyles}>{value}</Text>
}

export default SmallText
