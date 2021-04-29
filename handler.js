import https from "https";
import fetch from "node-fetch"
import dotenv from "dotenv";
import {getCities, addCity, removeCity} from './mongdb_set_up.js'

dotenv.config();
const api_url = process.env.API_URL

export async function getJsonForCity(city) {
    const api = `${api_url}&q=${city}`
    return await fetch(api).then((response) => {
        return response.json();
    })
}

export async function getJsonForCords(lat, long) {
    const api = `${api_url}&lat=${lat}&lon=${long}`
    return await fetch(api).then((response) => {
        {
            return response.json();
        }
    })
}


export async function getWeatherForCity(req, res) {
    const name = req.query.name
    const weather_json = await getJsonForCity(name)
    console.log(weather_json)

    if(weather_json.cod == 200){
        res.send(weather_json);
        console.log(weather_json.name)
    }
    else{
        res.status(400).json({message:weather_json.message})
        console.log("error fetching json")
    }
}


export async function getWeatherForCords(req, res) {
    const lat = req.query.lat
    const long = req.query.long
    const weather_json = await getJsonForCords(lat, long)
    console.log(weather_json)

    if(weather_json.cod == 200){
        res.send(weather_json);
        console.log(weather_json.latitude + weather_json.longitude )
    }
    else{
        res.status(400).json({message:weather_json.message})
        console.log("error fetching json")
    }
}


export async function addCityToDatabase(req, res) {
    const name = req.query.name
    const weather_json = await getJsonForCity(name)
    //console.log(weather_json)

    if(weather_json.cod == 200){
        res.send(weather_json);
        console.log(weather_json.name)
        try {
            addCity(weather_json.name).then(() => {
                res.sendStatus(200);
            });
        } catch (e) {
            res.send(e);
        }
    }
    else{
        res.status(400).json({message:weather_json.message})
        console.log("error fetching json")
    }
}

export async function removeCityFromDatabase(req, res) {
    const name = req.query.name
    const weather_json = await getJsonForCity(name)
    console.log(weather_json.name)

    if(weather_json.cod == 200){
        {
            removeCity(weather_json.name).then(() => {
                res.sendStatus(200);
            }).catch(e => res.json({message:e.message}))
        }
    }
    else{
        res.status(400).json({message:weather_json.message})
        console.log("error fetching json")
    }
}


export function getCitiesFromDatabase(req, res) {
    getCities().then((response) => {
        res.send(response);
    });
}
