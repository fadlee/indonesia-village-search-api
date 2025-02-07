import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { timing } from 'hono/timing'
import fuzzysort from 'fuzzysort'
import { data } from './data'

// In-memory cache for CSV data
let csvCache: { lines: string[]; locations: string[] } | null = null

// Helper function to process data
async function readCSVData() {
  // Return cached data if available
  if (csvCache) return csvCache

  // Process and cache data if not available
  const lines = data.split('\n').filter(line => line.trim())
  const locations = lines.map(line => line.split(';')[1])

  // Store in cache
  csvCache = { lines, locations }
  return csvCache
}

const app = new Hono<{ Bindings: CloudflareBindings }>()

// Add CORS middleware
app.use('*', cors())

// Add timing middleware
app.use('*', timing())

// Search endpoint
app.get('/search', async (c) => {
  const searchTerm = c.req.query('term')
  const limit = parseInt(c.req.query('limit') || '10')

  // Validate search term
  if (!searchTerm) {
    return c.json({ error: "Missing 'term' parameter" }, 400)
  }

  try {
    // Start timing
    const startTime = performance.now()

    // Read CSV data
    const { lines, locations } = await readCSVData()

    // Perform fuzzy search
    const results = fuzzysort.go(searchTerm.toLowerCase(), locations, {
      threshold: -10000,
      limit: limit
    })

    // Map results back to original lines
    const matches = results.map(result => lines[locations.indexOf(result.target)])

    // Calculate elapsed time
    const elapsedMs = performance.now() - startTime

    // Prepare response
    const responseData = {
      data: matches,
      stats: {
        search_time_ms: elapsedMs,
        total_records: lines.length,
        matches_found: matches.length
      }
    }

    return c.json(responseData)
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export default app
