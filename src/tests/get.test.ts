import moxios from 'moxios';
import axios from 'axios';
import { RestaurantInterface } from '../server/restaurants/restaurant.interface';

describe('test GET requests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('gets all restaurants', async () => {
    try {
      const firstThreeIDs = ['5ffc8c8ac67f61a2a5ea00fe', '5ffca77dffbe6da06e01679c', '5ffcd00c160ae7c2caf9c804'];
      const result = await axios.get<RestaurantInterface[]>('http://localhost:5000/api/restaurants');
      const firstThreeIDsInResult = result?.data[2]?._id;
      expect(firstThreeIDsInResult).toBe(firstThreeIDs[2]);
    } catch (e) {
      console.error(e);
    }
  });
});
