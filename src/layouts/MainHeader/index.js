import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {  Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logoNok3.jpg";
import useAuth from "../../hooks/useAuth";
import { Divider } from "@mui/material";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import "./styles.scss"

const MainHeader = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated} = useAuth();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    console.log(event);
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = (event) => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderLogout = (
    <MenuItem onClick={handleLogout}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
  return (
    <AppBar position="static" sx={{backgroundColor:"#FFF", boxShadow:"none"}} className="app_bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box
              height={100}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Link to="/"> */}
                <img src={Logo} alt="logo" height={80} className="logo"/>
              {/* </Link> */}
            </Box>
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box
              height={90}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Link to="/"> */}
                <img src={Logo} alt="logo" height={80} />
              {/* </Link> */}
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: {xs:"none", md:"center"} }}>
          {/* <div className="header_center">
                <input type="text" placeholder="Search"/>
                <IconButton style={{background:"#e55039", color:'white'}}>
                    <SearchIcon />
                </IconButton>
            </div> */}
          </Box>

          {(!isAuthenticated)?(
            <Box sx={{ flexGrow: 0,display:"flex", alignItems:"center" }} >
            <Typography href="/userLogin" component="a" sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color:"#e55039",
              letterSpacing: ".1rem",
              textDecoration: "none",
            }}>
               Login
              </Typography>
              <IconButton><LoginIcon/></IconButton>
              
          </Box>
          ):(
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0, border: "1px solid lightGrey", width:"1.5em", height:"1.5em" }} >
                <AccountCircleIcon fontSize="3"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {user?.userName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {user?.email}
                </Typography>
              </Box>

              <Divider sx={{ borderStyle: "dashed" }} />

              <MenuItem >
                <Typography textAlign="center">Account Settings</Typography>
              </MenuItem>
              {renderLogout}
            </Menu>
          </Box>
          )}
            
          
         
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainHeader;
