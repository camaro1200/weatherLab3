import {Router} from "express";
import {
    getWeatherForCity,
    addCityToDatabase, getWeatherForCords, removeCityFromDatabase, getCitiesFromDatabase,
} from "./handler.js";

const router = Router();

router.get("/weather/city", getWeatherForCity);

router.get("/weather/cords", getWeatherForCords);

router.post("/weather/addCity", addCityToDatabase);

router.delete("/weather/delCity", removeCityFromDatabase);

router.get("/weather/getCities", getCitiesFromDatabase);

export default router