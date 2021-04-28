import https from "https";
import fetch from "node-fetch"

import {getCities, addCity, removeCity} from './mongdb_set_up.js'


export async function getJsonForCity(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f40dfba4f82e36fe59d1c2ebdea5ea12`
    return await fetch(api).then((response) => {
        return response.json();
    })
}

export async function getJsonForCords(lat, long) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f40dfba4f82e36fe59d1c2ebdea5ea12`
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
    const lon = req.query.lon
    const weather_json = await getJsonForCords(lat, lon)
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
        //res.send(weather_json);
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
