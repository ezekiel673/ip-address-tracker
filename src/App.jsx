import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import InfoBox from './components/InfoBox'
import MapView from './components/MapView'

function App() {
  const [ipData, setIpData] = useState(null)
  const [query, setQuery] = useState('')

  const fetchIP = async (ip = '') => {
    try {
      const res = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_iujGxqzgd4iITXhUCYFruJxwoa8AI&ipAddress=${ip}`
      )
      setIpData(res.data)
    } catch (error) {
      console.error('Error fetching IP:', error)
    }
  }

  useEffect(() => {
    fetchIP() // get user's IP on load
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim() !== '') fetchIP(query)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
      {ipData && <InfoBox ipData={ipData} />}
      {ipData?.location?.lat && ipData?.location?.lng && (
        <MapView lat={ipData.location.lat} lng={ipData.location.lng} />
      )}
    </div>
  )
}

export default App


