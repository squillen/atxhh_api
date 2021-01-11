require('dotenv').config();

const { MongoClient } = require('mongodb');
import {AddressInfo} from 'net'
const {app} = require('../app');
const RestaurantsDAO = require('./dao/RestaurantsDAO');
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/atxhh-dev';

const client = new MongoClient(mongoURI, {
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
    const server = app.listen(5000, '0.0.0.0', () => {
      const {port, address} = server.address() as AddressInfo;
      console.log(`Server listening on: http://${address}:${port}`);
  });
  } catch (e) {
    console.error({ message: e.stack });
  } finally {
    // await client.close();
  }
}

connect().catch(console.error);
