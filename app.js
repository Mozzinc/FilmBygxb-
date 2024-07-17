const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Importar middleware
const logger = require('./middlewares/logger');

// Usar o middleware de logger
app.use(logger);

// Configurar o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'PUBLIC')));

// Configurar body-parser para lidar com dados JSON
app.use(bodyParser.json());

// Importar e usar as rotas
const routes = require('./routes');
app.use(routes);

// Configurar o Nodemailer
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'JM.Developers@hotmail.com',
        pass: 'eadjb;ekdjb--232324knskAefvs103..', // Troque pela senha do seu e-mail
    },
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;
    const mailOptions = {
        from: 'JM.Developers@hotmail.com', // O remetente deve ser o mesmo que está autenticando
        to: 'JM.Developers@hotmail.com',
        subject: 'Novo Contato do Site',
        text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`,
        replyTo: email, // Define o e-mail de resposta como o e-mail do usuário
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar e-mail');
        }
        console.log('Email enviado: ' + info.response);
        res.status(200).send('E-mail enviado com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
