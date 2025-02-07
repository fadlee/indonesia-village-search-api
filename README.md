# Indonesia Village Search API

A fast and efficient API service for searching Indonesian villages using fuzzy matching. Built with Cloudflare Workers and Hono framework, this API provides quick access to village data with typo-tolerant search capabilities.

## Features

- Fuzzy search with typo tolerance
- Fast in-memory data processing
- Performance metrics for each request
- CORS enabled
- Built on Cloudflare's edge network

## Installation

To set up the project locally:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## API Documentation

### Search Endpoint

```
GET /search?term={searchTerm}&limit={resultLimit}
```

#### Parameters

- `term` (required): The village name to search for
- `limit` (optional): Maximum number of results to return (default: 10)

#### Example Request

```bash
curl "http://localhost:8787/search?term=suka%20bumi&limit=5"
```

#### Example Response

```json
{
    "data": [
        "32.72.05.1001;Baros, Kec. Baros, KOTA SUKABUMI, JAWA BARAT",
        "17.07.08.2009;Suka Bumi, Kec. Lebong Sakti, KAB. LEBONG, BENGKULU",
        "18.08.13.2004;Suka Bumi, Kec. Buay Bahuga, KAB. WAY KANAN, LAMPUNG",
        "32.02.29.2008;Cibatu, Kec. Cisaat, KAB. SUKABUMI, JAWA BARAT",
        "32.02.22.2001;Ciemas, Kec. Ciemas, KAB. SUKABUMI, JAWA BARAT"
    ],
    "stats": {
        "search_time_ms": 0,
        "total_records": 83761,
        "matches_found": 5
    }
}
```

## Deployment

To deploy to Cloudflare Workers:

```bash
pnpm run deploy
```

## Tech Stack

- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform
- [Hono](https://hono.dev/) - Lightweight web framework
- [Fuzzysort](https://github.com/farzher/fuzzysort) - Fast fuzzy search library

## License

MIT
