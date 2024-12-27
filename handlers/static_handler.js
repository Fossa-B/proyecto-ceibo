const express = require('express');
const path = require('path');

const staticHandler = (app) => {
    // Middleware: Servir archivos estáticos
    app.use(express.static(path.join(__dirname, '../public')));
};

module.exports = staticHandler;