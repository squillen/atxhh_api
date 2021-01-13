/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as express from 'express';
import RestaurantsDAO from '../../db/dao/RestaurantsDAO';
import Restaurant from './restaurant.interface';

class RestaurantController {
  async getRestaurantsFromDB(_req: express.Request, res: express.Response) {
    try {
      const restaurants = await RestaurantsDAO.getRestaurantsFromDB();
      return res.json(restaurants);
    } catch (error) {
      return res.json({ error });
    }
  }

  async findRestaurantByID(req: express.Request, res: express.Response) {
    try {
      const { params: { id } } = req;
      const foundRestaurant = await RestaurantsDAO.findRestaurantByID(id);
      return res.json(foundRestaurant);
    } catch (error) {
      return res.json({ error });
    }
  }

  async createNewRestaurant(req: express.Request, res: express.Response) {
    try {
      const restaurant: Restaurant = req.body;
      const restaurantAlreadyExists = await RestaurantsDAO.findRestaurantByAddress(restaurant.address);
      if (restaurantAlreadyExists._id) throw new Error('A restaurant by that address already exists');
      else {
        const result = await RestaurantsDAO.createNewRestaurant(restaurant);
        res.json(result);
      }
    } catch (error) {
      res.send(error);
    }
  }

  async updateRestaurant(req: express.Request, res: express.Response) {
    try {
      const { params: { id }, body } = req;
      if (!id) throw Error('must include restaurant _id');
      const result = await RestaurantsDAO.updateRestaurant(id, body);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }

  //
}

export default new RestaurantController();
