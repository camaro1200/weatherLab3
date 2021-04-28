import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

let City = mongoose.model('City', schema);

export async function addCity(name) {
    console.log(`addCity ${name}`);
    let city = new City({
        name: `${name}`
    });
    return city.save((error) => {
            if (error) {
                console.error(error);
            }
        }
    );
}

export async function removeCity(name) {
    console.log(`removeCity ${name}`);
    const check = await City.findOne({name: `${name}`})
    if(check){
        await City.deleteOne({name: `${name}`}, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
    else{
        console.log("could not find city")
        throw new Error("no city in database")
    }
}


export async function getCities() {
    console.log("getCities");
    let result;
    await City.find({}, (error, cities) => {
        if (error) {
            console.log(error);
            result = false;
        } else {
            result = [];
            cities.forEach((city) => {
                result.push(city.name);
            });
        }
    });
    return result;
}


