const CrudRepository = require('./crud-repository');
const { Flight , Airplane , Airport , City} = require('../models');
const { Sequelize } = require('sequelize');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');

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

    async updateRemainingSeats(flightId , seats , desc=1){
        try {
                const transaction = await db.sequelize.transaction();
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);
            if(parseInt(desc)){
                await flight.decrement('totalSeats' , {by: seats} , {transaction: transaction});
            }
            else{
                await flight.increment('totalSeats' , {by: seats}, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
        }
}

module.exports = FlightRepository;