const express = require('express');

const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares');
const router = express.Router();

/**
 * POST : /airports 
 * req-body {name: 'IGI', cityId: 5, code: 'DEL'}
 */
router.post('/',AirportMiddlewares.createValidationRequest ,AirportController.createAirport)

router.get('/',
    AirportController.getAirports
)

router.get('/:id',
    AirportController.getAirport
)

router.delete('/:id',
    AirportController.destroyAirport
);

router.patch('/:id',
    AirportController.updateAirport
);
module.exports = router;