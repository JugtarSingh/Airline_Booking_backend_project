const {CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

//Create the object of the city repository
const cityRepository = new CityRepository();


async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        console.log(error)
        if(error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError'){
            let explaination = [];
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            });
            throw new AppError (explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new City",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity
}