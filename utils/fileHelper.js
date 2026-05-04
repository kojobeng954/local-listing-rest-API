// Utility functions for reading and writing listings.json
// Use fs/promises (the async version) for all file operations
// readListings() — reads the file, parses the JSON, returns the array
// writeListings(data) — stringifies the array with formatting, writes it back
// Wrap both in try/catch and throw the error so routes can handle it
// Keeping file logic here means your routes stay clean and focused

import fs from "fs/promises"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, "../data/data.json")

async function readListings() {
    try {
        const data = await fs.readFile(filePath, "utf8")
        const parsedData = JSON.parse(data)
        return parsedData
    } catch (error) {
        throw error
    }
}


async function writeListings(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
        throw error
    }
}

export {readListings, writeListings}