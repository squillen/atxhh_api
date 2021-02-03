import { ObjectId } from 'mongodb';

export interface RestaurantInterface {
  _id: ObjectId;
  name: string;
  description: string[];
  happyHourDays: string;
  startTime: string;
  endTime: string;
  percentOffDrinks: number;
  percentOffFood: number;
  coordinates: Record<string, unknown>;
  address: string;
}
