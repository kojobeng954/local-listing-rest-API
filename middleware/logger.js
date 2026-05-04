// Custom request logger middleware
// Runs on every incoming request before it hits your routes
// Log the method (req.method), the url (req.url), and the timestamp
// Use fs.appendFile to write each log entry to logs/requests.log
// Call next() after writing — if you forget this, every request hangs
// Export this function so index.js can use it with index.use()

import fs from "fs/promises"
import path from "path"

async function logger(req,res,next) {
    const logEntry = `${req.method} ${req.url} ${new Date().toISOString()}\n`

    await fs.appendFile(path.join("logs", "requests.log"), logEntry, (err) => {
    if (err) console.log(err)
})
    next()
}

export {logger}