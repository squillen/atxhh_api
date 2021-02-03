import { AddressInfo } from 'net';
import mongo from 'mongodb';
import dotenv from 'dotenv';
import app from '../server';
import RestaurantsDAO from './dao/RestaurantsDAO';

dotenv.config({ path: `${__dirname}/.env` });

const mongoURI: string = process.env.DB_URI || 'mongodb://localhost:27017/atxhh-dev';
const appPort = process.env.PORT || 5000;
const client: mongo.MongoClient = new mongo.MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  keepAlive: true,
});

async function connect(): Promise<void> {
  try {
    await client.connect();
    const connections = [RestaurantsDAO.injectDB(client)];
    await Promise.all(connections);
    let port: number;
    let address: string;
    const server = app.listen(appPort as number, '0.0.0.0', () => {
      ({ port, address } = server.address() as AddressInfo);
      const url = `http://${address}:${port}`;
      console.log(`Server listening on: ${url}`);
    });
  } catch (e) {
    console.error({ message: (e as Error).stack });
  }
}

connect().catch(console.error);

export default connect;
