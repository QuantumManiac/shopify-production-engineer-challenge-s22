const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./helpers/dbInit');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Init DB
sequelize.sync();

// Get CRUD routes
app.use('/api', require('./routes/create'));
app.use('/api', require('./routes/read'));
app.use('/api', require('./routes/update'));
app.use('/api', require('./routes/remove'));

// Serve HTML Page
app.get('*', (req, res) => {
  res.render(path.resolve(__dirname, './public/index.html'));
});

app.listen(3000);
