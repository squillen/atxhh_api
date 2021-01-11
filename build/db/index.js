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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { app } = require('../app');
const RestaurantsDAO = require('./dao/RestaurantsDAO');
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/atxhh-dev';
const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 50,
    connectTimeoutMS: 3000,
    keepAlive: 1,
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const connections = [
                RestaurantsDAO.injectDB(client),
            ];
            yield Promise.all(connections);
            const server = app.listen(5000, '0.0.0.0', () => {
                const { port, address } = server.address();
                console.log(`Server listening on: http://${address}:${port}`);
            });
        }
        catch (e) {
            console.error({ message: e.stack });
        }
        finally {
            // await client.close();
        }
    });
}
connect().catch(console.error);
//# sourceMappingURL=index.js.map