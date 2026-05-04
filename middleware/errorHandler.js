// Global error handler — Express identifies this by its 4 parameters
// Signature must be (err, req, res, next) — all four, no exceptions
// Mount this in index.js as the very last middleware
// Log the error stack so you can debug it during development
// Send res.status(500) with a JSON error message to the client
// Any route that calls next(err) will land here


function errorHandler(err,req,res,next) {
    console.log(err.stack)

    res.status(500).json({
        status: "error",
        message: err.message
    })
}

export { errorHandler }