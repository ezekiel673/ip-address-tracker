import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import locationIcon from '../assets/images/icon-location.svg'
import { useEffect, useState } from 'react'

const customIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [45, 55],
  iconAnchor: [22, 55],
})

function MapView({ lat, lng }) {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (typeof lat === 'number' && typeof lng === 'number') setIsValid(true)
  }, [lat, lng])

  if (!isValid)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gray-100 text-gray-600 text-center">
        <p>🗺️ Loading map or invalid coordinates...</p>
      </div>
    )

  return (
    <div className="h-[70vh] w-full z-0">
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
