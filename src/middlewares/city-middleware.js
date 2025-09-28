const AppError = require('../utils/errors/app-error');
const { ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');


function createValidateRequest(req,res,next){
    console.log('hello')
    if(!req.body){
        ErrorResponse.message = 'Something when wrong in creating the city';
        ErrorResponse.error = new AppError(['Name is not found in incoming request'],StatusCodes.BAD_REQUEST);
        res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    createValidateRequest
}