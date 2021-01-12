import * as express from 'express';
import * as bodyParser from 'body-parser';

// ROUTES
import restaurants from './restaurants/restaurants.route';

const app = express();
app.use(express.static("public"))
app.use(bodyParser.json({
  limit: '50mb',
  verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
  }
}));

app.get("/", function (req, res) {
  res.send('server up!')
})

app.use('/api/restaurants', restaurants)

export { app };