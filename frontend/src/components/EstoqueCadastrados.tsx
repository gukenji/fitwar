import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  eraseSucessAlert,
  getEstoque,
  setOpenDeleteDialog,
  setOpenEditDialog,
} from "../store/features/estoqueSlice";
import { IAlimento } from "../interfaces/FoodInterfaces";
import {
  Stack,
  Box,
  Typography,
  Divider,
  Pagination,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EditNote, Delete, LocalDining } from "@mui/icons-material";
import { quickSort } from "../utils/quickSort";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import EditInventoryItem from "./EditInventoryItem";
import { IconButtonStyled } from "../styles/IconButtonStyled";
import DeleteItemFromInventory from "./DeleteItemFromInventory";
import AlertInput from "./AlertInput";

const MyInventory = () => {
  const my_inventory = useAppSelector((state) => state.inventory.food_list);
  const [sortedFreezer, setSortedFreezer] = useState<IFetchInventory[] | null>(
    null
  );
  const [currentFoods, setCurrentFoods] = useState<IFetchInventory[] | null>(
    null
  );
  const open_edit = useAppSelector((state) => state.inventory.open_edit);
  const open_delete = useAppSelector((state) => state.inventory.open_delete);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [foodsPerPage, setFoodsPerPage] = useState<number>(5);
  const isRefreshed = useAppSelector((state) => state.inventory.refreshed);
  const [food, setFood] = useState<IFetchInventory | null>(null);
  const success = useAppSelector((state) => state.inventory.success);
  const message_tab = useAppSelector((state) => state.inventory.tab);
  const success_message = useAppSelector(
    (state) => state.inventory.success_message
  );
  const error_message = useAppSelector(
    (state) => state.inventory.error_message
  );
  const request_type = useAppSelector((state) => state.inventory.request_type);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setIndex((prev) => (value - 1) * foodsPerPage);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFreezer = async () => {
      try {
        await dispatch(getEstoque()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isRefreshed ? fetchFreezer() : null;
  }, [isRefreshed, dispatch]);

  useEffect(() => {
    isRefreshed
      ? setSortedFreezer(quickSort(my_inventory as IFetchInventory[]))
      : null;
  }, [isRefreshed, my_inventory]);

  useEffect(() => {
    const selectedFoods = sortedFreezer?.slice(
      (page - 1) * foodsPerPage,
      page * foodsPerPage
    );
    if (selectedFoods !== undefined) {
      setCurrentFoods(selectedFoods);
    }
  }, [page, foodsPerPage, sortedFreezer]);

  const handleFoodsPerPage = (e: SelectChangeEvent<number>) => {
    (e.target.value as number) >= 1
      ? setFoodsPerPage((prev) => e.target.value as number)
      : null;
  };
  useEffect(() => {
    const new_page =
      foodsPerPage > 1
        ? Math.ceil(
            index % foodsPerPage == 0
              ? index / foodsPerPage + 1
              : index / foodsPerPage
          )
        : Math.ceil(index / foodsPerPage + 1);
    setPage((prev) => (new_page > 0 ? new_page : 1));
  }, [foodsPerPage, index]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(eraseSucessAlert());
    }, 6000);
    return () => clearTimeout(timer);
  }, [success, dispatch]);

  const calculateMacros = (input_quantity: number, food: IAlimento | null) => {
    const carboidratos: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.carboidratos}`
      : `0`;
    const gorduras: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.gorduras}`
      : `0`;
    const proteinas: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.proteinas}`
      : `0`;
    const calorias: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.calorias}`
      : `0`;
    const macros = {
      carboidratos: parseFloat(carboidratos).toFixed(2),
      gorduras: parseFloat(gorduras).toFixed(2),
      proteinas: parseFloat(proteinas).toFixed(2),
      calorias: parseFloat(calorias).toFixed(2),
    };
    return macros;
  };
  return (
    <>
      <Stack spacing={2}>
        {request_type == "DELETE" && message_tab == "INVENTORY" ? (
          <AlertInput
            result={success}
            successMessage={success_message}
            errorMessage={error_message}
          />
        ) : null}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontFamily: "VT323" }}>
              ALIMENTOS POR PÁGINA:
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                variant="standard"
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={foodsPerPage}
                onChange={handleFoodsPerPage}
                autoWidth
                sx={{ fontFamily: "VT323", fontSize: 20 }}
              >
                <MenuItem style={{ fontFamily: "VT323" }} value={1}>
                  1
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={2}>
                  2
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={5}>
                  5
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={10}>
                  10
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={15}>
                  15
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 18 }}
          >
            PÁGINA {page}
          </Typography>
        </Box>
        <Pagination
          sx={{ display: "flex", justifyContent: "flex-end" }}
          size="small"
          count={Math.ceil((sortedFreezer?.length as number) / foodsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
      {open_edit ? <EditInventoryItem food={food as IFetchInventory} /> : null}
      {open_delete ? (
        <DeleteItemFromInventory food={food as IFetchInventory} />
      ) : null}
      {currentFoods ? (
        currentFoods.map((props) => {
          return (
            <div key={Math.random()}>
              <Divider />
              <Box
                sx={{
                  p: 1,
                  borderLeft: 3,
                  borderColor: "green",
                  marginBottom: 0.5,
                  marginTop: 0.5,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    component={"span"}
                    variant="h6"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                  >
                    <span style={{ textDecoration: "underline dotted" }}>
                      ALIMENTO
                    </span>
                    : {props.food.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    component={"span"}
                    variant="h6"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                    display={props.food.brand ? "inherit" : "none"}
                  >
                    <span style={{ textDecoration: "underline dotted" }}>
                      MARCA
                    </span>
                    : {props.food.brand}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ fontSize: 18 }}
                >
                  <span style={{ textDecoration: "underline" }}>
                    DISPONIBILIDADE
                  </span>
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ display: "flex", gap: 10 }}>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component={"span"}
                      fontFamily={"VT323"}
                      fontSize={16}
                    >
                      PORÇÃO: {props.quantity} G /
                    </Typography>
                    <Typography
                      color="green"
                      variant="body2"
                      fontFamily={"VT323"}
                      fontSize={16}
                    >
                      {
                        calculateMacros(props.quantity as number, props.food)
                          .calorias
                      }
                      <span> KCAL</span>
                    </Typography>
                  </span>
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component={"span"}
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>PROTEÍNAS</span>
                      <span>
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .proteinas
                        }
                        G
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>CARBOÍDRATOS</span>
                      <span>
                        {" "}
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .carboidratos
                        }{" "}
                        G
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>GORDURA</span>
                      <span>
                        {" "}
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .gorduras
                        }
                        G
                      </span>
                    </Typography>
                  </span>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 3,
                    }}
                  >
                    <IconButtonStyled>
                      <LocalDining
                        sx={{
                          "&:hover, &:active": {
                            fontSize: 40,
                          },
                          "&:hover": {
                            md: {
                              boxShadow:
                                "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                              background: "#30e1b9",
                              color: "white",
                            },
                          },
                          "&:active": {
                            boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                            background: "#30e1b9",
                            color: "white",
                          },
                          borderRadius: 5,
                          padding: 0.5,
                          fontSize: 35,
                        }}
                      />
                    </IconButtonStyled>
                    <IconButtonStyled>
                      <EditNote
                        onClick={() => {
                          setFood((prev) => props);
                          dispatch(setOpenEditDialog());
                        }}
                        sx={{
                          "&:hover, &:active": {
                            fontSize: 40,
                          },
                          "&:hover": {
                            md: {
                              boxShadow:
                                "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                              background: "#9babb2",
                              color: "white",
                            },
                          },
                          "&:active": {
                            boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                            background: "#9babb2",
                            color: "white",
                          },
                          borderRadius: 5,
                          padding: 0.5,
                          fontSize: 35,
                        }}
                      />
                    </IconButtonStyled>
                    <IconButtonStyled>
                      <Delete
                        onClick={() => {
                          setFood((prev) => props);
                          dispatch(setOpenDeleteDialog());
                        }}
                        sx={{
                          "&:hover, &:active": {
                            fontSize: 40,
                          },
                          "&:hover": {
                            md: {
                              boxShadow:
                                "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                              background: "#f04f78",
                              color: "white",
                            },
                          },
                          "&:active": {
                            boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                            background: "#f04f78",
                            color: "white",
                          },
                          borderRadius: 5,
                          padding: 0.5,
                          fontSize: 35,
                        }}
                      />
                    </IconButtonStyled>
                  </Box>
                </Box>
              </Box>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default MyInventory;
