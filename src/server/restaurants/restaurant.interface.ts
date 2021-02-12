export interface RestaurantInterface {
  id: string
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
