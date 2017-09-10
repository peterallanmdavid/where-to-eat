/* @flow */

import React from 'react'
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(60,60,60)',
    },
})

const LargeText = ({value, style}) => {
    const computedStyles = [styles.text, style]

    return <Text style={computedStyles}>{value}</Text>
}

export default LargeText
