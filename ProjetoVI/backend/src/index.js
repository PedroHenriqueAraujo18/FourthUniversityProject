const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');  // Certifique-se de que está importando o mysql2 corretamente
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
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

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor!');
});
// Rota de cadastro


// Rota POST para cadastrar produto
app.post('/add-product', upload.single('file'), (req, res) => {
  const { codigo, nome, descricao, precoFabrica, precoVenda, marca, dataCompra } = req.body;

  // Verifique se todos os campos necessários foram enviados
  if (!codigo || !nome || !descricao || !precoFabrica || !precoVenda || !marca || !dataCompra) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  // Simulação de uma query SQL para salvar o produto no banco de dados
  const query = `INSERT INTO produtos (codigo, nome, descricao, precoFabrica, precoVenda, marca, dataCompra) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // Exemplo de conexão ao banco de dados e execução da query
  connection.query(query, [codigo, nome, descricao, precoFabrica, precoVenda, marca, dataCompra], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o produto no banco de dados:', err);
      return res.status(500).send({ message: 'Erro ao cadastrar o produto no banco de dados.' });
    }

    res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
  });
});

// Rota POST para registro de usuário
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  console.log('Dados Recebidos:', { name, email, password });

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  // Verifique se a tabela e as colunas estão corretas no banco de dados
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  
  connection.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no MySQL:', err);
      res.status(500).send({ message: 'Erro ao registrar usuário no banco de dados.' });
    } else {
      res.status(201).send({ message: 'Usuário registrado com sucesso!' });
    }
  });
});
app.get('/Estoque', (req, res) => {
  const query = 'SELECT * FROM produtos';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos no banco de dados:', err);
      return res.status(500).send({ message: 'Erro ao buscar produtos no banco de dados.' });
    }

    res.status(200).json(results); // Retorna os produtos como JSON
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar se o email e a senha foram enviados
  if (!email || !password) {
    return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
  }

  // Query para verificar se o usuário existe
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).send({ message: 'Erro ao consultar o banco de dados.' });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Credenciais inválidas. Tente novamente.' });
    }

    const user = results[0];

    // Comparar a senha enviada com a senha no banco de dados
    if (password === user.password) {
      // Senha correta, login bem-sucedido
      return res.status(200).send({ success: true, message: 'Login bem-sucedido!' });
    } else {
      // Senha incorreta
      return res.status(401).send({ message: 'Credenciais inválidas. Tente novamente.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
