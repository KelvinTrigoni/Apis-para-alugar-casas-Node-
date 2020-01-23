import express from 'express';
import mongo from 'mongoose';
import cors from 'cors';
import routes from './routes';
import path from 'path';


class App {
    constructor() {
        this.server = express();

        mongo.connect('String de conexão', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use('/image', express.static(path.resolve(__dirname, '..', '..', 'image')))
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;