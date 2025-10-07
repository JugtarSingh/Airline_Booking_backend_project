const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filters , sort){
        console.log(filters);   
        const flights = await Flight.findAll({
            where : filters,
            order : sort
        })
        return flights;
    }
}

module.exports = FlightRepository;