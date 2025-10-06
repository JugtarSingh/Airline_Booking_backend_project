const { StatusCodes } = require('http-status-codes');
const {AirportService} = require('../services');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');




async function createAirport(req,res){
    try {
        const airport = await AirportService.createAirport({
            name : req.body.name,
            code : req.body.code,
            address : req.body.address,
            cityId : req.body.cityId,

        })
        SuccessResponse.data = airport;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(error.statusCodes)
        .json(ErrorResponse);
    }
}

async function getAirport(req,res){
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(error.statusCodes)
        .json(ErrorResponse);
    }
}


async function getAirports(req,res){
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(error.statusCodes)
        .json(ErrorResponse);
    }
}

async function destroyAirport(req,res){
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(error.statusCodes)
        .json(ErrorResponse);
    }
}

async function updateAirport(req,res){
    try {
        const airport = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.data = airport;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(error.statusCodes)
        .json(ErrorResponse);
    }
}

module.exports ={
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport

}