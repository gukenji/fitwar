import { IFetchInventory } from "../interfaces/InventoryInterfaces";

export function quickSort(arr: IFetchInventory[]): IFetchInventory[] | null {
  if (arr == null) {
    return null;
  }
  if (arr.length <= 1) {
    return arr;
  }

  const pivot: IFetchInventory = arr[arr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const current_name = arr[i].food.name;
    const pivot_name = pivot.food.name;
    if (
      pivot_name != undefined &&
      current_name != undefined &&
      current_name < pivot_name
    ) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...(<[]>quickSort(leftArr)), pivot, ...(<[]>quickSort(rightArr))];
}
