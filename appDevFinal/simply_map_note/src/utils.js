import { Text, View, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const ClearBtn = (props) => {
    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
            }}
        >
            <TouchableWithoutFeedback onPress={props.onPress}>
                <MaterialIcons name='close' size={30} />
            </TouchableWithoutFeedback>
        </View>
    )
}

export const google_map_api_key = '你的google api key'
export { ClearBtn }