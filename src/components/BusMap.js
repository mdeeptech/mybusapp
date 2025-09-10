import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import busIconImg from "../assets/bus.png";
import "../styles/BusMap.css"; // ✅ Import CSS

// Normal bus icon
const busIcon = new L.Icon({
  iconUrl: busIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Selected bus icon (bigger)
const busIconSelected = new L.Icon({
  iconUrl: busIconImg,
  iconSize: [55, 55],
  iconAnchor: [27, 27],
});

// Distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ETA based on 20 km/h
const estimateETA = (distanceKm) => {
  const speedKmPerH = 20;
  const etaMinutes = (distanceKm / speedKmPerH) * 60;
  return Math.max(1, Math.round(etaMinutes));
};

// Demo routes near user
const generateRoutesNearUser = (userLocation) => {
  if (!userLocation) return [];
  const { lat, lng } = userLocation;
  return [
    [
      { lat: lat + 0.003, lng: lng + 0.003 },
      { lat: lat + 0.006, lng: lng + 0.004 },
      { lat: lat + 0.009, lng: lng + 0.006 },
    ],
    [
      { lat: lat - 0.002, lng: lng - 0.004 },
      { lat: lat - 0.005, lng: lng - 0.006 },
      { lat: lat - 0.008, lng: lng - 0.007 },
    ],
    [
      { lat: lat + 0.004, lng: lng - 0.003 },
      { lat: lat + 0.006, lng: lng - 0.006 },
      { lat: lat + 0.008, lng: lng - 0.009 },
    ],
  ];
};

// Create buses with routes
const generateBusesWithRoutes = (userLocation) => {
  const routes = generateRoutesNearUser(userLocation);
  return routes.map((route, i) => ({
    id: `bus_${i}`,
    number: `AS20${4500 + i}`,
    route: `Route ${i + 1}`,
    routePoints: route,
    progress: 0,
    position: route[0],
  }));
};

// Recenter helper
const Recenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
};

const BusMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [navigationActive, setNavigationActive] = useState(false);
  const [liveETA, setLiveETA] = useState(null);
  const [routePath, setRoutePath] = useState([]);

  // Temporary "You are here" tag
  const [showLocationTag, setShowLocationTag] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLocationTag(false), 4000); // hide after 4s
    return () => clearTimeout(timer);
  }, []);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setBuses(generateBusesWithRoutes(loc));
      },
      () => alert("Enable location services.")
    );
  }, []);

  // Move buses along route
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => {
          const nextProgress = bus.progress + 0.02;
          if (nextProgress >= 1)
            return { ...bus, progress: 0, position: bus.routePoints[0] };

          const segmentIndex = Math.floor(
            nextProgress * (bus.routePoints.length - 1)
          );
          const t =
            nextProgress * (bus.routePoints.length - 1) - segmentIndex;

          const a = bus.routePoints[segmentIndex];
          const b = bus.routePoints[segmentIndex + 1] || a;

          const newPos = {
            lat: a.lat + (b.lat - a.lat) * t,
            lng: a.lng + (b.lng - a.lng) * t,
          };

          return { ...bus, progress: nextProgress, position: newPos };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update live ETA and route while navigating
  useEffect(() => {
    if (!navigationActive || !selectedBus || !userLocation) return;

    const interval = setInterval(() => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        selectedBus.position.lat,
        selectedBus.position.lng
      );
      setLiveETA({
        distance: distance.toFixed(2),
        eta: estimateETA(distance),
      });
      setRoutePath([userLocation, selectedBus.position]);
    }, 2000);

    return () => clearInterval(interval);
  }, [navigationActive, selectedBus, userLocation]);

  // Bus click
  const handleBusClick = (bus) => {
    if (!userLocation) return;
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      bus.position.lat,
      bus.position.lng
    );
    const eta = estimateETA(distance);
    setSelectedBus({ ...bus, distance, eta });
    setNavigationActive(false);
    setLiveETA(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={userLocation || [0, 0]}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {userLocation && (
          <>
            {/* User location */}
            <Marker
              position={userLocation}
              icon={L.divIcon({
                className: "custom-user-marker",
                html: `
                  <div class="location-pin"></div>
                  ${
                    showLocationTag
                      ? '<div class="location-tag">📍 You are here</div>'
                      : ""
                  }
                `,
                iconSize: [120, 50],
                iconAnchor: [60, 50],
              })}
            />
            <Circle center={userLocation} radius={1000} />
            <Recenter lat={userLocation.lat} lng={userLocation.lng} />
          </>
        )}

        {/* Buses */}
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            position={bus.position}
            icon={
              selectedBus && selectedBus.id === bus.id
                ? busIconSelected
                : busIcon
            }
            eventHandlers={{ click: () => handleBusClick(bus) }}
          />
        ))}

        {navigationActive && routePath.length > 1 && (
          <Polyline
            positions={routePath}
            pathOptions={{ color: "blue", weight: 5 }}
          />
        )}
      </MapContainer>

      {/* Bottom Panel */}
      {selectedBus && (
        <div className="bus-panel">
          <h2 className="bus-title">🚌 Bus {selectedBus.number}</h2>
          <p className="bus-detail">
            <strong>Route:</strong> {selectedBus.route}
          </p>
          {!navigationActive ? (
            <>
              <p className="bus-detail">
                <strong>Distance:</strong> {selectedBus.distance.toFixed(2)} km
              </p>
              <p className="bus-detail">
                <strong>ETA:</strong> {selectedBus.eta} min
              </p>
              <div className="panel-buttons">
                <button
                  className="start-btn"
                  onClick={() => setNavigationActive(true)}
                >
                  Start Navigation
                </button>
                <button
                  className="close-btn"
                  onClick={() => setSelectedBus(null)}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="bus-detail">
                <strong>Live Distance:</strong>{" "}
                {liveETA ? liveETA.distance : "..."} km
              </p>
              <p className="bus-detail">
                <strong>Live ETA:</strong> {liveETA ? liveETA.eta : "..."} min
              </p>
              <div className="panel-buttons">
                <button
                  className="close-btn"
                  onClick={() => {
                    setNavigationActive(false);
                    setSelectedBus(null);
                  }}
                >
                  Stop Navigation
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BusMap;
