import React, { useState, useEffect } from "react";
import { Text, View, PermissionsAndroid } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import RNFS from "react-native-fs"
import firestore from '@react-native-firebase/firestore';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'

import Favorite from "./Favorite";
import Settings from "./Setting";
import Search from "./Search";
import Direction from "./Direction";


const Tab = createBottomTabNavigator();

const Home = (props) => {

    const [data, setData] = useState(props.favorites)

    useEffect(() => {
        setData(props.favorites)
    }, [props.favorites])

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "favorite") {
                        iconName = focused
                            ? "ios-bookmark"
                            : "ios-bookmark-outline";
                    } else if (route.name === "search") {
                        iconName = focused
                            ? "ios-search"
                            : "ios-search-outline";
                    } else if (route.name === "setting") {
                        iconName = focused
                            ? "ios-settings"
                            : "ios-settings-outline";
                    } else if (route.name === "direction") {
                        iconName = "directions"
                    }


                    // You can return any component that you like here!
                    if (route.name === "direction") {
                        return <FontAwesome5 name={iconName} size={size} color={color} />
                    } else {
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}>
            <Tab.Screen name="search" children={() => <Search onaddLocation={props.onaddLocation} />} />
            <Tab.Screen name="favorite" children={() => <Favorite favorites={data} onRemoveLoation={props.onRemoveLoation} />} />
            {/* <Tab.Screen name="setting" children={() => <Settings />} /> */}
            <Tab.Screen name="direction" children={() => <Direction favorites={data} />} />
        </Tab.Navigator>
    )
}


export default Home;
