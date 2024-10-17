import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'; // Custom CSS for the modal

const MAX_PLANES = 250;

interface OpenSkyResponse {
    time: number;
    states: PlaneData[];
}

type PlaneData = [
    string,  // icao24
    string | null,  // callsign
    string,  // origin_country
    number | null,  // time_position
    number,  // last_contact
    number | null,  // longitude
    number | null,  // latitude
    number | null,  // baro_altitude
    boolean,  // on_ground
    number | null,  // velocity
    number | null,  // true_track
    number | null,  // vertical_rate
    number[] | null,  // sensors
    number | null,  // geo_altitude
    string | null,  // squawk
    boolean,  // spi
    number  // position_source
];

interface MapProps {
    planeData: OpenSkyResponse | null;
}

const Map: React.FC<MapProps> = ({ planeData }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersRef = useRef<{ [key: string]: L.Marker }>({});
    const [mapReady, setMapReady] = useState(false);
    const [selectedPlane, setSelectedPlane] = useState<PlaneData | null>(null); // Store selected plane data
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

    useEffect(() => {
        if (typeof window !== 'undefined' && !mapInstanceRef.current && mapRef.current) {
            mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 3);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstanceRef.current);
            setMapReady(true);
        }
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const createPlaneIcon = (heading: number | null): L.DivIcon => {
        return L.divIcon({
            html: `<svg width="20" height="20" viewBox="0 0 20 20">
               <polygon points="10,0 20,20 10,15 0,20"
                        fill="red" stroke="black"
                        transform="rotate(${heading || 0}, 10, 10)" />
             </svg>`,
            className: 'plane-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
        });
    };

    const updatePlaneMarker = (planeId: string, state: PlaneData) => {
        const [
            icao24, callsign, origin_country, time_position,
            last_contact, longitude, latitude, baro_altitude,
            on_ground, velocity, true_track, vertical_rate,
            sensors, geo_altitude, squawk, spi, position_source
        ] = state;

        if (!latitude || !longitude) return;

        if (markersRef.current[planeId]) {
            markersRef.current[planeId].setLatLng([latitude, longitude])
                .setIcon(createPlaneIcon(true_track));
        } else if (mapInstanceRef.current) {
            markersRef.current[planeId] = L.marker([latitude, longitude], {
                icon: createPlaneIcon(true_track)
            }).addTo(mapInstanceRef.current)
                .on('click', () => {
                    setSelectedPlane(state); // Set the selected plane data
                    setIsModalOpen(true); // Open the modal
                });
        }
    };

    useEffect(() => {
        if (mapReady && planeData && planeData.states) {
            const currentPlanes = new Set<string>();
            planeData.states.slice(0, MAX_PLANES).forEach(state => {
                const planeId = state[0]; // icao24
                updatePlaneMarker(planeId, state);
                currentPlanes.add(planeId);
            });

            Object.keys(markersRef.current).forEach(planeId => {
                if (!currentPlanes.has(planeId) && mapInstanceRef.current) {
                    mapInstanceRef.current.removeLayer(markersRef.current[planeId]);
                    delete markersRef.current[planeId];
                }
            });
        }
    }, [mapReady, planeData]);

    return <div ref={mapRef} style={{ height: '600px', width: '100%' }}></div>;
};

export default Map;
