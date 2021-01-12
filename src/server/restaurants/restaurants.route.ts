const { Router } = require('express');
import controller from './restaurants.controller';
import { verifyToken } from '../helpers/auth' 

const router = new Router();

router.get('/', controller.getRestaurantsFromDB);
router.post('/', verifyToken, controller.createNewRestaurant);
router.get('/:id', controller.findRestaurantByID);
router.patch('/:id', verifyToken, controller.updateRestaurant);

export default router;
