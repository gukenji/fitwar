import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useAppSelector } from "../store/store";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import { IAlimento } from "../interfaces/FoodInterfaces";

const EstoqueResumo = () => {
  const my_inventory = useAppSelector<IFetchInventory[] | null>(
    (state) => state.inventory.food_list
  );
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const calculateMacros = (item: IFetchInventory | null) => {
    const { quantity, food } = item as IFetchInventory;
    const carbs: string = food
      ? `${(quantity / +food?.portion_size) * +food?.carbs}`
      : `0`;
    const fat: string = food
      ? `${(quantity / +food?.portion_size) * +food?.fat}`
      : `0`;
    const protein: string = food
      ? `${(quantity / +food?.portion_size) * +food?.protein}`
      : `0`;
    const kcal: string = food
      ? `${(quantity / +food?.portion_size) * +food?.kcal}`
      : `0`;
    const macros = {
      carbs: parseFloat(carbs).toFixed(2),
      fat: parseFloat(fat).toFixed(2),
      protein: parseFloat(protein).toFixed(2),
      kcal: parseFloat(kcal).toFixed(2),
    };
    return macros;
  };

  useEffect(() => {
    my_inventory?.map((item) => {
      setCarbs((prev) => prev + parseFloat(calculateMacros(item).carbs));
      setProtein((prev) => prev + parseFloat(calculateMacros(item).protein));
      setFat((prev) => prev + parseFloat(calculateMacros(item).fat));
    });
  }, []);

  const data = [
    ["MACRO", "QUANTITY"],
    ["CARBOIDRATOS", carbs],
    ["PROTEÍNAS", protein],
    ["GORDURAS", fat],
  ];
  const options = {
    title: `RESUMO DOS MACRONUTRIENTES \nDISPONÍVEIS`,
    position: "center",
    titleTextStyle: {
      bold: false,
      fontSize: 22,
    },
    pieSliceText: "value-and-percentage",
    fontName: "VT323",
    chartArea: { left: 10, right: 0 },
    is3D: true,
    pieSliceTextStyle: { fontSize: 14 },
    tooltip: {
      textStyle: {
        fontSize: 15,
      },
    },
    legend: {
      textStyle: {
        fontSize: 15,
      },
    },
  };

  return (
    <Box>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </Box>
  );
};

export default EstoqueResumo;
