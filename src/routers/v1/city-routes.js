const express = require('express');
const {CityController} = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/',
    CityMiddlewares.createValidateRequest,
    CityController.createCity);
/**Delete
 * /:id
 * req.body : {}
 */
router.delete('/:id',
    CityController.destroyCity);

/**PATCH
 * /:id
 * req.body {key:value ,......}
 */
router.patch('/:id',
    CityController.updateCity);

module.exports = router;