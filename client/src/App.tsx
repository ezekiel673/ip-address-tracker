import SearchBar from "./components/SearchBar";
import InfoPanel from "./components/InfoPanel";
import MapView from "./components/MapView";
import { useIpLookup } from "./hooks/useIpLookup";

export default function App() {
  const { data, status, error, lookup } = useIpLookup();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header
        className="relative shrink-0 bg-signal-gradient bg-cover bg-top bg-no-repeat px-6 pb-24 pt-8 text-white
          bg-[url('/images/pattern-bg-mobile.png')] md:bg-[url('/images/pattern-bg-desktop.png')] md:pb-28 md:pt-10"
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">IP Address Tracker</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/70">
            Trace any IP address or domain to its city, timezone, and provider.
          </p>
          <div className="mt-6">
            <SearchBar onSubmit={lookup} isLoading={status === "loading"} errorMessage={error} />
          </div>
        </div>

        <InfoPanel data={data} status={status} />
      </header>

      <main className="relative flex-1">
        <MapView data={data} />
      </main>
    </div>
  );
}