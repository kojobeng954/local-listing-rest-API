// This file asks "what do I do with the data?"
import { readListings, writeListings } from "../utils/fileHelper.js"
import { listingEmitter } from "../events/listingEvents.js"
import { v4 as uuidv4 } from "uuid"


async function getAllListings(req, res, next) {
    try {
        const listings = await readListings();
        res.json(listings);
    } catch (error) {
        next(error);
    }
}

async function getListingById(req, res, next) {
    try {
        const { id } = req.params;
        const listings = await readListings();
        const listing = listings.find((l) => l.id === id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (error) {
        next(error);
    }
}

async function searchListings(req, res, next) {
    try {
        const { query } = req.query;
        const listings = await readListings();
        const results = listings.filter((listing) =>
            listing.title.toLowerCase().includes(query.toLowerCase()) ||
            listing.description.toLowerCase().includes(query.toLowerCase())
        );
        res.json(results);
    } catch (error) {
        next(error);
    }
}

async function createListing(req, res, next) {
    try {
        const { title, description, price } = req.body;
        const newListing = {
            id: uuidv4(),
            title,
            description,
            price
        };
        const listings = await readListings();
        listings.push(newListing);
        await writeListings(listings);
        listingEmitter.emit("listing_created");
        res.status(201).json(newListing);
    } catch (error) {
        next(error);
    }
}

async function updateListing(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;
        const listings = await readListings();
        const index = listings.findIndex((l) => l.id === id);
        if (index === -1) {
            return res.status(404).json({ error: "Listing not found" });
        }
        listings[index] = { ...listings[index], title, description, price };
        await writeListings(listings);
        res.json(listings[index]);
    } catch (error) {
        next(error);
    }
}

async function deleteListing(req, res, next) {
    try {
        const { id } = req.params;
        const listings = await readListings();
        const index = listings.findIndex((l) => l.id === id);
        if (index === -1) {
            return res.status(404).json({ error: "Listing not found" });
        }
        listings.splice(index, 1);
        await writeListings(listings);
        res.json({ message: "Listing deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export { getAllListings, getListingById, searchListings, createListing, updateListing, deleteListing }