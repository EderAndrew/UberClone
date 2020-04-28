import React, { useRef, useState, useEffect } from 'react'
import {  } from './homeStyle.style'
import { View, Text, StatusBar } from 'react-native'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'
import { MapsAPI } from '../../api/config.api'

import { 
    Container
 } from './homeStyle.style'

const Home = (props) => {
    const map = useRef()

    const [mapLoc, setMapLoc] = useState({
        center:{
            latitude:37.78825,
            longitude:-122.4324
        },
        zoom:16,
        pitch:0,
        altitude:0,
        heading:0
    })

    const [fromLoc, setFromLoc] = useState({})
    const [toLoc, setToLoc] = useState({})

    //configurar o geocoder antes de utilizar
    useEffect(()=>{
        Geocoder.init(MapsAPI, {language:'pt-br'})
        //função que pega a localização do usuário atual
        getMyCurrentPosition()
    },[])

    const getMyCurrentPosition = () => {
        Geolocation.getCurrentPosition(async(info)=>{
            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude)

            if(geo.results.length > 0 ){
                const loc = {
                    name:geo.results[0].formatted_address,
                    center:{
                        latitude:info.coords.latitude,
                        longitude:info.corrds.longitude
                    },
                    zoom:16,
                    pitch:0,
                    altitude:0,
                    heading:0
                }

                setMapLoc(loc)
                setFromLoc(loc)
            }
        }, (error)=>{
            alert(error)
        })
    }

    return(
        <Container>
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
            <MapView
              ref={map}
              style={{flex:1}}
              provider="google"
              camera={mapLoc}
            >
            
            </MapView>
        </Container>
    )
}

export default Home