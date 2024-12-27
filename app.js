require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const staticHandler = require('./handlers/static_handler');
const contactRoute = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3000;

// Middleware: Configurar CORS
const corsOptions = { origin: '*', methods: ['POST', 'GET'] };
app.use(cors(corsOptions));

// Middleware: Parseo de datos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cargar manejo de archivos estáticos
staticHandler(app);

// Rutas del formulario
app.use('/', contactRoute);

// (Opcional) Redirigir "/" a "index.html"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
