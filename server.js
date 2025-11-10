// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// CORS : autoriser uniquement ton frontend Hostinger
app.use(cors({
    origin: "https://linen-wallaby-794699.hostingersite.com", // ton frontend
    methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"]
}));

app.use(express.json());

// Secret pour JWT
const SECRET = "password";

// Endpoint pour vérifier le mot de passe et renvoyer un token
app.post("/api/password", (req, res) => {
    const { password } = req.body;

    if (password === "password") {
        const token = jwt.sign({ user: "admin" }, SECRET, { expiresIn: "1h" });
        res.json({ message: "Vous êtes connecté", token });
    } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
    }
});

// Servir le build React si tu veux que Node serve aussi ton frontend
// Assure-toi que ton build React est copié dans ../frontend/build
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Port pour Render (process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;