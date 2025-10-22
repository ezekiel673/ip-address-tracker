function InfoBox({ ipData }) {
  const { ip, isp, location } = ipData

  return (
    <div className="info-box flex flex-wrap justify-between items-center w-11/12 md:w-3/4 mx-auto text-center md:text-left bg-white p-6">
      <div>
        <h2>IP ADDRESS</h2>
        <p>{ip}</p>
      </div>
      <div>
        <h2>LOCATION</h2>
        <p>
          {location?.city}, {location?.region} {location?.postalCode}
        </p>
      </div>
      <div>
        <h2>TIMEZONE</h2>
        <p>UTC {location?.timezone}</p>
      </div>
      <div>
        <h2>ISP</h2>
        <p>{isp}</p>
      </div>
    </div>
  )
}

export default InfoBox

