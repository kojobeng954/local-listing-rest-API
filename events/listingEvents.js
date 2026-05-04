// Custom EventEmitter for tracking listing activity
// Import EventEmitter from the built-in 'events' module
// Create one instance and export it — import this same instance everywhere
// Register listeners here for three events: listing_created, listing_updated, listing_deleted
// Each listener should append a timestamped entry to logs/events.log
// Emitting happens in your route handlers after a successful file write

import eventEmitter from "events";
import fs from "fs/promises";
import path from "path";

const listingEmitter  = new eventEmitter();

listingEmitter.on("listing_created", () => {
  // Append timestamped entry to logs/events.log
    const logEntry = `${new Date().toISOString()} - Listing created\n`;
    fs.appendFile(path.join("logs", "events.log"), logEntry);
});

listingEmitter.on("listing_updated", () => {
  // Append timestamped entry to logs/events.log
    const logEntry = `${new Date().toISOString()} - Listing updated\n`;
    fs.appendFile(path.join("logs", "events.log"), logEntry);
});

listingEmitter.on("listing_deleted", () => {
  // Append timestamped entry to logs/events.log
    const logEntry = `${new Date().toISOString()} - Listing deleted\n`;
    fs.appendFile(path.join("logs", "events.log"), logEntry);
});

export {listingEmitter };