const express = require('express');
const {AirplaneController} = require('../../controllers');
const { AirplaneMiddlewares }=require('../../middlewares');

const router =express.Router();
// Post Request
router.post('/',
    AirplaneMiddlewares.createValidateRequest,
    AirplaneController.createAirplane);

router.get('/',
    AirplaneController.getAirplanes);
   
router.get('/:id',
    AirplaneController.getAirplane);    
    

module.exports= router