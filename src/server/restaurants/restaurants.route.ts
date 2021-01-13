/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import controller from './restaurants.controller';
import { verifyToken } from '../helpers/auth';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const router = Router();

router.get('/', controller.getRestaurantsFromDB);
router.post('/', verifyToken, controller.createNewRestaurant);
router.get('/:id', controller.findRestaurantByID);
router.patch('/:id', verifyToken, controller.updateRestaurant);

export default router;
