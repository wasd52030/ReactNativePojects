import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Displayer() {

    const count = useSelector((state) => state.count)
    const count2 = useSelector((state) => state.count2)

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Count:{count.count}</Text>
            <Text style={styles.text}>Count2:{count2.count2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    root:{
        margin:5
    }
})