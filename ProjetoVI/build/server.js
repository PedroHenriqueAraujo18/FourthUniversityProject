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
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const database_1 = require("./database");
class Server {
    constructor(app) {
        this.app = app;
        this.config(this.app);
        this.routes();
    }
    config(app) {
        const corsOptions = {
            origin: "http://localhost:8081"
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.post('/log', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('http://localhost:8080/logs', {
                    message: req.body.message
                });
                res.send(response.data);
            }
            catch (error) {
                res.status(500).send('Error logging data');
            }
        }));
        this.app.get('/logs', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get('http://localhost:8080/logs');
                res.send(response.data);
            }
            catch (error) {
                res.status(500).send('Error retrieving logs');
            }
        }));
        this.app.get('/logs/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`http://localhost:8080/logs/${req.params.id}`);
                res.send(response.data);
            }
            catch (error) {
                res.status(500).send('Error retrieving log');
            }
        }));
        // Adicionar uma rota para testar a conexão com o banco de dados
        this.app.get('/test-db', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield (0, database_1.createConnection)();
                const [rows] = yield connection.execute('SELECT 1 + 1 AS solution');
                yield (0, database_1.closeConnection)(connection);
                res.send(`Database connection test successful: ${JSON.stringify(rows)}`);
            }
            catch (error) {
                res.status(500).send('Database connection test failed');
            }
        }));
    }
}
exports.default = Server;
// A função principal para inicializar o servidor
const startServer = () => {
    const app = (0, express_1.default)();
    new Server(app);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
exports.startServer = startServer;
startServer();
