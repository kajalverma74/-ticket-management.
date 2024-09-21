const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const Ticket = require('./models/ticket');

const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 

const PORT = process.env.PORT || 4000;

const ticketRoutes = require('./routes/ticketroutes');
app.use('/tickets', ticketRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
