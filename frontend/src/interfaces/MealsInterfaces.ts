export interface IMeals {
  id?: number | null;
  name?: string | null;
  user?: number | null;
  icon: string;
}

export interface IMealsList {
  meal_list: IMeals[] | null;
  error: string | null;
  refreshed: boolean;
}

export interface ICreateMeal {
  name: string;
  token: string;
  icon: string;
}
