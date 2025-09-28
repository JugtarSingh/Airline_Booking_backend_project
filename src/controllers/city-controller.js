const { StatusCodes } = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');

const {CityService} = require('../services');


async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            name : req.body.name
        });
        SuccessResponse.data = city;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
        
    } catch (error) {
       ErrorResponse.error = error;
       res
       .status(error.statusCodes)
       .json(ErrorResponse); 
    }
}

async function destroyCity(req,res){
    try {
        const response = await CityService.destroyCity(req.params.id);
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

async function updateCity(req,res){
    try {
        const response = await CityService.updateCity(req.params.id , req.body);
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

module.exports = {
    createCity,
    destroyCity,
    updateCity
    
}