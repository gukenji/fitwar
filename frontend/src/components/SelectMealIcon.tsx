import { Clear, Check } from "@mui/icons-material";
import {
  Dialog,
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Badge,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectIcon, setOpenIcon } from "../store/features/mealsSlice";
import { useState } from "react";
const SelectMealIcon = () => {
  const open_icon = useAppSelector((state) => state.meals.open_icon);
  const selected_icon = useAppSelector((state) => state.meals.icon);
  const [icon, setIcon] = useState<string | null>(selected_icon);
  const dispatch = useAppDispatch();
  const images = Object.values(
    import.meta.glob("../assets/food_icons/*", { eager: true, as: "url" })
  );
  const handleClose = () => {
    dispatch(setOpenIcon());
  };

  return (
    <Dialog
      open={open_icon}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {" "}
        <Stack direction="column" justifyContent="space-between">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "VT323", fontSize: 30 }}
          >
            <span style={{}}>ESCOLHA UM ÍCONE:</span>
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexWrap: "wrap",
          flexBasis: "100%",
          margin: 1,
          gap: 1,
          borderRadius: 5,
          justifyContent: "center",
        }}
      >
        {images.map((image, index) => {
          return (
            <Badge
              color="success"
              onClick={() => {
                setIcon(image);
              }}
              badgeContent={
                icon == image ? <Check sx={{ fontSize: 10 }} /> : null
              }
              key={index}
            >
              <Avatar
                alt="Dinner Icon"
                src={image}
                variant="square"
                sx={{ width: "auto", height: "auto" }}
              />
            </Badge>
          );
        })}
      </Box>
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
            onClick={() => {
              dispatch(selectIcon(icon));
              handleClose();
            }}
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
          />
        </Stack>
      </Box>
    </Dialog>
  );
};

export default SelectMealIcon;
