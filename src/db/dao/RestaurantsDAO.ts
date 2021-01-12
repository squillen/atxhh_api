const ObjectId = require('mongodb').ObjectId;
let restaurants: any;

export default class RestaurantsDAO {
  static async injectDB(conn: any) {
    if (restaurants) return;
    try {
      const dbName = process.env.DB_NAME || 'development';
      restaurants = await conn.db(dbName).collection('restaurants');
      console.info({ message: 'restaurantsDAO connected' });
    } catch (e) {
      console.error(`Unable to establish collection handles in restaurantsDAO: ${e}`);
    }
  }

  static async getRestaurantsFromDB(query: object = {}, queryOptions: object = {}) {
    try {
      const cursor = await restaurants.find(query, queryOptions);
      return cursor.toArray();
    } catch (e) {
      console.error('Error in getRestaurantsFromDB()', e);
      return [];
    }
  }

  static async findRestaurantByID(id: string) {
    try {
      const _id = ObjectId(id);
      return await restaurants.findOne({ _id });
    } catch (e) {
      console.error('Error in findRestaurantByID()', e);
      return null;
    }
  }

  static async findRestaurantByAddress(address: string) {
    try {
      return await restaurants.findOne({ address });
    } catch (e) {
      console.error('Error in findRestaurantByAddress()', e);
      return null;
    }
  }

  static async createNewRestaurant(newRestaurant: object) {
    try {
      return await restaurants.insertOne(newRestaurant);
    } catch (e) {
      console.error('Error in createNewRestaurant()', e);
      return null;
    }
  }

  static async updateRestaurant(id: string, update: object) {
    try {
      const _id = ObjectId(id);
      return await restaurants.updateOne({ _id }, { $set: update });
    } catch (e) {
      console.error('Error in createNewRestaurant()', e);
      return null;
    }
  }
};
