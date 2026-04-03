import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import React, { useState, useMemo } from 'react';

import L from 'leaflet';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { useBins } from '../context/BinsContext';

// Euclidean distance helper for route calc
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Route optimization ignoring non-full bins
const optimizeRoute = (bins) => {
  if (bins.length === 0) return [];

  let unvisited = [...bins];
  const route = [];

  let currentBin = unvisited.shift();
  route.push(currentBin);

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = getDistance(currentBin.lat, currentBin.lng, unvisited[i].lat, unvisited[i].lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }

    currentBin = unvisited.splice(nearestIdx, 1)[0];
    route.push(currentBin);
  }

  return route;
};

const createCustomIcon = (fill, isRouteHighlighted) => {
  let bgClass = 'bg-red-500';
  if (fill <= 40) bgClass = 'bg-emerald-500';
  else if (fill <= 70) bgClass = 'bg-amber-500';

  // Highlight effect ring if on the optimized route
  const highlightClass = isRouteHighlighted ? 'ring-4 ring-blue-500 shadow-xl scale-110' : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div class="w-6 h-6 rounded-full border-2 border-white shadow-md ${bgClass} ${highlightClass} flex items-center justify-center text-[10px] font-bold text-white transition-all m-auto">${fill}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const MapView = () => {
  const [showOptimizedRoute, setShowOptimizedRoute] = useState(false);
  const { binsData, loading } = useBins();

  // Center position around New Delhi based off mock data
  const position = [28.61, 77.22];

  // Filter rendering based on state
  const displayedBins = useMemo(() => {
    if (showOptimizedRoute) {
      return binsData.filter(bin => bin.fill > 70);
    }
    return binsData;
  }, [showOptimizedRoute, binsData]);

  const optimizedRoute = useMemo(() => {
    if (showOptimizedRoute) {
      return optimizeRoute(displayedBins);
    }
    return [];
  }, [showOptimizedRoute, displayedBins]);

  const routePositions = optimizedRoute.map(bin => [bin.lat, bin.lng]);

  if (loading) {
    return <div className="p-10 flex justify-center text-slate-500 font-medium">Loading Map Geometry...</div>;
  }

  return (
    <div className="w-full flex-col flex">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Map Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Live tracking of garbage bins across sectors</p>
        </div>
        <button
          onClick={() => setShowOptimizedRoute(!showOptimizedRoute)}
          className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors shadow-sm ${showOptimizedRoute
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
        >
          <Navigation size={18} />
          {showOptimizedRoute ? 'Clear Route' : 'Optimize Route'}
        </button>
      </div>
      <div className="w-full h-[600px] bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden relative z-0">
        <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {showOptimizedRoute && routePositions.length > 0 && (
            <Polyline
              positions={routePositions}
              color="#3b82f6"
              weight={4}
              dashArray="8, 8"
              opacity={0.8}
            />
          )}

          {displayedBins.map((bin) => (
            <Marker
              key={bin.id}
              position={[bin.lat, bin.lng]}
              icon={createCustomIcon(bin.fill, showOptimizedRoute)}
            >
              <Popup>
                <div className="font-sans text-sm">
                  <strong className="block text-base text-slate-800 mb-1">{bin.id}</strong>
                  <span className="text-slate-600 block mb-2">{bin.location}</span>
                  <span className="block font-semibold">
                    Fill Level: <span className={
                      bin.fill <= 40 ? 'text-emerald-500' :
                        bin.fill <= 70 ? 'text-amber-500' : 'text-red-500'
                    }>{bin.fill}%</span>
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
