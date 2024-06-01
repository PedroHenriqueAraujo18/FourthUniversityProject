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
const database_1 = require("./database");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const corsOptions = {
            origin: "http://localhost:8081"
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
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
    start() {
        const PORT = process.env.PORT || 4000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}
exports.default = Server;
// A função principal para inicializar o servidor
const startServer = () => {
    const server = new Server();
    server.start();
};
exports.startServer = startServer;
startServer();
