import {Router} from "express";
import {
    getWeatherForCity,
    addCityToDatabase,
    addToFavorites
} from "./handler.js";

const router = Router();

router.get("/weather/city", getWeatherForCity);

router.post("/weather/addCity", addCityToDatabase);

router.post("/weather/favs", addToFavorites);

export default router