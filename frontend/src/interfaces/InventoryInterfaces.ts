import { IGetFood } from "./FoodInterfaces";

export interface IIncludeToInventory {
  token: string | undefined;
  food: number;
  quantity: number;
}
export interface IUpdateToInventory extends IIncludeToInventory {
  id: number;
}

export interface IExcludeFromInventory {
  id: number;
  token: string | undefined;
}

export interface IInventoryStatus {
  success: boolean | null;
  request_type: "POST" | "UPDATE" | "DELETE" | "GET" | null;
  success_message: string;
  error_message: string;
  tab: "INCLUDE" | "INVENTORY" | null;
}

export interface IInventoryDialog {
  open_edit: boolean;
  open_delete: boolean;
}

export interface IGetInventory {
  food_list: IFetchInventory[] | null;
  error: string | null;
  refreshed: boolean;
}
export interface IInputQuantity {
  food: IGetFood | null;
  value: number | string;
}

export interface IFetchInventory {
  food: IGetFood;
  id: number;
  quantity: number;
}
