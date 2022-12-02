import React from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { count2Actions } from './store/slice/count2';
import Displayer from './Displayer'

export default function Page2() {

    const dispath = useDispatch()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Displayer />
            <View>
                <Button title='Increment'
                    onPress={() => {
                        dispath(count2Actions.add())
                    }}
                />
                <Button title='Decrement'
                    onPress={() => {
                        dispath(count2Actions.sub())
                    }}
                />
            </View>
        </View>
    );
}