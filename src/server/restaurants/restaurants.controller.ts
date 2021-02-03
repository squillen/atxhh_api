import { RequestHandler } from 'express';
import RestaurantsDAO from '../../db/dao/RestaurantsDAO';
import { RestaurantInterface } from './restaurant.interface';

export const getRestaurantsFromDB: RequestHandler = async (req, res) => {
  try {
    const restaurants = await RestaurantsDAO.getRestaurantsFromDB();
    res.json(restaurants);
  } catch (error) {
    res.json({ error: error as Error });
  }
};

export const findRestaurantByID: RequestHandler = async (req, res) => {
  try {
    const { params: { id } } = req;
    const foundRestaurant = await RestaurantsDAO.findRestaurantByID(id);
    res.json(foundRestaurant);
  } catch (error) {
    res.json({ error: error as Error });
  }
};

export const createNewRestaurant: RequestHandler = async (req, res) => {
  try {
    const restaurant = req.body as RestaurantInterface;
    const restaurantAlreadyExists = await RestaurantsDAO.findRestaurantByAddress(restaurant.address) as RestaurantInterface;
    if (restaurantAlreadyExists._id) throw new Error('A restaurant by that address already exists');
    else {
      const result = await RestaurantsDAO.createNewRestaurant(restaurant);
      res.json(result);
    }
  } catch (error) {
    res.json({ error: error as Error });
  }
};

export const updateRestaurant: RequestHandler = async (req, res) => {
  try {
    const { params: { id } } = req;
    const update = (req.body as RestaurantInterface);
    console.log('update', update);
    if (!id) throw Error('must include restaurant _id');
    const result = await RestaurantsDAO.updateRestaurant(id, update);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
