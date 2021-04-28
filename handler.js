import https from "https";

import {getCities, addCity} from './mongdb_set_up.js'
let city = "Lyon"
let my_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f40dfba4f82e36fe59d1c2ebdea5ea12`

function getCity(){

}


export function getWeatherForCity(req, res) {
    https.get(my_url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                res.send(weatherData);
                console.log(weatherData.name)
                return weatherData.name;
            });
        } else {
            res.sendStatus(404);
            console.log("[getWeatherForCity] API Error");
        }
    });
}

export function addCityToDatabase(req, res) {
    try {
        addCity(req.query.name).then(() => {
            res.sendStatus(200);
        });
    } catch (e) {
        res.send(e);
    }
}


export function addToFavorites(req, res){
    const name= getWeatherForCity(req, res);
    console.log(name);
    // const {name} = city_json;
    // addCity(name).then(() => {
    //     res.sendStatus(200);
    // });

}