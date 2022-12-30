import React, { useState, useEffect } from 'react';
import database, { firebase } from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { readStorage, writeStorage } from "../utils/file"
import RNFS from "react-native-fs"
import FastImage from 'react-native-fast-image';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const Favorite = (props) => {

    const route = useRoute()
    const [data, setData] = useState({})
    const navigation = useNavigation()

    useEffect(() => {
        if (route.params !== undefined) {
            setData(route.params.data)
            return
        }
        
        if (props.favorites !== undefined) {
            setData(props.favorites)
            return
        } else {
            setData({
                name: "default",
                latitude: 22.6394924,
                longitude: 120.2618306
            })
        }
    }, [])

    useEffect(() => {
        setData(props.favorites)
    }, [props.favorites])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => { return item.id + index }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: "row",
                            marginBottom: 15
                        }}
                    >
                        <FastImage
                            style={{
                                width: 120,
                                height: 120,
                            }}
                            source={{ uri: item.pictureurl }}
                        />
                        <View
                            style={{
                                width: "50%",
                                marginTop: 5,
                                marginLeft: 15
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                }}
                                numberOfLines={10}
                            >
                                {item.name}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignContent: "center",
                                justifyContent: "center",
                                marginRight: 10
                            }}
                        >
                            <TouchableOpacity>
                                <FontAwesome
                                    name="map-marker" size={40}
                                    color={'#ff6347'} style={{ textAlign: "right", marginBottom: 10, }}
                                    onPress={() => {
                                        navigation.navigate('Map', { data: item })
                                    }}
                                />
                            </TouchableOpacity>
                            {(route.name === 'favorite') && (
                                <TouchableOpacity>
                                    <FontAwesome
                                        name="trash" size={40}
                                        color={'#ff6347'} style={{ textAlign: "right" }}
                                        onPress={() => {
                                            Alert.alert('移除最愛', `確定要將${item['name']}移除我的最愛嗎？`, [
                                                {
                                                    text: "取消",
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: "確定",
                                                    onPress: () => props.onRemoveLoation(item),
                                                    style: 'cancel'
                                                }
                                            ])
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {(route.name === 'selectFavorite') && (
                                <TouchableOpacity>
                                    <FontAwesome
                                        name="plus" size={40}
                                        color={'#ff6347'} style={{ textAlign: "right" }}
                                        onPress={() => {
                                            Alert.alert('選擇', `確定要選擇${item['name']}嗎？`, [
                                                {
                                                    text: "取消",
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: "確定",
                                                    onPress: () => {
                                                        console.log(route.params)
                                                        if (route.params.onAddStartPlace !== undefined) {
                                                            route.params.onAddStartPlace(item)
                                                        } else {
                                                            route.params.onAddEndPlace(item)
                                                        }
                                                    },
                                                    style: 'cancel'
                                                }
                                            ])
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Favorite