const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()

//db
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        console.log("db connected");

        const PORT = 8000;
        app.listen(PORT, () => {
            console.log("server is active");
        });
    }
);


//mw

//routes

