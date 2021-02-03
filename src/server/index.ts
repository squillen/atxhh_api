import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

// ROUTES
import restaurants from './restaurants/restaurants.route';

const app = express();
app.use(express.static('public'));
app.use(json({
  limit: '50mb',
}));

app.get('/', (req, res) => {
  res.send('server up!');
});

app.use('/api/restaurants', restaurants);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
