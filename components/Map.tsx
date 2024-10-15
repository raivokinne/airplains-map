import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([51.5, -0.09]).addTo(map)
                .bindPopup('A pretty CSS popup.<br> Easily customizable.')
                .openPopup();

            return () => {
                map.remove();
            };
        }
    }, []);

    return <div id="map" className="min-h-screen"></div>;
};

export default Map;