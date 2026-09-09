# IP Address Tracker

A full-stack rebuild of the IP Address Tracker design: React + TypeScript + Tailwind on the
front end, a small Node/Express + TypeScript proxy on the back end, and a live map (Leaflet)
that flies to whatever IP or domain you search.

```
ip-address-tracker/
├── client/          React + TS + Tailwind (Vite)
├── server/          Node + Express + TS (IP lookup proxy)
└── package.json     runs both together
```

## 1. Install

```bash
npm run install:all
```

This installs dependencies for `client/` and `server/` in one shot. (Under the hood it just
runs `npm install` in each folder — do that manually if you'd rather.)

## 2. Configure environment variables

Copy the example env files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Nothing needs editing to run locally — the default lookup provider ([ipwho.is](https://ipwho.is))
is free and keyless. If you later switch to a keyed provider (ipapi.com, ipgeolocation.io),
add the key to `server/.env` and read it in `server/src/routes/ip.ts`.

## 3. Run it

```bash
npm run dev
```

This starts the API on `http://localhost:4000` and the client on `http://localhost:5173` at
the same time (via `concurrently`). Open the client URL — it auto-looks-up your own IP on load.

Prefer running them in two terminals instead? `npm run dev --prefix server` and
`npm run dev --prefix client` do the same thing separately.

## 4. Wire in your design assets

Your `design/images` folder already has `favicon-32x32.png`, `icon-arrow.svg`,
`icon-location.svg`, `pattern-bg-desktop.png`, and `pattern-bg-mobile.png`. Drop them in:

- `favicon-32x32.png` → `client/public/favicon-32x32.png` (already referenced in `index.html`)
- `pattern-bg-desktop.png` / `pattern-bg-mobile.png` → `client/src/assets/`, then swap the
  `<svg>` grid texture in `App.tsx`'s `<header>` for a `background-image` using these if you'd
  rather match the original pattern pixel-for-pixel instead of the built-in line-grid motif.
- `icon-arrow.svg` / `icon-location.svg` → optional drop-in replacements for the inline SVGs
  already inlined in `SearchBar.tsx` and `MapView.tsx`.

None of this is required to run the app — it ships with its own inline icons and a CSS-drawn
header texture — but swapping them in gets you pixel parity with the original comps.

## 5. Build for production

```bash
npm run build
```

Compiles the server to `server/dist` and the client to `client/dist`. Serve `client/dist`
with any static host (Netlify, Vercel, nginx, etc.) and point `VITE_API_BASE_URL` at wherever
you deploy `server/dist` (Render, Railway, Fly.io, a VPS with `npm run start:server`, etc.).

## Design notes

- **Palette**: deep indigo → periwinkle gradient header (`signal-deep` → `signal-bright` in
  `tailwind.config.ts`), a near-black ink for text and the search button, and a single
  desaturated gray for labels — matching the source comps' restraint.
- **Type**: Space Grotesk for the display heading, Rubik for body copy (close to the original
  comp's geometric sans), and JetBrains Mono for the two genuinely "data" fields — the IP
  address and the UTC offset — so numbers read as data, not prose.
- **Signature motif**: a soft radar "ping" animates outward from the map marker on every
  successful lookup, and a faint line-grid texture sits behind the header — both small nods to
  the idea of a signal being located, without turning into decoration for its own sake.
- **States covered**: initial loading skeleton on the info card, a shake + inline message on
  invalid input, a spinner in the search button mid-request, and a graceful error message if
  the upstream lookup fails.

## Troubleshooting

- **Map tiles don't load / CORS errors**: OpenStreetMap's public tile servers are used as-is;
  if you're rate-limited, swap the `TileLayer` URL in `MapView.tsx` for Mapbox or Google Maps
  (both need an API key you'd store in `client/.env`).
- **"Could not locate that address"**: `ipwho.is` can't resolve private/reserved IP ranges
  (e.g. `192.168.x.x`) — try a public IP or a domain like `github.com`.
- **Port already in use**: change `PORT` in `server/.env` and `VITE_API_BASE_URL` in
  `client/.env` to match.
