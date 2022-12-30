import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { google_map_api_key } from './utils';


export default function Location() {

    const route = useRoute()

    const [data, setData] = useState({
        name: "default",
        latitude: 22.6394924,
        longitude: 120.2618306
    })
    const [startPlace, setStartPlace] = useState(null)
    const [endPlace, setEndPlace] = useState(null)
    const mapref = useRef(null)

    useEffect(() => {
        if (route.params !== undefined) {
            if (route.params.start !== undefined) {
                setStartPlace(() => route.params.start)
                setData(() => route.params.start)
            }

            if (route.params.end !== undefined) {
                setEndPlace(() => route.params.end)
            }

            if (route.params.data !== undefined) {
                setData(route.params.data)
            }
        }

        console.log(data, startPlace, endPlace)
    }, [])

    useEffect(() => {
        if (route.params !== undefined) {
            if (route.params.start !== undefined) {
                setStartPlace(() => route.params.start)
                
            } 
            
            if (route.params.end !== undefined) {
                setEndPlace(() => route.params.end)
            }

            if (route.params.data !== undefined) {
                setData(route.params.data)
            }
        }
    }, [route.params])

    return (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: data.latitude,
                longitude: data.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            ref={mapref}
            onMapReady={() => mapref.current.fitToSuppliedMarkers(['start', 'end'], {
                edgePadding:
                {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50
                }
            })}
        >
            {
                (startPlace === null)
                && (endPlace === null)
                && (
                    <Marker
                        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
                        pinColor={'#0000ab'}
                        identifier='location'
                    />
                )
            }
            {
                (startPlace !== null)
                && (endPlace !== null)
                && (
                    <Marker
                        coordinate={{ latitude: startPlace.latitude, longitude: startPlace.longitude }}
                        pinColor={'#0000ab'}
                        identifier='start'
                    />
                )
            }
            {
                (startPlace !== null)
                && (endPlace !== null)
                && (
                    <Marker
                        coordinate={{ latitude: endPlace.latitude, longitude: endPlace.longitude }}
                        pinColor={'#0000ab'}
                        identifier='end'
                    />
                )
            }
            {
                (startPlace !== null)
                && (endPlace !== null)
                && (
                    <MapViewDirections
                        origin={startPlace}
                        destination={endPlace}
                        apikey={google_map_api_key}
                        strokeWidth={5}
                        strokeColor="blue"
                    />
                )
            }
        </MapView>
    );
}