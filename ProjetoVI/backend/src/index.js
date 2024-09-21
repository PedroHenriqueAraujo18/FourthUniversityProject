const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');  // Certifique-se de que está importando o mysql2 corretamente

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configurar conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Seu usuário do MySQL
  password: 'watashi15',  // Sua senha do MySQL
  database: 'fullstore'  // O nome do banco de dados que você criou
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL com sucesso!');
  }
});

// Rota POST para registro de usuário
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Dados Recebidos:', { name, email, password });

  // Inserir usuário no banco de dados
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no MySQL:', err);
      res.status(500).send({ message: 'Erro ao registrar usuário no banco de dados.' });
    } else {
      res.status(201).send({ message: 'Usuário registrado com sucesso no banco de dados!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
