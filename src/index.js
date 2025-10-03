const express = require('express');
const apiRoutes = require('./routers');
const { serverConfig , logger } = require('./config');
const multer = require('multer');

const upload = multer();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload.none());


app.use('/api',apiRoutes);

app.listen(serverConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT:  ${serverConfig.PORT}`);

    //Bad code alert
    // const {City,Airport} = require('./models');
    // const bengaluru = await City.findByPk(1);
    // console.log(bengaluru);

    // const airport = await Airport.create({
    //     name:'Kempegowda Airport',
    //     cityId : 1,
    //     code: 'BLR'
    // })
    // console.log(airport);

    // const airport = await Airport.create({
    //     name : 'Huballi',
    //     code: 'HBL',
    //     cityId: 1
    // })
    // console.log(airport);
    // const airportInBlr = await bengaluru.getAirports();
    // console.log(airportInBlr);

    // const Huballi = await Airport.findByPk(3);
    // console.log(Huballi);

    // await bengaluru.removeAirport(Huballi);

    // await City.destroy({
    //     where : {
    //         id :1
    //     }
    // })

})