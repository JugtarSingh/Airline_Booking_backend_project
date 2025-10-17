const { StatusCodes } = require('http-status-codes');
const { Op } = require ('sequelize');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
        const endingTripTime = ' 23:59:00'
        let customfliters = {}
        let  sortFliter = [];
        if (query.trips){
            [departureAirportId , arrivalAirportId] = query.trips.split("-");
            customfliters.departureAirportId = departureAirportId;
            customfliters.arrivalAirportId = arrivalAirportId;
        }
        if(query.price){
            [minPrice , maxPrice ] = query.price.split("-");
            customfliters.price = {
                [Op.between] : [minPrice , ((maxPrice == undefined)? 20000 : maxPrice)]
            }
        }
        if(query.travellers){
            customfliters.totalSeats = {
                [Op.gte] : query.travellers
            }
        }
        if(query.tripDate){
            customfliters.departureTime = {
                [Op.between] : [query.tripDate , query.tripDate + endingTripTime]
            }
        }
        if(query.sort){
            const params = query.sort.split(",");
            const sortFliters = params.map((param)=> param.split("_") )
            sortFliter = sortFliters;
        }
        try {
        const flights = await flightRepository.getAllFlights(customfliters , sortFliter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch all flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Cannot find the flight you requested',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateSeats(data){
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId , data.seats , data.desc);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot update the total seats of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
 
module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats,
}