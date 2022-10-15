import React, { Component } from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'

// reference: https://dotblogs.com.tw/shadow/2019/10/30/165255
const Hw1 = function (props) {
    this.props = props
}
Hw1.prototype = new Component();
Hw1.prototype.constructor = Component;

Hw1.prototype.state = {
    text: ''
}
Hw1.prototype.render = function () {
    return (
        <View style={{ height: "100%", width: "100%" }}>
            <Text style={{ marginBottom: 10, color: '#000' }}>在這裡輸入文字</Text>
            <TextInput
                style={{ height: 40, borderColor: '#000', borderWidth: 1, width: 400 }}
                onChangeText={(text) => { this.setState({ text }) }}
            />
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: '#000' }}>在這裡顯示文字</Text>
                <Text style={{ marginTop: 5, color: '#000' }}>
                    {this.state.text === '' ? '顯示文字訊息' : this.state.text}
                </Text>
            </View>
        </View>
    )
}

export default Hw1