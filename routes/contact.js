const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Ruta para enviar formulario
router.post('/submit-form', async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;

        // Validación manual
        const errors = [];
        if (!nombre || nombre.trim() === "") errors.push("El nombre es obligatorio.");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("El email no es válido.");
        if (!mensaje || mensaje.trim() === "") errors.push("El mensaje es obligatorio.");
        if (errors.length > 0) return res.status(400).json({ errors });

        // Configuración de transporte de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'Nuevo mensaje de contacto',
            text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensaje enviado con éxito.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al enviar el correo.' });
    }
});

module.exports = router;