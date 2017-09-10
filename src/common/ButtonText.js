/* @flow */

import React from 'react'
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
})

const ButtonText = ({value, style, color}) => {
    const colorStyles = color ? {color} : {}
    const computedStyles = [styles.text, style, colorStyles]

    return <Text style={computedStyles}>{value}</Text>
}

export default ButtonText
