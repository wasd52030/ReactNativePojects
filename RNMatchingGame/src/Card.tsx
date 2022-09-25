import React from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
} from "react-native"

interface Props {
    title: string,
    isShow: Boolean,
    fontSize: number,
    onPress: () => void
}

const Card = (p: Props) => {

    const cover = ""

    return (
        <TouchableOpacity style={styles.button} onPress={p.onPress}>
            <Text style={{ fontSize: p.fontSize || 35 }}>
                {(p.isShow) ? p.title : cover}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ccc",
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        margin: (Dimensions.get("window").width - (50 * 4)) / (5 * 2)
    }
})

export default Card