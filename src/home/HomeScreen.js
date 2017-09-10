/* @flow */

import Column from '../common/Column'
import Icon from 'react-native-vector-icons/FontAwesome'
import Row from '../common/Row'
import {FlatList, StyleSheet, TextInput, TouchableOpacity, View, ScrollView, Text} from 'react-native'
import LargeText from '../common/LargeText'
import ButtonText from '../common/ButtonText'
import SmallText from '../common/SmallText'
import React, {Component} from 'react'
import {action, observable, computed} from 'mobx'
import {observer} from 'mobx-react'
import R from 'ramda'
import {SUCCESS_TEXT, ERROR_TEXT, PRIMARY_TEXT} from '../colorConstants'

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgba(0,0,0,.2)',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    content: {
        padding: 10,
    },
    choiceRow: {
        marginBottom: 10,
    },
    submit: {
        alignItems: 'center',
        backgroundColor: PRIMARY_TEXT,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
    },
    submitText: {
        marginLeft: 10,
    },
    choiceSelected: {
        fontSize: 40,
        color: PRIMARY_TEXT,
        textAlign: 'center',
    },
    randmoizerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
        paddingTop: 0,
    },
    submitDisabled: {
        backgroundColor: 'rgb(200,200,200)',
    },
})

const getRandomIndex = index => Math.floor(Math.random() * index)

@observer
class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    }

    @observable foodChoices = []
    @observable currentFood = ''
    @observable selectedIndex = null
    @observable foodSelected = false
    @observable isRandomizing = false

    @computed
    get addDisabled() {
        return this.currentFood === '' || this.isRandomizing
    }

    @computed
    get randomizerDisabled() {
        return this.foodChoices < 2 || this.isRandomizing
    }

    @action.bound
    addFoodChoices() {
        if (this.addDisabled) {
            return
        }
        this.foodChoices = R.append(this.currentFood, this.foodChoices)
        this.currentFood = ''
    }

    @action.bound
    setCurrentFood(currentFood) {
        this.currentFood = currentFood
    }

    @computed
    get foodChoicesWithKey() {
        const currentFoodChoices = this.foodChoices

        return currentFoodChoices.map((item, index) => ({
            key: index,
            value: item,
        }))
    }

    @action.bound
    removeFoodChoice(choiceKey) {
        if (this.isRandomizing) {
            return
        }
        const cantStop = R.remove(choiceKey, 1, this.foodChoices)

        this.foodChoices = cantStop
    }

    @action.bound
    startRandomizer() {
        const foodChoicesLengt = this.foodChoices.length

        this.isRandomizing = true
        this.foodSelected = false
        const interval = setInterval(() => {
            this.selectedIndex = getRandomIndex(foodChoicesLengt)
        }, 50)

        setTimeout(() => {
            clearInterval(interval)
            this.foodSelected = true
            this.isRandomizing = false
        }, 3000)
    }
    render() {
        return (
            <ScrollView>
                <Column style={styles.container}>
                    <Column style={styles.content}>
                        <LargeText value="Add Food Choices" />
                        <Row>
                            <View flex={3}>
                                <TextInput onChangeText={this.setCurrentFood} value={this.currentFood} />
                            </View>
                            <Row alignItems="center" flex={1} justifyContent="flex-end">
                                <TouchableOpacity onPress={this.addFoodChoices} disabled={this.addDisabled}>
                                    <Icon
                                        name="plus-circle"
                                        size={30}
                                        color={this.addDisabled ? 'rgb(200,200,200)' : SUCCESS_TEXT}
                                    />
                                </TouchableOpacity>
                            </Row>
                        </Row>
                    </Column>

                    <Column style={styles.content}>
                        <FlatList
                            data={this.foodChoicesWithKey}
                            renderItem={({item}) => (
                                <Row flex={1} style={styles.choiceRow}>
                                    <Row flex={3}>
                                        <SmallText value={`${item.key + 1}. ${item.value}`} />
                                    </Row>
                                    <Row alignItems="center" flex={1} justifyContent="flex-end">
                                        <TouchableOpacity onPress={() => this.removeFoodChoice(item.key)}>
                                            <Icon name="times-circle" size={30} color={ERROR_TEXT} />
                                        </TouchableOpacity>
                                    </Row>
                                </Row>
                            )}
                        />
                    </Column>
                    <TouchableOpacity
                        disabled={this.randomizerDisabled}
                        onPress={this.startRandomizer}
                        style={[styles.submit, this.randomizerDisabled && styles.submitDisabled]}
                    >
                        <Icon name="cutlery" size={20} color="rgb(255,255,255)" />
                        <ButtonText value="START PICKING" color="rgb(255,255,255)" style={styles.submitText} />
                    </TouchableOpacity>
                </Column>

                <Column style={[styles.container, styles.randmoizerContainer]} flex={1}>
                    <ButtonText value="You will be eating at" />
                    {(this.foodChoices.length > 0 || !this.selected) && (
                        <View flex={1} justifyContent="center" alignItems="center">
                            <Text style={this.foodSelected && styles.choiceSelected}>
                                {this.foodChoices[this.selectedIndex]}
                            </Text>
                        </View>
                    )}
                </Column>
            </ScrollView>
        )
    }
}

export default HomeScreen
