const express = require('express');
const path = require('path')
//const members = require('./resources')
const request = require('request')
//const logger = require('/middleware/logger')

const app = express();

let city = "Moscow"
let my_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f40dfba4f82e36fe59d1c2ebdea5ea12`
let test_url = "api.openweathermap.org/data/2.5/weather?id=3245&appid=c87a32949805a9e971b5cc06389c3f60"

const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + "c87a32949805a9e971b5cc06389c3f60" + "&q=" + city;

app.get('/', function(req, res) {
    request(url, function (response) {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                res.send(weatherData);
            })
        } else {
            console.log("Error get weather API");
        }
    })
})


app.get('/api/members', (req, res) =>{
    res.json(members);
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.listen(6000)

