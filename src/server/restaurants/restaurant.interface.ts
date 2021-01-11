interface Restaurant {
  name: string;
  description: string;
  happy_hour_days: string;
  start_time: string;
  end_time: string;
  percent_off_drinks: number;
  percent_off_food: number;
  coordinates: {};
  address: string;
}
 
export default Restaurant;