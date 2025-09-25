const { StatusCodes } = require('http-status-codes');
const  {AirplaneRepository }=require('../repositories');
const airplaneRepository =new AirplaneRepository();
const AppError = require('../utils/errors/app-error');

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        // console.log(error);
        if(error.name == 'SequelizeValidationError'){
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError ('Cannot fetch all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the airplane you requested',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createAirplane,
    getAirplanes,
    getAirplane
}