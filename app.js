let mango_url = "mongodb+srv://manager:manager@cluster0.hv5da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routers.js";
import {addCity, getCities} from './mongdb_set_up.js';

const app = express();
const PORT  = 3000

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

app.get('/', (req, res) => {
    res.send('Hello world');
})

start1();


//addCity('moscow');
//addCity('Stuttgart');
//getCities().then(res => console.log(res));



