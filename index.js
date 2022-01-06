const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./helpers/dbInit');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Init DB
sequelize.sync();

app.use((req, res, next) => {
  console.log(req.method);
  next(); // this will invoke next middleware function
});

// Get CRUD routes
app.use('/api', require('./routes/create'));
app.use('/api/:id', require('./routes/read'));
app.use('/api/:id', require('./routes/update'));
app.use('/api/:id', require('./routes/delete'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(3000);
