import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
} from 'react-native';

const Hw1 = () => {

    const [s, setS] = useState('')

    return (
        <View style={{ margin: 10 }}>
            <Text style={{ marginBottom: 10 }}>在這裡輸入文字</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setS(text)}
            />
            <View style={{ marginTop: 10 }}>
                <Text>在這裡顯示文字</Text>
                <Text>{s === '' ? '顯示文字訊息' : s}</Text>
            </View>
        </View>
    )
}
export default Hw1;