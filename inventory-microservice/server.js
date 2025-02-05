// server.js
const express = require('express');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB().catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log de peticiones HTTP

// Rutas
app.use('/api/inventory', inventoryRoutes);

// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
