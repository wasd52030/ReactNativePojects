import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Button, Linking } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { google_map_api_key, ClearBtn } from './utils';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Direction(props) {

    const navigation = useNavigation()
    const route = useRoute()

    const [startPlace, setStartPlace] = useState({
        latitude: 22.6394924,
        longitude: 120.3003943,
    })
    const [endPlace, setEndPlace] = useState({
        latitude: 22.6394924,
        longitude: 120.3003943,
    })
    const startPlaceAutoCompleteRef = useRef(null)
    const endPlaceAutoCompleteRef = useRef(null)

    const onAddStartPlace = (location) => {
        startPlaceAutoCompleteRef.current.setAddressText(location.name)
        setStartPlace(location)
        navigation.navigate('direction', { favo: props.favorites })
    }

    const onAddEndPlace = (location) => {
        endPlaceAutoCompleteRef.current.setAddressText(location.name)
        setEndPlace(location)
        navigation.navigate('direction', { favo: props.favorites })
    }

    return (
        <View style={{
            position: 'absolute',
            width: "100%",
            padding: 10,
        }}>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 5,
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <View>
                    <Text style={{ fontSize: 20 }}>
                        起點：
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: 5,
                    }}
                >
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        fetchDetails
                        ref={startPlaceAutoCompleteRef}
                        renderRightButton={() => {
                            if (startPlaceAutoCompleteRef.current === null) {
                                return null
                            }
                            return (
                                startPlaceAutoCompleteRef.current.getAddressText()
                                    ? (
                                        <ClearBtn
                                            onPress={() => {
                                                startPlaceAutoCompleteRef.current.setAddressText('')
                                            }}
                                        />
                                    )
                                    : null
                            )
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            // console.log(data, details);

                            setStartPlace(() => ({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            }))
                        }}
                        query={{
                            key: google_map_api_key,
                            language: 'zh-TW',
                        }}
                    />
                </View>

                <View>
                    <TouchableOpacity>
                        <Ionicons
                            name="ios-bookmark" size={40}
                            color={'#ff6347'} style={{ textAlign: "right", marginBottom: 10, }}
                            onPress={() => {
                                navigation.navigate(
                                    'selectFavorite',
                                    {
                                        data: (route.params !== undefined) ? route.params.favo : props.favorites,
                                        onAddStartPlace: onAddStartPlace
                                    }
                                )
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>


            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    margin: 5
                }}
            >
                <View>
                    <Text style={{ fontSize: 20, }}>
                        終點：
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: 5,
                    }}
                >
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        fetchDetails
                        ref={endPlaceAutoCompleteRef}
                        renderRightButton={() => {
                            if (endPlaceAutoCompleteRef.current === null) {
                                return null
                            }
                            return (
                                endPlaceAutoCompleteRef.current.getAddressText()
                                    ? (
                                        <ClearBtn
                                            onPress={() => {
                                                endPlaceAutoCompleteRef.current.setAddressText('')
                                            }}
                                        />
                                    )
                                    : null
                            )
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            // console.log(data, details);

                            setEndPlace(() => ({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            }))
                        }}
                        query={{
                            key: google_map_api_key,
                            language: 'zh-TW',
                        }}
                    />
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name="ios-bookmark" size={40}
                        color={'#ff6347'} style={{ textAlign: "right", marginBottom: 10, }}
                        onPress={() => {
                            navigation.navigate(
                                'selectFavorite',
                                {
                                    data: (route.params !== undefined) ? route.params.favo : props.favorites,
                                    onAddEndPlace: onAddEndPlace
                                }
                            )
                        }}
                    />
                </TouchableOpacity>
            </View>


            <View style={{ display: 'flex', marginTop: 15 }}>
                <Button title='View route in map'
                    onPress={() => {
                        navigation.navigate(
                            'mapDirection',
                            {
                                start: startPlace,
                                end: endPlace
                            }
                        )
                    }}
                />
            </View>

            <View style={{ display: 'flex', marginTop: 15 }}>
                <Button title='View detial in googlemap'
                    onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${startPlace.latitude},${startPlace.longitude}&destination=${endPlace.latitude},${endPlace.longitude}`)
                    }}
                />
            </View>
        </View>
    );
}