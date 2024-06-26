import { Box, Dialog, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  eraseSucessAlert,
  setCurrentTab,
  setOpenDeleteDialog,
} from "../store/features/estoqueSlice";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import { Check, Clear } from "@mui/icons-material";
import { deleteFromInventory } from "../store/features/estoqueSlice";
import AlertInput from "./AlertInput";
const DeleteItemFromInventory = (props: { food: IFetchInventory }) => {
  const { food, id, quantity } = props.food;
  const open_delete = useAppSelector((state) => state.inventory.open_delete);

  const access_token = useAppSelector((state) => state.auth.tokenInfo?.access);

  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOpenDeleteDialog());
  };
  const deleteItem = async () => {
    try {
      const data = {
        id: id,
        token: access_token,
      };
      await dispatch(deleteFromInventory(data)).unwrap();
      dispatch(setCurrentTab("INVENTORY"));
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={open_delete}
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
        </Stack>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
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
          }}
        >
          <span
            style={{ textDecoration: "underline", fontSize: 30, color: "red" }}
          >
            ATENÇÃO!
          </span>{" "}
          <br />
          NÃO É POSSÍVEL RECUPERAR O ALIMENTO APÓS A EXCLUSÃO. <br />
          VOCÊ TEM CERTEZA QUE GOSTARIA DE EXCLUIR?
        </Typography>
        <Stack direction="row" spacing={1}>
          <Clear
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
            onClick={handleClose}
          />
          <Check
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
            onClick={deleteItem}
          />
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DeleteItemFromInventory;
