const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const {AirportRepository} = require('../repositories');


const airportRepository = new AirportRepository();


async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if( error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
         throw new AppError(explaination,StatusCodes.BAD_REQUEST);    
        }
        throw new AppError('Cannot create the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports
    } catch (error) {
        throw new AppError('Cannot fetch all airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(data){
    try {
        const airport = await airportRepository.get(data);
        return airport;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Cannot fetch the Airport you requested',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot fetch the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        console.log(response);
        return response ;
    } catch (error) {
        console.log(error)
        if( error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Cannot fetch the Airport you requested to delete',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot destroy the airport' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id , data){
    try {
        const response = await airportRepository.update(id,data);
        return response;
    } catch (error) {
        console.log(error);
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Cannot find the Airport you requested to update',StatusCodes.BAD_REQUEST);
        }
        throw new AppError ('Cannot update the Airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}