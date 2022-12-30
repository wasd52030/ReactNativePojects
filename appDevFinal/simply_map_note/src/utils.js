export const google_map_api_key = 'AIzaSyA5LtqU1rt2lt2BQ3AKMuWvBehQh4BQjtU'
import { Text, View,TouchableWithoutFeedback } from 'react-native';
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
export { ClearBtn }