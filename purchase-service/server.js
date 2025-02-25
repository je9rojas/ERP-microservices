require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const purchaseRoutes = require('./src/routes/purchaseRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Habilitar CORS para el frontend
app.use(morgan('dev')); // Registro de solicitudes HTTP en la terminal

// Rutas
app.use('/api/purchases', purchaseRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Purchase Service running on port ${PORT}`));
