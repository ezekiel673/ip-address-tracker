import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect } from 'react'

// Custom map marker icon
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 35],
  iconAnchor: [17, 34],
})

function MapView({ lat, lng }) {
  const [isValid, setIsValid] = useState(false)

  // Validate coordinates when props change
  useEffect(() => {
    if (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      !isNaN(lat) &&
      !isNaN(lng)
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [lat, lng])

  // 🧭 Fallback UI if coordinates are invalid or loading
  if (!isValid) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 text-gray-600 text-center">
        <div>
          <p className="font-semibold text-lg">🗺️ Map loading...</p>
          <p className="text-sm text-gray-500 mt-2">
            Waiting for valid coordinates. Please search for a valid IP address or domain.
          </p>
        </div>
      </div>
    )
  }

  // ✅ Render map when valid coordinates exist
  return (
    <div className="flex-1 z-0 h-[70vh] w-full">
      <MapContainer center={[lat, lng]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>📍 Location Found</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapView
