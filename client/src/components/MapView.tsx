import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { IpData } from "../types/ip";

const markerIcon = L.divIcon({
  className: "ip-marker",
  html: `
    <div style="position:relative;width:36px;height:48px;display:flex;align-items:flex-end;justify-content:center;">
      <span class="animate-ping-soft" style="position:absolute;bottom:6px;width:14px;height:14px;border-radius:9999px;background:#3B4BC9;"></span>
      <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative;">
        <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0Z" fill="#242A45"/>
        <circle cx="15" cy="15" r="6" fill="white"/>
      </svg>
    </div>
  `,
  iconSize: [36, 48],
  iconAnchor: [18, 46],
});

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.1 });
  }, [lat, lng, map]);
  return null;
}

export default function MapView({ data }: { data: IpData | null }) {
  const center: [number, number] = data ? [data.lat, data.lng] : [51.5074, -0.1278];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={data ? 13 : 4}
        scrollWheelZoom
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data && (
          <>
            <Marker position={[data.lat, data.lng]} icon={markerIcon} />
            <Recenter lat={data.lat} lng={data.lng} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
