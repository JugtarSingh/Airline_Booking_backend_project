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

app.listen(serverConfig.PORT, ()=>{
    console.log(`Successfully started the server on PORT:  ${serverConfig.PORT}`);
})