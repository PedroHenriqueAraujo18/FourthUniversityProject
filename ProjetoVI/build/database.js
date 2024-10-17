"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.createConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
// Configurações do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'watashi15', // Substitua pela sua senha do MySQL
    database: 'testdb' // Substitua pelo nome do seu banco de dados
};
// Função para criar uma conexão
const createConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(dbConfig);
        console.log('Conectado ao banco de dados MySQL!');
        return connection;
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
});
exports.createConnection = createConnection;
// Função para fechar a conexão
const closeConnection = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection.end();
        console.log('Conexão com o banco de dados encerrada!');
    }
    catch (error) {
        console.error('Erro ao encerrar a conexão com o banco de dados:', error);
        throw error;
    }
});
exports.closeConnection = closeConnection;
