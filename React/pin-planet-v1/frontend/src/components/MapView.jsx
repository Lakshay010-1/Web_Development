import React, { useEffect, useState } from 'react'
import styles from './styles/MapView.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { usePlacesContext } from '../contexts/usePlacesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';

function ChangePosition(props) {
    const map = useMap();
    map.setView(props.position);
    return null;
}

function DetectEvents() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => { navigate(`form/new?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) }
    });
}

export default function MapView() {

    const [mapPosition, setMapPosition] = useState([28.6131, 77.2295]);
    const [searchParams] = useSearchParams();
    const { isLoading: isGeolocationLoading, position: geolocation, getPosition: getGeolocationPos } = useGeolocation();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const { places } = usePlacesContext();

    useEffect(() => {
        async function setPosition() {
            if (lat && lng) {
                setMapPosition([lat, lng]);
            }
        }
        setPosition();
    }, [lat, lng]);

    useEffect(function () {
        async function setPosition() {
            if (geolocation) {
                setMapPosition([geolocation.lat, geolocation.lng]);
            }
        }
        setPosition();
    }, [geolocation]);

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getGeolocationPos}>{isGeolocationLoading ? "loading..." : "Use My Location"}</Button>
            <MapContainer center={mapPosition} zoom={10} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    places.map(place => <Marker key={place._id} position={[place.position.lat, place.position.lng]}>
                        <Popup>
                            {place.notes}
                        </Popup>
                    </Marker>
                    )
                }
                <DetectEvents />
                <ChangePosition position={mapPosition} />
            </MapContainer>
        </div>
    )
}
