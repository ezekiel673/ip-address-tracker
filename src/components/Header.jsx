function Header({ query, setQuery, handleSearch }) {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">IP Address Tracker</h1>
      <form onSubmit={handleSearch} className="flex w-3/4 max-w-md">
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 rounded-l-lg text-gray-800 outline-none"
        />
        <button
          type="submit"
          className="bg-black px-4 rounded-r-lg hover:bg-gray-800 transition"
        >
          ▶
        </button>
      </form>
    </header>
  )
}

export default Header
