/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AddressInfo } from 'net';
import mongo, { MongoClient } from 'mongodb';
import app from '../server';
import RestaurantsDAO from './dao/RestaurantsDAO';

require('dotenv').config();

const mongoURI: string = process.env.DB_URI || 'mongodb://localhost:27017/atxhh-dev';
const appPort = (process.env.PORT || 5000);
const client: mongo.MongoClient = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
  connectTimeoutMS: 3000,
  keepAlive: 1,
});

async function connect() {
  try {
    await client.connect();
    const connections = [
      RestaurantsDAO.injectDB(client),
    ];
    await Promise.all(connections);
    const server = app.listen(appPort as number, '0.0.0.0', () => {
      const { port, address } = server.address() as AddressInfo;
      console.log(`Server listening on: http://${address}:${port}`);
    });
  } catch (e) {
    console.error({ message: e.stack });
  }
}

connect().catch(console.error);
