"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, Button } from "@mui/material";
import { storeState } from "@/lib/Redux/store/store";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NightlightIcon from '@mui/icons-material/Nightlight';
import Link from "next/link";
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const user = useSelector((state: storeState) => state.User.user);
 
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const Token = Cookies.get("token");

 
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleRegister = () => {
    router.push("/register");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: 4 }}
    >
      {Token ? (
        [
          <MenuItem key="account" onClick={handleMenuClose}>
            My account
          </MenuItem>,
          <MenuItem key="Logout" onClick={handleLogout}>
            Logout
          </MenuItem>,
        ]
      ) : (
        <MenuItem key="Register" onClick={handleRegister}>
          Register
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      {Token
        ? [
            <MenuItem key="FavoriteIcon">
              <IconButton size="large" color="inherit">
                <Badge>
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <p>Favorite</p>
            </MenuItem>,
          ]
        : ""}

      {Token ? (
        [
          <MenuItem key="profile" onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar src={user?.photo} />
            </IconButton>
            <p>Profile</p>
          </MenuItem>,
        ]
      ) : (
        <MenuItem key="Register" onClick={handleRegister}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Register</p>
        </MenuItem>
      )}
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#EC486E " }}>
          <Button href="/home">
            <Typography
              className="appName"
              noWrap
              component="div"
              sx={{
                display: {
                  sm: "block",
                  fontSize: "30px",
                  color: "white",
                },
              }}
            >
              PINGRAM
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            {Token
              ? [
                  <IconButton
                    key="notifications"
                    size="small"
                    color="inherit"
                   sx={{  gap:"12px"}}
                  >
                    <Badge>
                   <Link href={"/favourite"}>
   <FavoriteIcon   sx={{color:"white" , width:"35px" }}  />
                   </Link>
                    </Badge>

                    <Badge>
                   
   <NightlightIcon  />
                   
                    </Badge>
                  </IconButton>,
                ]
              : ""}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt={user?.name}
                src={user?.photo}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
