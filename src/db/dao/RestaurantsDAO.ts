import {
  Collection, MongoClient, ObjectId,
} from 'mongodb';
import { RestaurantInterface } from '../../server/restaurants/restaurant.interface';

let restaurants: Collection<RestaurantInterface>;

export default class RestaurantsDAO {
  static injectDB(conn: MongoClient): void {
    if (restaurants) return;
    try {
      const dbName: string = process.env.DB_NAME || 'development';
      restaurants = conn.db(dbName).collection('restaurants');
      console.info({ message: 'restaurantsDAO connected' });
    } catch (e) {
      console.error('Unable to establish collection handles in restaurantsDAO');
    }
  }

  static async getRestaurantsFromDB(): Promise<RestaurantInterface[]> {
    try {
      const cursor = restaurants.find();
      return cursor.toArray();
    } catch (e) {
      console.error('Error in getRestaurantsFromDB()', e);
      return [];
    }
  }

  static async findRestaurantByID(id: string): Promise<RestaurantInterface | null> {
    try {
      const _id = new ObjectId(id);
      return await restaurants.findOne({ _id });
    } catch (e) {
      console.error('Error in findRestaurantByID()', e);
      return null;
    }
  }

  static async findRestaurantByAddress(address: string): Promise<RestaurantInterface | null> {
    try {
      return await restaurants.findOne({ address });
    } catch (e) {
      console.error('Error in findRestaurantByAddress()', e);
      return null;
    }
  }

  static async createNewRestaurant(newRestaurant: RestaurantInterface): Promise<unknown> {
    try {
      return await restaurants.insertOne(newRestaurant);
    } catch (e) {
      console.error('Error in createNewRestaurant()', e);
      return null;
    }
  }

  static async updateRestaurant(id: string, update: RestaurantInterface): Promise<unknown> {
    try {
      const _id = new ObjectId(id);
      return await restaurants.updateOne({ _id }, { $set: update });
    } catch (e) {
      console.error('Error in createNewRestaurant()', e);
      return null;
    }
  }
}
