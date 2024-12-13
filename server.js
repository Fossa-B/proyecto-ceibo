require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Server-side validation
    let errors = [];
    if (!nombre || nombre.trim() === "") {
        errors.push("Nombre es requerido.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push("Email no es válido.");
    }
    if (!mensaje || mensaje.trim() === "") {
        errors.push("Mensaje es requerido.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Send email if validation passes
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or another service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Email to receive the form
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al enviar el correo.' });
        }
        res.status(200).json({ message: 'Mensaje enviado con éxito.' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});