# StreamHub: Distributed Edge Streaming Platform

An edge-native movie catalog platform architected to leverage globally distributed node execution, asynchronous UI streaming, and real-time client hydration. Requests are dynamically routed to the nearest regional edge node to process localized context, stream media metadata from the TMDB API, and broadcast live platform traffic metrics via unified Server-Sent Events (SSE).

---

## Technical Architecture & File Structure
src/
app/
api/
location/           → Geolocation parsing edge runtime engine (/api/location)
pulse/              → Persistent SSE viewer telemetry stream (/api/pulse)
shell/
TopBar.tsx          → Sticky navigation header embedding live telemetry displays
NetworkBanner.tsx   → Global edge connection & localized metadata panel
ui/
TitleItem.tsx       → Individual atomic movie asset representation card
CatalogFeed.tsx     → Asynchronous React Server Component handles remote API ingestion
CatalogSkeleton.tsx → High-fidelity structural fallback used during loading cycles
ViewerCount.tsx     → Reactive visualization element utilizing custom data hooks
hooks/
useEdgeLocation.ts    → Custom hook abstracts geographic state resolution
useViewerFeed.ts      → Custom hook orchestrates lifecycle of persistent EventSource tunnels
lib/
regions.ts            → Data matrix maps physical edge nodes to digital data centers


---

## Core Engineering Decisions

* **Decoupled State Architecture (Custom Hooks):** Originally, data-fetching pipelines and internal `EventSource` lifecycles were bound directly to presentation components. To achieve clean separation of concerns, this structural logic was extracted into `useEdgeLocation` and `useViewerFeed`. Components are now strictly presentation-oriented, while side effects and stream listeners live inside isolated state-management layers.
* **Next.js Edge Runtime Integration:** Both `/api/location` and `/api/pulse` feature strict `export const runtime = "edge"` configurations. This provisions lightweight execution bounds across decentralized network points of presence (PoPs), allowing access to real-time inbound deployment metadata (`request.geo`) directly at the server edge.
* **Localized Fallback Handlers:** Because local development environments do not route through production content delivery infrastructures, `request.geo` remains undefined on `localhost`. To preserve deterministic layout outputs during debugging, `lib/regions.ts` introduces a resilient fallback context defaulting to `AZ` (Azerbaijan).
* **Optimized Real-Time Delivery (SSE):** Since traffic telemetry is strictly unidirectional (server → client), standard duplex WebSockets incur redundant framework and compute overhead. Server-Sent Events utilize the native `ReadableStream` API, aligning seamlessly with edge processing pipelines with negligible resource footprints.
* **Asynchronous Interface Hydration (React Suspense):** The `CatalogFeed` operates as an asynchronous React Server Component. Encapsulating its dynamic API-fetching chain inside a `Suspense` boundary alongside a `CatalogSkeleton` prevents database operations from blocking primary hydration threads. Core shell assets—such as the layout header and regional network panels—render instantly.

---

## Local Development Environment Setup

### 1. Provision Project Dependencies
```bash
npm install
```
### 2. Configure Environment Secrets
Ensure a secure .env.local bundle is placed within your project's root directory. If you are substituting your own authorization credentials, acquire a read-only Bearer token from the TMDB API Configuration Portal:
TMDB_SECRET=your_secure_bearer_token_here
DEV_ORIGIN=http://localhost:3001
PROD_ORIGIN=[netflix-streaming-platform-lake.vercel.app](netflix-streaming-platform-lake.vercel.app)

### 3. Initialize Local Development Server
```bash
npm run dev

```
Open http://localhost:3001 within your preferred browser client to review layout parameters and inspect streaming telemetry.