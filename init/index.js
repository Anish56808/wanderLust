const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/Managment_app";

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("All listings deleted");
};


async function main() {
    try {
        await mongoose.connect(mongo_url);
        console.log("connected to DB");
        // Initialize data if needed
        await initData();
        await initDB(); // Call initDB to delete existing listings
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}


main();