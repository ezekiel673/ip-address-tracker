import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const IPV4_OR_DOMAIN =
  /^(?:(?:\d{1,3}\.){3}\d{1,3}|[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)$/i;

export default function SearchBar({ onSubmit, isLoading, errorMessage }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setLocalError("Enter an IP address or domain first.");
      triggerShake();
      return;
    }

    if (!IPV4_OR_DOMAIN.test(trimmed)) {
      setLocalError("That doesn't look like a valid IP address or domain.");
      triggerShake();
      return;
    }

    setLocalError(null);
    onSubmit(trimmed);
  };

  const message = localError ?? errorMessage;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div
        className={`flex items-stretch overflow-hidden rounded-2xl bg-white shadow-xl shadow-signal-deep/20 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <label htmlFor="ip-query" className="sr-only">
          Search for any IP address or domain
        </label>
        <input
          id="ip-query"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search for any IP address or domain"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="flex-1 min-w-0 px-5 py-4 font-body text-ink placeholder:text-haze focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          disabled={isLoading}
          className="flex w-14 shrink-0 items-center justify-center bg-ink transition-colors hover:bg-signal-mid disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 7L1 13V1Z" fill="white" />
            </svg>
          )}
        </button>
      </div>
      <p
        role="alert"
        className={`mt-2 min-h-[1.25rem] pl-1 text-sm font-medium text-rose-100 transition-opacity ${
          message ? "opacity-100" : "opacity-0"
        }`}
      >
        {message ?? "placeholder"}
      </p>
    </form>
  );
}
