import React, { useState, useEffect } from "react";
import { Text, View, PermissionsAndroid, ToastAndroid } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Ionicons from "react-native-vector-icons/Ionicons";
import RNFS from "react-native-fs"
import firestore from '@react-native-firebase/firestore';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'


import Favorite from "./Favorite";
import Settings from "./Setting";
import Map from "./Location";
import Home from "./Home";
import { createStackNavigator } from "@react-navigation/stack";
import { google_map_api_key } from "./utils";



const stack = createStackNavigator()

const App = () => {

    const [favorites, setFavorites] = useState([])

    const getPermissions = async () => {

        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                //第一次請求【拒絕】後提示用戶你為什麼要這個權限
                'title': '需要定位權限',
                'message': '需要開啟定位權限以獲得更好的體驗'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('你已獲取了讀寫權限');
            // 繼續運行其它代碼
        } else {
            console.log('獲取讀寫權限失敗');
        }

        granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                //第一次請求【拒絕】後提示用戶你為什麼要這個權限
                'title': '需要定位權限',
                'message': '需要開啟定位權限以獲得更好的體驗'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('你已獲取了位址權限');
            // 繼續運行其它代碼
        } else {
            console.log('獲取位址權限失敗');
        }

        granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                //第一次請求【拒絕】後提示用戶你為什麼要這個權限
                'title': '需要相機權限',
                'message': '需要開啟相機權限以獲得更好的體驗'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('你已獲取了相機權限');
            // 繼續運行其它代碼
        } else {
            console.log('獲取相機權限失敗');
        }
    }

    const getData = async () => {
        const d = await firestore().collection("Locations").get()

        let t = []
        d.docs.forEach(item => {
            let id = item.id
            let data = item.data()
            t.push({ ...data, id })
        })

        setFavorites(() => t)
    }


    const onAddLocation = (location) => {
        const isNew = favorites.filter(
            item => (location.name.includes(item.name))
                && (location.latitude == item.latitude)
                && (location.longitude === item.longitude)
        ).length === 0

        if (isNew && location.name !== 'user location') {
            location = {
                ...location,
                pictureurl: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1024&photo_reference=${location['photoref']}&key=${google_map_api_key}`
            }
            delete location['photoref']
            firestore()
                .collection('Locations')
                .add(location)
                .then(() => ToastAndroid.show('已將所標記的地點加入最愛！', ToastAndroid.SHORT))
            getData()
        } else {
            ToastAndroid.show('所標記的地點已在最愛中！', ToastAndroid.SHORT)
        }
    }

    const onRemoveLoation = (location) => {
        let id = location['id']
        delete location['id']
        firestore()
            .collection('Locations')
            .doc(id)
            .delete()
            .then(() => ToastAndroid.show('已將所選的地點刪除！', ToastAndroid.SHORT));
        getData()
    }

    useEffect(() => {
        getData()
        getPermissions()
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <stack.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({ headerShown: route.name !== "Home" })}
                >
                    <stack.Screen name="Home" children={() => <Home favorites={favorites} onaddLocation={onAddLocation} onRemoveLoation={onRemoveLoation} />} />
                    <stack.Screen name="search" children={() => <Map />} />
                    <stack.Screen name="favorite" children={() => <Favorite favorites={favorites} />} />
                    <stack.Screen name="selectFavorite" children={() => <Favorite favorites={favorites} />} />
                    <stack.Screen name="setting" children={() => <Settings />} />
                    <stack.Screen name="Map" children={() => <Map />} />
                    <stack.Screen name="direction" children={() => <Direction favorites={favorites} />} />
                    <stack.Screen name="mapDirection" children={() => <Map favorites={favorites} />} />
                </stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView >
    )
}


export default App;
