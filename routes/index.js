const express = require('express');
const router = express.Router();
const path = require('path');

// Rota para a home
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

// Rota para a página sobre
router.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'sobre.html'));
});

// Rota para a página de contato
router.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contato.html'));
});

// Rota para a página de projetos
router.get('/projetos', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'projetos.html'));
});

module.exports = router;
