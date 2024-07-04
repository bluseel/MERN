const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const sectionRoute = require("../routes/sectionRoute");
const courseRoute = require("../routes/courseRoute");
const taskRoute = require("../routes/taskRoute");

const cors = require('cors')


//for vercel online
app.use(cors(
    {
        // "taskstracker.netlify.app" for netlfiy npm run build
        // original : https://mern-frontend-lake.vercel.app
        origin : ["https://mern-frontend-lake.vercel.app",
                    "https://tasktracker0.netlify.app",
                    "http://localhost:5000",
                ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
    }
))

//forlocal
// app.use(cors())

app.use(express.json());

const receivedURI = process.env.uri


let userName = "admin";
let userPassword = "admin";

//its just a function
const startDatabase = async (customURI) =>{
    await mongoose.disconnect()
    let isDatabaseConnected = true;
    //connecting mondodb 
    await mongoose.connect(customURI)
    // mongoose.connect(uri2)
    .then(()=>{
        console.log("connected succesfully!");
    })
    .catch((error)=>{
        isDatabaseConnected = error.ok
    })
    return (isDatabaseConnected)
    
}

// Default route
app.get("/", async (req, res) => {
    try {
        res.status(200).send("meow");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//signing in
app.post('/signin', async (req, res) => {
    const { userName, userPassword} = req.body;
    console.log(`--         id:${userName},pass:${userPassword}`)
    const uri2 = `mongodb+srv://${userName}:${userPassword}@meow.yzdygsk.mongodb.net/?retryWrites=true&w=majority&appName=meow`
    let notConnected = await startDatabase(uri2)
    

    //if it doesn't connect to edit database, it connects using readonly default
    let successfullSignedIn=true;
    if(notConnected === 0){
        console.log('wrong credential so connecting to deafult')
        notConnected = await startDatabase(process.env.URIdefault)
        successfullSignedIn=false;
    }
    // }

    res.status(200).json(successfullSignedIn);
});


startDatabase(`mongodb+srv://admin:admin@meow.yzdygsk.mongodb.net/?retryWrites=true&w=majority&appName=meow`)


app.listen(process.env.port || 8000, () => {
    console.log(`Server is listening on http://localhost:${process.env.port}`);
});
app.use(sectionRoute);
app.use(courseRoute);
app.use(taskRoute);



