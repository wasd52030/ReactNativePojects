import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
} from 'react-native';

const Hw1 = (props:{placeholder:string}) => {

    const [s, setS] = useState('')

    // onChangeText 等效於回傳純字串的onChange
    return (
        <View style={{ margin: 10 }}>
            <Text style={{ marginBottom: 10 }}>在這裡輸入文字</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setS(text)}
                onChange={event=>console.log(event.nativeEvent.text)}
            />
            <View style={{ marginTop: 10 }}>
                <Text>{props.placeholder}</Text>
                <Text>{s === '' ? '顯示文字訊息' : s}</Text>
            </View>
        </View>
    )
}
export default Hw1;