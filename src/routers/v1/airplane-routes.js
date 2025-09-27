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

/** Delete 
 * /:id
 * req.body: {}
*/
router.delete('/:id',
    AirplaneController.destroyAirplane);

/** PATCH */
router.patch("/:id",
    AirplaneController.updateAirplane);

module.exports= router