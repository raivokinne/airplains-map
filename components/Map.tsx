import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import Filter from './Filter';

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
    const [selectedPlane, setSelectedPlane] = useState<PlaneData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({ country: '', minHeight: null, maxHeight: null });

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
            html: `<img src="air-plane.png" style="width: 20px; height: 20px; transform: rotate(${heading || 0}deg); transform-origin: 50% 50%;" />`,
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

        const altitude = geo_altitude || baro_altitude || 0;

        // Apply filters
        if (
            (filters.country && origin_country.toLowerCase() !== filters.country.toLowerCase()) ||
            (filters.minHeight !== null && altitude < filters.minHeight) ||
            (filters.maxHeight !== null && altitude > filters.maxHeight)
        ) {
            if (markersRef.current[planeId] && mapInstanceRef.current) {
                mapInstanceRef.current.removeLayer(markersRef.current[planeId]);
                delete markersRef.current[planeId];
            }
            return;
        }

        if (markersRef.current[planeId]) {
            markersRef.current[planeId].setLatLng([latitude, longitude])
                .setIcon(createPlaneIcon(true_track));
        } else if (mapInstanceRef.current) {
            markersRef.current[planeId] = L.marker([latitude, longitude], {
                icon: createPlaneIcon(true_track)
            }).addTo(mapInstanceRef.current)
                .on('click', () => {
                    setSelectedPlane(state);
                    setIsModalOpen(true);
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
    }, [mapReady, planeData, filters]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlane(null);
    };

    const handleFilterChange = (country: string, minHeight: number | null, maxHeight: number | null) => {
        setFilters({ country, minHeight, maxHeight });
    };

    return (
        <>
            <Filter onApply={handleFilterChange} />

            <div ref={mapRef} style={{ height: '700px', width: '100%' }}></div>

            <div className={`overlay ${isModalOpen ? 'show' : ''}`} onClick={closeModal}></div>

            <div className={`modal ${isModalOpen ? 'open' : ''} rounded-2xl bg-gradient-to-br from-slate-600 to-stone-800`}>
                {selectedPlane && (
                    <div className="modal-content text-white w-full">
                        <div className=''>
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h2>Plane Details</h2>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>Callsign:</b> {selectedPlane[1] || 'N/A'}</p>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>Country:</b> {selectedPlane[2]}</p>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>Altitude:</b> {Math.round(selectedPlane[13] || selectedPlane[7] || 0)} m</p>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>Velocity:</b> {Math.round(selectedPlane[9] || 0)} m/s</p>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>Heading:</b> {Math.round(selectedPlane[10] || 0)}°</p>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>On Ground:</b> {selectedPlane[8] ? 'Yes' : 'No'}</p>
                            <p className='my-2 text-slate-200 flex w-full items-center rounded-md p-3 transition-all bg-slate-500'><b>Last Contact:</b> {new Date(selectedPlane[4] * 1000).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Map;