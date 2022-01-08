const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./helpers/dbInit');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Init DB
sequelize.sync();

// API Routes
app.use('/api', require('./routes/create'));
app.use('/api', require('./routes/read'));
app.use('/api', require('./routes/update'));
app.use('/api', require('./routes/remove'));
app.use('/api', require('./routes/export'));

app.listen(3000);
/* eslint-disable-next-line */
console.log('Listening on port 3000: http://localhost:3000');
