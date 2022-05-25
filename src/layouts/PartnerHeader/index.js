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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo5.png";
import useAuth from "../../hooks/useAuth";
import { Divider } from "@mui/material";


const PartnerHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
    console.log(event);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      await logout(() => {
        navigate("/userLogin");
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
    <React.Fragment>
    <AppBar position="static" sx={{backgroundColor:"#ffb95e", boxShadow:"none", height:"100px"}} className="app_bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="/"
            noWrap
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
              height={90}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <img src={Logo} alt="logo" height={80} className="logo"/>
                <div className="logo_name">noknok</div>
            </Box>
          </Typography>
          <Typography
            variant="h5"
            noWrap
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
                <img src={Logo} alt="logo" height={80} />
                <div className="logo_name">noknok</div>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
           
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{color:"#FFF",p: 0, border: "1px solid lightGrey", width:"1.5em", height:"1.5em" }} >
                <AccountCircleIcon fontSize="large" />
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

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Account Settings</Typography>
              </MenuItem>
              {renderLogout}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </React.Fragment>
  );
};
export default PartnerHeader;
