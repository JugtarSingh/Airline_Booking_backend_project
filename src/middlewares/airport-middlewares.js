const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require('http-status-codes');


function createValidationRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong in creating the airport'
        ErrorResponse.error =  new AppError(['Name not found in the incoming request in correct format'],StatusCodes.BAD_REQUEST);
          return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong in creating the airport'
        ErrorResponse.error =   new AppError(['code not found in the incoming request in correct format'],StatusCodes.BAD_REQUEST);
          return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong in creating the airport'
        ErrorResponse.error =  new AppError(['CityId not found in the incoming request in correct format'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}

module.exports = {
    createValidationRequest
}