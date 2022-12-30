import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Location from './Location'
import MapView, { Marker } from "react-native-maps"
import { FAB } from 'react-native-paper';
import GetLocation from 'react-native-get-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { google_map_api_key,ClearBtn } from './utils';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import * as navigator from "@react-native-community/geolocation"



export default function Search(props) {

    const [location, setLocation] = useState({
        name: "current location",
        latitude: 22.6394924,
        longitude: 120.3003943,
    })

    const [currLocation, setCurrLocation] = useState({
        name: "current location",
        latitude: 22.6394924,
        longitude: 120.3003943
    })

    const [search, setSearch] = useState('')
    const mapRef = useRef(null)
    const googlePlaceAutoCompleteRef = useRef(null)

    const locationMarkRef = useRef(null)
    const currentMarkRef = useRef(null)

    useEffect(() => {
        mapRef.current.fitToSuppliedMarkers(
            ['location', 'current'],
            {
                edgePadding: {
                    top: 3000,
                    bottom: 3000,
                    right: 3000,
                    left: 30000
                },
                animated: true
            }
        )
    }, [])

    useEffect(() => {
        mapRef.current.fitToSuppliedMarkers(
            ['location', 'current'],
            {
                edgePadding: {
                    top: 30000,
                    bottom: 30000,
                    right: 30000,
                    left: 30000
                },
                animated: true
            }
        )
    }, [currLocation])

    return (
        <View
            style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center'
            }}
        >
            <MapView
                style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height
                }}
                region={{
                    latitude: currLocation.latitude,
                    longitude: currLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                ref={mapRef}
                showsBuildings={true}
            >
                {
                    (location.photoref !== undefined) && (<Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        onPress={() => {
                            Alert.alert('加入最愛', `確定要將${location['name']}加入我的最愛嗎？`, [
                                {
                                    text: "取消",
                                    style: 'cancel'
                                },
                                {
                                    text: "確定",
                                    onPress: () => props.onaddLocation(location),
                                    style: 'cancel'
                                }
                            ])
                        }}
                    />)
                }

                {(location.photoref === undefined || currLocation.name === 'current location') && (
                    <Marker
                        coordinate={{ latitude: currLocation.latitude, longitude: currLocation.longitude }}
                        pinColor={'#0000ab'}
                        tappable={false}
                    />
                )}
            </MapView>
            <View
                style={{
                    position: 'absolute',
                    width: "90%",
                    backgroundColor: "white",
                    shadowColor: "black",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
                    padding: 8,
                    borderRadius: 8,
                    top: 10,
                    right: 15
                }}
            >
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails
                    ref={googlePlaceAutoCompleteRef}
                    renderRightButton={() => {
                        if (googlePlaceAutoCompleteRef.current === null) {
                            return null
                        }
                        return (
                            googlePlaceAutoCompleteRef.current.getAddressText()
                                ? (
                                    <ClearBtn
                                        onPress={() => {
                                            googlePlaceAutoCompleteRef.current.setAddressText('')
                                        }}
                                    />
                                )
                                : null
                        )
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        // console.log(data, details);

                        setLocation(() => ({
                            name: details.name,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            photoref: (details.photos !== undefined) ? details.photos[0].photo_reference : undefined
                        }))

                        setCurrLocation(() => ({
                            name: details.name,
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
            <FAB
                icon="map-marker"
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                }}
                onPress={() => {
                    GetLocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                    })
                        .then(location => {
                            setCurrLocation(() => ({
                                name: "current location",
                                latitude: location.latitude,
                                longitude: location.longitude
                            }))
                        })
                        .catch(error => {
                            const { code, message } = error;
                            if (code === 'UNAVAILABLE' && message === 'Location not available') {
                                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({})
                                    .then(data => console.log(data))
                                    .catch(err => console.warn(error))
                            }
                        })
                }}
            />
        </View>
    );
}