const CrudRepository = require('./crud-repository');
const { Flight , Airplane , Airport , City} = require('../models');
const { Sequelize } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filters , sort){
        const flights = await Flight.findAll({
            where : filters,
            order : sort,
            include:[
                {
                model: Airplane,
                required:true,
                as: 'airplaneDetail'
                },
                {
                    model:Airport,
                    required:true,
                    as: 'departureAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=', Sequelize.col('departureAirport.code'))
                    },
                    include:{
                        model : City,
                        required: true,
                    }

                },
                {
                    model:Airport,
                    required:true,
                    as: 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=', Sequelize.col('arrivalAirport.code'))
                    },
                    include : {
                        model: City,
                        required: true,
                    }
                }
            ]
        })
        return flights;
    }
}

module.exports = FlightRepository;