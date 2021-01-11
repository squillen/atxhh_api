const { logInfo } = require('../../utils/logger/logger.util');
let restaurants: object;

module.exports = class RestaurantsDAO {
  static async injectDB(conn: object) {
    if (restaurants) return;
    try {
      const dbName = process.env.DB_NAME || 'development';
      restaurants = await conn.db(dbName).collection('restaurants');
      logInfo({ message: 'restaurantsDAO connected' });
    } catch (e) {
      console.error(`Unable to establish collection handles in restaurantsDAO: ${e}`);
    }
  }

  static async getRestaurantsFromDB(query: object = {}, queryOptions: object = {}) {
    let cursor;
    try {
      cursor = await restaurants.find(query, queryOptions);
    } catch (e) {
      console.error('Error in getRestaurantsFromDB()', e);
      return [];
    }
    return cursor.toArray();
  }
};
