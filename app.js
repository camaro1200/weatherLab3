import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routers.js";
import {addCity, getCities} from './mongdb_set_up.js';

dotenv.config();
const app = express();
const mango_url = process.env.MANGO_URL;
const PORT  = 3000;

app.use(cors());
app.use(routes);

async function start1() {
    try {
        await mongoose.connect(mango_url , {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Launched server on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

// app.get('/', (req, res) => {
//     res.send('Hello world');
// })

start1();




