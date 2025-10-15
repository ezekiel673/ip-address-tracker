function InfoBox({ ipData }) {
  const { ip, isp, location } = ipData

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl flex flex-wrap justify-around text-center z-10 relative -mt-12 w-11/12 mx-auto">
      <div>
        <h2 className="text-xs text-gray-500">IP ADDRESS</h2>
        <p className="font-bold text-lg">{ip}</p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500">LOCATION</h2>
        <p className="font-bold text-lg">
          {location.city}, {location.region} {location.postalCode}
        </p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500">TIMEZONE</h2>
        <p className="font-bold text-lg">UTC {location.timezone}</p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500">ISP</h2>
        <p className="font-bold text-lg">{isp}</p>
      </div>
    </div>
  )
}

export default InfoBox
