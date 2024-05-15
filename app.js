const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cpf = require('cpf');
const validator = require('validator');

// Configuração para usar o bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// CSS para estilizar o formulário
const css = `
*{
    margin: 0;
    padding: 0;  
}
body{
    font-family: Arial, sans-serif;
    background-color: #ffffff; /* branco */
    display: flex;
    justify-content: center;
    align-items: center;
}

.container{
    background-color: #f0f8ff; /* azul claro */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
}

h1{
    text-align: center;
    margin-bottom: 20px;
    color: #000000; /* preto */
}

form{
    display: flex;
    flex-direction: column;
}

label{
    margin-bottom: 5px;
    color: #000000; /* preto */
}

input{
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc; /* cinza claro */
}

button{
    padding: 10px;
    margin-top: 10px;
    background-color: #007bff; /* azul */
    color: #ffffff; /* branco */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover{
    background-color: #0056b3; /* azul mais escuro */
}
`;

// Rota para exibir o formulário de cadastro de cliente
app.get('/', (req, res) => {
    res.send(`
        <head>
            <style>${css}</style>
        </head>
        <body>
            <div class="container">
                <h1>Cadastro de Cliente</h1>
                <form action="/cadastro" method="post">
                    <label for="nome">Nome:</label><br>
                    <input type="text" id="nome" name="nome" required><br>
                    <label for="cpf">CPF:</label><br>
                    <input type="text" id="cpf" name="cpf" required><br>
                    <label for="endereco">Endereço:</label><br>
                    <input type="text" id="endereco" name="endereco" required><br>
                    <label for="cidade">Cidade:</label><br>
                    <input type="text" id="cidade" name="cidade" required><br>
                    <label for="email">E-mail:</label><br>
                    <input type="email" id="email" name="email" required><br>
                    <label for="telefone">Telefone:</label><br>
                    <input type="tel" id="telefone" name="telefone" required><br>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </body>
    `);
});

// Rota para processar os dados do formulário
app.post('/cadastro', (req, res) => {
    const { nome, cpf: cpfInput, endereco, cidade, email, telefone } = req.body;

    // Validação do CPF
    if (!cpf.isValid(cpfInput)) {
        return res.status(400).send('CPF inválido.');
    }

    // Validação do email
    if (!validator.isEmail(email)) {
        return res.status(400).send('E-mail inválido.');
    }

    res.send(`
        <h1>Dados Recebidos</h1>
        <p>Nome: ${nome}</p>
        <p>CPF: ${cpfInput}</p>
        <p>Endereço: ${endereco}</p>
        <p>Cidade: ${cidade}</p>
        <p>E-mail: ${email}</p>
        <p>Telefone: ${telefone}</p>
        <a href="/">Voltar</a>
    `);
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
