import {
  Box,
  TableContainer,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { IGetFood } from "../interfaces/FoodInterfaces";

export const NutritionalTable = (props: {
  quantity: number | string;
  food: IGetFood;
}) => {
  const { quantity, food } = props;
  const calculateMacros = (input_quantity: number, food: IGetFood | null) => {
    const carbs: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.carbs}`
      : `0`;
    const fat: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.fat}`
      : `0`;
    const protein: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.protein}`
      : `0`;
    const kcal: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.kcal}`
      : `0`;
    const macros = {
      carbs: parseFloat(carbs).toFixed(2),
      fat: parseFloat(fat).toFixed(2),
      protein: parseFloat(protein).toFixed(2),
      kcal: parseFloat(kcal).toFixed(2),
    };
    return macros;
  };

  return (
    <Box sx={{ width: "auto" }}>
      <TableContainer component={Paper}>
        <Typography
          sx={{
            fontFamily: "VT323",
            fontSize: 23,
            textAlign: "center",
            borderBottom: 1,
            margin: 1,
          }}
        >
          INFORMAÇÃO NUTRICIONAL
        </Typography>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0, width: "100px" }}
                align="center"
              ></TableCell>
              <TableCell
                sx={{
                  fontFamily: "VT323",
                  padding: 0,
                  fontSize: 16,
                  width: "70px",
                }}
                align="center"
              >
                {quantity ? quantity : 0} G
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "VT323",
                  padding: 0,
                  fontSize: 16,
                  width: "70px",
                }}
                align="center"
              >
                100 G
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "VT323",
                  padding: 0,
                  paddingLeft: 1,
                  fontSize: 15,
                }}
                align="left"
              >
                CALORIAS (KCAL)
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(quantity as number, food).kcal}
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(100, food).kcal}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "VT323",
                  padding: 0,
                  fontSize: 15,
                  paddingLeft: 1,
                }}
                align="left"
              >
                CARBOÍDRATOS (G)
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(quantity as number, food).carbs}
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(100, food).carbs}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "VT323",
                  padding: 0,
                  fontSize: 15,
                  paddingLeft: 1,
                }}
                align="left"
              >
                PROTEÍNAS (G)
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(quantity as number, food).protein}
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(100, food).protein}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "VT323",
                  padding: 0,
                  fontSize: 15,
                  paddingLeft: 1,
                }}
                align="left"
              >
                GORDURAS (G)
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(quantity as number, food).fat}
              </TableCell>
              <TableCell
                sx={{ fontFamily: "VT323", padding: 0 }}
                align="center"
              >
                {calculateMacros(100, food).fat}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
