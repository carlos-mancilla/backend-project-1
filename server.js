const express = require('express');
const app = express();
require('dotenv').config();
const { userRoutes }  = require('./routes');
const { logger } = require('./utils');
const cors = require('cors');

const PORT = process.env.NODE_PORT;
var corsOpt = {
    origin: '*', 
    optionsSuccessStatus: 200 
}

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));