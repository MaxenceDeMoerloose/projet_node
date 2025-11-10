const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


app.post("/api/password", (req, res) => {
    const { password } = req.body;

    if (password === "password") {
        // Génération d'un token
        const token = jwt.sign({ user: "admin" }, "password", { expiresIn: "1h" });
        res.json({ message: "Vous êtes connecté", token });
    } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
    }
});

// Servir le build React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Pour toutes les autres routes, renvoyer index.html de React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

module.exports = app;