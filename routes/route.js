// Handles all listing-related routes
// Use express.Router() here, not the full app
// GET    /        — read listings.json and return all listings
// GET    /:id     — find one listing by its id from route params
// GET    /search  — filter listings using req.query (category, price, location)
// POST   /        — read req.body, generate a uuid, push to listings.json, save file
// PUT    /:id     — find listing by id, update its fields, overwrite listings.json
// DELETE /:id     — filter out the listing by id, save the updated array
// After POST, PUT, DELETE — emit the matching event from your EventEmitter
// Export the router at the bottom

import express from "express";
import { readListings, writeListings } from "../utils/fileHelper.js";
import { listingEmitter } from "../events/listingEvents.js";
import { v4 as uuidv4 } from "uuid";
import { getAllListings, getListingById, searchListings, createListing, updateListing, deleteListing } from "../controllers/controller.js";
const route = express.Router()

route.get("/", readListings)

route.get("/:id", getListingById)

route.get("/search", searchListings )

route.post("/", createListing)

route.put("/:id", updateListing)

route.delete("/:id", deleteListing)

export default route