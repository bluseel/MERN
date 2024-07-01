const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const sectionRoute = require("./routes/sectionRoute");
const courseRoute = require("./routes/courseRoute");
const taskRoute = require("./routes/taskRoute");

const cors = require('cors');
app.use(express.json());

// CORS middleware with headers included
const allowedOrigins = [
  'https://mern-frontend-git-vercelfeature-bluseels-projects.vercel.app',
  'http://localhost:3000',
  'https://another-frontend-app.example.com'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  next();
});

// Route and database setup
const receivedURI = process.env.uri;

let userName = "admin";
let userPassword = "admin";

const startDatabase = async (customURI) => {
  await mongoose.disconnect();
  let isDatabaseConnected = true;

  await mongoose.connect(customURI)
    .then(() => {
      console.log("Connected successfully!");
    })
    .catch((error) => {
      isDatabaseConnected = error.ok;
    });

  return isDatabaseConnected;
};

app.get("/", async (req, res) => {
  try {
    res.status(200).send("meow");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/signin', async (req, res) => {
  const { userName, userPassword } = req.body;
  console.log(`--         id:${userName},pass:${userPassword}`);
  const uri2 = `mongodb+srv://${userName}:${userPassword}@meow.yzdygsk.mongodb.net/?retryWrites=true&w=majority&appName=meow`;
  let notConnected = await startDatabase(uri2);

  let successfullSignedIn = true;
  if (notConnected === 0) {
    console.log('Wrong credentials, connecting to default');
    notConnected = await startDatabase(process.env.URIdefault);
    successfullSignedIn = false;
  }

  res.status(200).json(successfullSignedIn);
});

startDatabase(`mongodb+srv://admin:admin@meow.yzdygsk.mongodb.net/?retryWrites=true&w=majority&appName=meow`);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

app.use(sectionRoute);
app.use(courseRoute);
app.use(taskRoute);
