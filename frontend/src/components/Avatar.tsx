import React, { useEffect, useState } from "react";
import { Pixelify } from "react-pixelify";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Icon,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/store";
import { logout } from "../store/features/authSlice";
import { IconButtonStyled } from "../styles/IconButtonStyled";
import default_avatar_female from "../assets/default_avatar_female.png";
import default_avatar_male from "../assets/default_avatar_male.png";
const Avatar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const PROFILE_PIC_ENDPOINT = "http://localhost:8000/media/";
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(profilePic);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    userProfileInfo?.profile_pic
      ? setProfilePic((prev) => userProfileInfo.profile_pic)
      : setProfilePic(null);
    console.log(profilePic);
  }, [userProfileInfo]);

  return (
    <Box sx={{ display: userProfileInfo ? "inherit" : "none" }}>
      <IconButtonStyled
        aria-label="my account"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ display: "flex", flexDirection: "column", boxShadow: "none" }}
      >
        <Icon
          sx={{
            width: greaterThanMid ? 100 : 80,
            height: greaterThanMid ? 100 : 80,
            borderRadius: 2,
          }}
        >
          {profilePic ? (
            <Pixelify
              src={`${PROFILE_PIC_ENDPOINT + profilePic}`}
              pixelSize={0}
              centered={true}
              width={greaterThanMid ? 100 : 80}
              height={greaterThanMid ? 100 : 80}
            />
          ) : (
            <Pixelify
              src={
                userProfileInfo?.is_male
                  ? default_avatar_male
                  : default_avatar_female
              }
              pixelSize={0}
              fillTransparencyColor={"transparent"}
              centered={true}
              width={greaterThanMid ? 100 : 80}
              height={greaterThanMid ? 100 : 80}
            />
          )}
        </Icon>
        <Typography
          sx={{
            color: "black",
            fontFamily: "VT323",
            fontSize: 18,
          }}
        >
          LEVEL 1
        </Typography>
      </IconButtonStyled>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!userProfileInfo ? (
          <MenuItem>
            <Link to="/login">Login</Link>
          </MenuItem>
        ) : null}
        {userProfileInfo ? (
          <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
        ) : null}
        {userProfileInfo ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : null}
      </Menu>
    </Box>
  );
};

export default Avatar;
