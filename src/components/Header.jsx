import arrowIcon from '../assets/images/icon-arrow.svg'

function Header({ query, setQuery, handleSearch }) {
  return (
  <header className="flex flex-col items-center justify-center text-center text-white py-8 bg-[url('/src/assets/images/pattern-bg-desktop.png')] bg-cover bg-center">
      {/* Title */}
      <h1 className="text-white text-3xl font-bold mb-[30px]">
        IP Address Tracker
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center w-[450px] h-[70px]"
      >
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow h-[40px] px-4 text-gray-800 text-[14px] outline-none rounded-l-[8px] placeholder:text-[16px] placeholder:text-gray-500"
          style={{ fontSize: '16px' }}
        />

        <button
          type="submit"
          className="flex items-center justify-center w-[45px] h-[45px] bg-[var(--very-dark-gray)] hover:bg-gray-700 rounded-r-[8px] transition-all"
        >
          <img src={arrowIcon} alt="search" className="w-3 h-3" />
        </button>
      </form>
    </header>
  )
}

export default Header
