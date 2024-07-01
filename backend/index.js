const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const sectionRoute = require("./routes/sectionRoute");
const courseRoute = require("./routes/courseRoute");
const taskRoute = require("./routes/taskRoute");

const cors = require('cors');

// Import the frontend base URL from the configuration file
const { FrontEnd_BASE_URL } = require('../.config');  // Changed from `import` to `require`

app.use(cors({
    origin: [FrontEnd_BASE_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());

const receivedURI = process.env.uri;

let userName = "admin";
let userPassword = "admin";

// Function to start the database
const startDatabase = async (customURI) => {
    try {
        await mongoose.disconnect();
        await mongoose.connect(customURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected successfully!");
        return true;
    } catch (error) {
        console.error("Database connection error:", error.message);
        return false;
    }
};


// Default route
router.get("/", async (req, res) => {
    try {
        res.status(200).send("meow");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Signing in
app.post('/signin', async (req, res) => {
    const { userName, userPassword } = req.body;
    console.log(`Attempting to sign in with id: ${userName}, pass: ${userPassword}`);
    const uri2 = `mongodb+srv://${userName}:${userPassword}@meow.yzdygsk.mongodb.net/?retryWrites=true&w=majority&appName=meow`;
    let isConnected = await startDatabase(uri2);

    if (!isConnected) {
        console.log('Invalid credentials, attempting to connect to default database');
        isConnected = await startDatabase(process.env.URIdefault);
    }

    res.status(200).json({ success: isConnected });
});

// Start default database connection
startDatabase(process.env.URIdefault);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT || 8000}`);
});

// Use routes after middleware
app.use('/sections', sectionRoute);
app.use('/courses', courseRoute);
app.use('/tasks', taskRoute);
