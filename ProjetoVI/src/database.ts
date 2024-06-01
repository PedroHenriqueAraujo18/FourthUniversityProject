import mysql from 'mysql2/promise';

// Configurações do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'watashi15', // Substitua pela sua senha do MySQL
  database: 'testdb' // Substitua pelo nome do seu banco de dados
};

// Função para criar uma conexão
export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conectado ao banco de dados MySQL!');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

// Função para fechar a conexão
export const closeConnection = async (connection: mysql.Connection) => {
  try {
    await connection.end();
    console.log('Conexão com o banco de dados encerrada!');
  } catch (error) {
    console.error('Erro ao encerrar a conexão com o banco de dados:', error);
    throw error;
  }
};
