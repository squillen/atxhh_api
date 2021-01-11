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
let restaurants;
// interface Connection {
//   db?: string
// }
module.exports = class RestaurantsDAO {
    static injectDB(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (restaurants)
                return;
            try {
                const dbName = process.env.DB_NAME || 'development';
                restaurants = yield conn.db(dbName).collection('restaurants');
                console.info({ message: 'restaurantsDAO connected' });
            }
            catch (e) {
                console.error(`Unable to establish collection handles in restaurantsDAO: ${e}`);
            }
        });
    }
    static getRestaurantsFromDB(query = {}, queryOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let cursor;
            try {
                cursor = yield restaurants.find(query, queryOptions);
            }
            catch (e) {
                console.error('Error in getRestaurantsFromDB()', e);
                return [];
            }
            return cursor.toArray();
        });
    }
};
//# sourceMappingURL=RestaurantsDAO.js.map