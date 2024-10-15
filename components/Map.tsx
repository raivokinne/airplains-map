import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAX_PLANES = 5;

const Map = ({ planeData }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !mapInstanceRef.current) {
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

    const createPlaneIcon = (heading) => {
        return L.divIcon({
            html: `<svg width="20" height="20" viewBox="0 0 20 20">
               <polygon points="10,0 20,20 10,15 0,20" 
                        fill="red" stroke="black" 
                        transform="rotate(${heading}, 10, 10)" />
             </svg>`,
            className: 'plane-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
        });
    };

    const updatePlaneMarker = (planeId, state) => {
        const [
            icao24, callsign, origin_country, time_position,
            last_contact, longitude, latitude, baro_altitude,
            on_ground, velocity, true_track, vertical_rate,
            sensors, geo_altitude, squawk, spi, position_source
        ] = state;

        if (!latitude || !longitude) return;

        const popupContent = `
      <b>Callsign:</b> ${callsign || 'N/A'}<br>
      <b>Country:</b> ${origin_country || 'N/A'}<br>
      <b>Altitude:</b> ${Math.round(geo_altitude || baro_altitude || 0)} m<br>
      <b>Velocity:</b> ${Math.round(velocity || 0)} m/s<br>
      <b>Heading:</b> ${Math.round(true_track || 0)}°
    `;

        if (markersRef.current[planeId]) {
            markersRef.current[planeId].setLatLng([latitude, longitude])
                .setIcon(createPlaneIcon(true_track))
                .setPopupContent(popupContent);
        } else {
            markersRef.current[planeId] = L.marker([latitude, longitude], {
                icon: createPlaneIcon(true_track)
            }).addTo(mapInstanceRef.current)
                .bindPopup(popupContent);
        }
    };

    useEffect(() => {
        if (mapReady && planeData && planeData.states) {
            const currentPlanes = new Set();
            planeData.states.slice(0, MAX_PLANES).forEach(state => {
                const planeId = state[0]; // icao24
                updatePlaneMarker(planeId, state);
                currentPlanes.add(planeId);
            });

            // Remove markers for planes no longer in the data or beyond the limit
            Object.keys(markersRef.current).forEach(planeId => {
                if (!currentPlanes.has(planeId)) {
                    mapInstanceRef.current.removeLayer(markersRef.current[planeId]);
                    delete markersRef.current[planeId];
                }
            });
        }
    }, [mapReady, planeData]);

    return <div ref={mapRef} style={{ height: '600px', width: '100%' }}></div>;
};

export default Map;