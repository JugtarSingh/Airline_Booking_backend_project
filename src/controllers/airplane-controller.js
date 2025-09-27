const {AirplaneService}=require('../services');
const { StatusCodes } = require('http-status-codes');
const {ErrorResponse, SuccessResponse} = require('../utils/common');
async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.message="Successfully created the airplane"
        SuccessResponse.data=airplane;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        // ErrorResponse.error=error;
        res
        .status(error.statusCodes)
        .json(ErrorResponse);
        
    }
}

async function getAirplanes(req,res){
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getAirplane(req,res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function destroyAirplane(req,res){
    try {
        const response = await AirplaneService.destroyAirplane(req.params.id);
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

async function updateAirplane(req,res){
    try {
        const response = await AirplaneService.updateAirplane(req.params.id , req.body);
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

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}
