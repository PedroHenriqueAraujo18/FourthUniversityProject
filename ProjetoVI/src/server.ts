import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import { createConnection, closeConnection } from './database';

export default class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost:8081"
        };

        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
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

    public start(): void {
        const PORT = process.env.PORT || 4000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

// A função principal para inicializar o servidor
const startServer = () => {
    const server = new Server();
    server.start();
};

startServer();
export {startServer}