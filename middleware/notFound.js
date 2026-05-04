// 404 handler — catches any request that didn't match a route
// Mount this in index.js AFTER all your routes
// Set res.status(404) and send a JSON response with a message
// No next() call needed here — this is the end of the line

function notFound(req,res) {
    res.status(404).json({success: false, message: "Page not found"})
}

export { notFound }