import * as express from 'express';
import * as bodyparser from 'body-parser';
import database from './db';
import Api from "./routes/api";
import Auth from "./routes/auth";

class App {
    public app: express.Application;
    private database: database;
    private api = new Api();
    private auth = new Auth();

    constructor() {
        this.app = express();
        this.middleware();
        this.database = new database();
        this.database.connect();
        this.routes();

    }

    middleware() {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/api', this.api.routes);
        this.app.use('/auth', this.auth.routes);
        this.app.route('/').get((req, res) => res.status(200).json({ rest: 'hello world' }));
    }
}

export default new App();