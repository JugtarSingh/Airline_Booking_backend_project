const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function createValidateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message="Something went wrong in creating airplane"
        ErrorResponse.error = new AppError([ "Model Number is not found in the oncoming request in correct form"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}

module.exports={
    createValidateRequest
}