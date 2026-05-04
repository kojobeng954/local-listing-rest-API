// Entry point of the entire application
// 1. Import express and create your app instance
// 2. Import your middleware (logger, json parser)
// 3. Import your route files from the routes/ folder
// 4. Mount routes using app.use() with a base path e.g. /api/listings
// 5. Mount your 404 middleware after all routes
// 6. Mount your global error handler last — always last
// 7. Start the server with app.listen() on a port from process.env.PORT or 3000

import express from "express"
import { notFound } from "./middleware/notFound.js"
import { errorHandler } from "./middleware/errorHandler.js"
import route from "./routes/route.js"

const app = express()
app.use(express.json())
app.use(route)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
