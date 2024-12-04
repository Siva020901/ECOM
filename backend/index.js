// Load environment variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");

// Database connection function
const { connectToDB } = require("./database/db");

// Server initialization
const server = express();

// Database connection
connectToDB();

// CORS setup
const allowedOrigins = ['http://localhost:3002'];

server.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies and credentials
        exposedHeaders: ["X-Total-Count"],
        methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed HTTP methods
    })
);

// Handle preflight requests
server.options('*', cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count'],
}));

// Middleware
server.use(express.json()); // Parse JSON payloads
server.use(cookieParser()); // Parse cookies
server.use(morgan("tiny")); // Log HTTP requests

// Route middleware
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);

// Root endpoint
server.get("/", (req, res) => {
    res.status(200).json({ message: "running" });
});

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`server [STARTED] ~ http://localhost:${PORT}`);
});
