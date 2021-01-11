import express from 'express';
import jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';
import tenants from './helpers/tenants';

// ROUTES
import restaurants from '../server/restaurants/restaurants.route';

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use('/restaurants', restaurants)

export { app };