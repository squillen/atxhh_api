import * as express from 'express';
const { Router } = require('express');
import controller from './restaurants.controller';
import { verifyToken } from '../helpers/auth' 

const router = new Router();

function verify(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { authorization, issuer } = req.headers;
  if (authorization) {
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];
    if (!bearerToken) throw new Error('Format token as \"Bearer <token>\"');
    const { authorized, error } = verifyToken(bearerToken as string, issuer as string)
    if (authorized) next()
    else throw new Error(error)
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/', controller.getRestaurantsFromDB);
router.post('/', verify, controller.createNewRestaurant);
router.get('/:id', controller.findRestaurant);
router.patch('/:id', controller.updateRestaurant);

export default router;
