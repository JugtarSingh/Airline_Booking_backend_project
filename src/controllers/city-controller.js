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
        console.log(error);
       ErrorResponse.error = error;
       res
       .status(error.statusCodes)
       .json(ErrorResponse); 
    }
}

module.exports = {
    createCity
}