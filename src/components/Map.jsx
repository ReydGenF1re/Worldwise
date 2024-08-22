import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";
import {APIProvider, Map as GoogleMap, InfoWindow, AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';
import {useCities} from "../contexts/CitiesContext.jsx";
import "./Map.css"
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import {useURLposition} from "../hooks/useURLposition.js";

function Map() {
    const {cities} = useCities();
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation()
    const [isOpen, setIsOpen] = useState(false);
    const [curCity, setCurCity] = useState({})
    const [mapPosition, setMapPosition] = useState({"lat": 40, "lng": 0})
    const [mapLat, mapLng] = useURLposition()
    const navigate = useNavigate()

    useEffect(() => {
        geolocationPosition && setMapPosition({"lat": geolocationPosition.lat, "lng": geolocationPosition.lng})
    }, [geolocationPosition]);

    useEffect(() => {
        mapLat && mapLng && setMapPosition({"lat": mapLat, "lng": mapLng})
    }, [mapLat, mapLng])

    return (
        <APIProvider apiKey={"AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"}>
            <div className={"mapContainer"}>
                {!geolocationPosition && <Button type={'position'} onClick={getPosition}>
                    {isLoadingPosition ? "Loading position..." : "Use your position"}
                </Button>}
                <GoogleMap
                    onClick={(e) => navigate(`form?lat=${e.detail.latLng.lat}&lng=${e.detail.latLng.lng}`)}
                    mapId={'765bcc5ae9505fe'}
                    defaultZoom={8}
                    defaultCenter={mapPosition}>
                    {cities.map(city => <AdvancedMarker onClick={() => {
                            setIsOpen(true);
                            setCurCity(city)
                            setMapPosition({"lat": city.position.lat, "lng": city.position.lng})
                        }
                        } key={city.id} position={{
                            "lat": city.position.lat,
                            "lng": city.position.lng,
                        }

                        }>
                            <Pin background={"green"} glyphColor={"white"} borderColor={"blue"}></Pin>
                        </AdvancedMarker>
                    )

                    }
                    {isOpen && <InfoWindow position={mapPosition}
                                           onCloseClick={() => setIsOpen(false)}><span>{curCity.emoji}</span>
                        <span>{curCity.cityName}</span></InfoWindow>}

                    <ChangeCenter position={mapPosition}/>

                </GoogleMap>

            </div>
        </APIProvider>)

}

function ChangeCenter({position: {lat, lng}}) {
    const map = useMap();
    map.setCenter(new google.maps.LatLng(lat, lng))
    return null
}

export default Map;