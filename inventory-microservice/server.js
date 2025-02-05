// server.js
const express = require('express');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/inventory', inventoryRoutes);

// Conectar a MongoDB
connectDB();

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));