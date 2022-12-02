import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { countActions } from './store/slice/count';
import Displayer from './Displayer'

export default function Page1() {

    const dispath = useDispatch()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Displayer />
            <View>
                <Button
                    title='Increment'
                    onPress={() => {
                        dispath(countActions.add())
                    }}
                />
                <Button
                    title='Decrement'
                    onPress={() => {
                        dispath(countActions.sub())
                    }}
                />
            </View>
        </View>
    );
}