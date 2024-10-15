import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    useEffect(() => {
        // Check if window is defined (we're on the client side)
        if (typeof window !== 'undefined') {
            // Create map instance
            const map = L.map('map').setView([51.505, -0.09], 13);

            // Add tile layer
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add marker
            L.marker([51.5, -0.09]).addTo(map)
                .bindPopup('A pretty CSS popup.<br> Easily customizable.')
                .openPopup();

            // Cleanup function
            return () => {
                map.remove();
            };
        }
    }, []); // Empty dependency array means this effect runs once on mount

    return <div id="map" className="min-h-screen"></div>;
};

export default Map;