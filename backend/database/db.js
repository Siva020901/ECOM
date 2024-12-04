require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

// Function to connect to MongoDB
exports.connectToDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MongoDB URI is not defined in the .env file");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};
