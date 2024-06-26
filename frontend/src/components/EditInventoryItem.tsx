import {
  Box,
  Dialog,
  Divider,
  FormHelperText,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  eraseSucessAlert,
  setOpenEditDialog,
  updateErrorFrom,
  setCurrentTab,
} from "../store/features/estoqueSlice";
import { NutritionalTable } from "./NutritionalTable";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import { PublishedWithChanges } from "@mui/icons-material";
import { updateInventory } from "../store/features/estoqueSlice";
import AlertInput from "./AlertInput";
const EditInventoryItem = (props: { food: IFetchInventory }) => {
  const { food, id, quantity } = props.food;
  const open_edit = useAppSelector((state) => state.inventory.open_edit);
  const success = useAppSelector((state) => state.inventory.success);
  const request_type = useAppSelector((state) => state.inventory.request_type);
  const access_token = useAppSelector((state) => state.auth.tokenInfo?.access);
  const [newQuantity, setNewQuantity] = useState<number | string>(quantity);
  const message_tab = useAppSelector((state) => state.inventory.tab);

  const success_message = useAppSelector(
    (state) => state.inventory.success_message
  );
  const error_message = useAppSelector(
    (state) => state.inventory.error_message
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOpenEditDialog());
  };
  const updateToInventory = async () => {
    if (newQuantity == "" || newQuantity == "0") {
      return dispatch(updateErrorFrom("INVENTORY"));
    }
    try {
      const updated_inventory = {
        token: access_token,
        food: food.id as number,
        quantity: newQuantity as number,
        id: id as number,
      };
      await dispatch(updateInventory(updated_inventory)).unwrap();
      dispatch(setCurrentTab("INVENTORY"));
    } catch (e) {
      return dispatch(updateErrorFrom("INVENTORY"));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(eraseSucessAlert());
    }, 6000);
    return () => clearTimeout(timer);
  }, [success, dispatch]);

  return (
    <Dialog
      open={open_edit}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack direction="column" justifyContent="space-between">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "VT323", fontSize: 30 }}
          >
            <span style={{ textDecoration: "underline dotted" }}>
              ALIMENTO:
            </span>
            <span> {food.name}</span>
          </Typography>
          {food.brand ? (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontFamily: "VT323", fontSize: 30 }}
            >
              <span style={{ textDecoration: "underline dotted" }}>MARCA:</span>
              <span> {food.brand}</span>
            </Typography>
          ) : null}
          {request_type == "UPDATE" && message_tab == "INVENTORY" ? (
            <AlertInput
              result={success}
              successMessage={success_message}
              errorMessage={error_message}
            />
          ) : null}
        </Stack>
        <NutritionalTable quantity={newQuantity} food={food} />
      </Box>
      <Divider />

      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
          margin: 1,
          borderRadius: 5,
        }}
      >
        <Typography
          gutterBottom
          variant="body2"
          sx={{
            fontFamily: "VT323",
            fontSize: 23,
            margin: 0,
            textAlign: "center",
            textDecoration: "underline dotted",
          }}
        >
          QUANTIDADE
        </Typography>

        <Stack direction="row" spacing={1}>
          <Box>
            <Input
              autoFocus
              value={newQuantity}
              onClick={() => dispatch(eraseSucessAlert())}
              onChange={(e) => setNewQuantity((prev) => e.target.value)}
              type="number"
              id="standard-adornment-weight"
              required
              endAdornment={
                <InputAdornment position="end">
                  <Typography sx={{ fontFamily: "VT323", fontSize: 25 }}>
                    GR
                  </Typography>
                </InputAdornment>
              }
              aria-describedby="standard-weight-helper-text"
              sx={{
                fontFamily: "VT323",
                fontSize: 24,
                width: 100,
                "& input:focus": {
                  boxShadow: "none",
                  borderBottom: "2px solid black",
                },
                ":after": {
                  borderBottom: "2px solid black",
                  boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              }}
              inputProps={{ style: { textAlign: "end" } }}
            />
            {success == false && message_tab == "INVENTORY" ? (
              <FormHelperText
                id="standard-weight-helper-text"
                sx={{ color: "red", fontFamily: "VT323" }}
              >
                PREENCHA ESTE CAMPO
              </FormHelperText>
            ) : null}
          </Box>{" "}
          <PublishedWithChanges
            sx={{
              alignSelf: "center",
              "&:hover, &:active": {
                fontSize: 40,
              },
              "&:hover": {
                md: {
                  boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
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
            onClick={updateToInventory}
          />
        </Stack>
      </Box>
    </Dialog>
  );
};

export default EditInventoryItem;
