purchase-service/       # Microservicio de compras
│── src/               
│   ├── config/        # Configuración de la base de datos y variables de entorno
│   │   ├── db.js
│   │   ├── dotenv.js
│   ├── controllers/   # Controladores para manejar las solicitudes HTTP
│   │   ├── purchaseController.js
│   ├── models/        # Modelos de datos con Mongoose
│   │   ├── PurchaseModel.js
│   ├── routes/        # Rutas de la API
│   │   ├── purchaseRoutes.js
│   ├── services/      # Lógica de negocio
│   │   ├── purchaseService.js
│   ├── validations/   # Esquemas de validación con Joi
│   │   ├── purchaseValidation.js
│   ├── utils/         # Utilidades comunes (logs, errores, helpers)
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   ├── app.js         # Configuración del servidor Express
│── .env               # Variables de entorno
│── package.json       # Dependencias y configuración de Node.js
│── server.js          # Punto de entrada del servicio
│── README.md          # Documentación del microservicio



Explicación de cada carpeta:
config/ → Configuración de la base de datos y variables de entorno.
controllers/ → Controladores que manejan las solicitudes HTTP.
models/ → Esquemas de Mongoose para definir las compras.
routes/ → Definición de las rutas de la API.
services/ → Lógica de negocio, como la actualización del inventario al recibir una compra.
validations/ → Validaciones con Joi para asegurar la integridad de los datos.
utils/ → Funciones auxiliares como logs y manejo de errores.
server.js → Punto de entrada del microservicio.
