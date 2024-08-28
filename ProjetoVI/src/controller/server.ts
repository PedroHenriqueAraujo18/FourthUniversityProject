import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import axios from "axios";
import { createConnection, closeConnection } from '../repository/database';

export default class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
        this.config(this.app);
        this.routes();
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost:8081"
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        this.app.post('/log', async (req, res) => {
            try {
                const response = await axios.post('http://localhost:8080/logs', {
                    message: req.body.message
                });
                res.send(response.data);
            } catch (error) {
                res.status(500).send('Error logging data');
            }
        });

        this.app.get('/logs', async (req, res) => {
            try {
                const response = await axios.get('http://localhost:8080/logs');
                res.send(response.data);
            } catch (error) {
                res.status(500).send('Error retrieving logs');
            }
        });

        this.app.get('/logs/:id', async (req, res) => {
            try {
                const response = await axios.get(`http://localhost:8080/logs/${req.params.id}`);
                res.send(response.data);
            } catch (error) {
                res.status(500).send('Error retrieving log');
            }
        });

        // Adicionar uma rota para testar a conexão com o banco de dados
        this.app.get('/test-db', async (req, res) => {
            try {
                const connection = await createConnection();
                const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
                await closeConnection(connection);
                res.send(`Database connection test successful: ${JSON.stringify(rows)}`);
            } catch (error) {
                res.status(500).send('Database connection test failed');
            }
        });
    }
}

// A função principal para inicializar o servidor
const startServer = () => {
    const app: Application = express();
    new Server(app);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
export { startServer };
