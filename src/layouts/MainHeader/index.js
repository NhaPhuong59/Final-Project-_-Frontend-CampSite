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
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo5.png";
import useAuth from "../../hooks/useAuth";
import { Divider } from "@mui/material";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./styles.scss";

const MainHeader = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    console.log(event);
    setAnchorElUser(event.currentTarget);
  };

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
    <AppBar
      position="absolute"
      sx={{ background: "none", boxShadow: "none" }}
      className="app_bar"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              height={150}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={Logo} alt="logo" height={60} className="logo" />
              <div className="logo_name">noknok</div>
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
              <img src={Logo} alt="logo" height={80}/>
              <div className="logo_name">noknok</div>
            </Box>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: { xs: "none", md: "center" },
            }}
          ></Box>

          {!isAuthenticated ? (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Typography
                href="/userLogin"
                component="a"
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <div className="login_btn">Login</div>
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{color:"#FFF",
                    p: 0,
                    border: "1px solid lightGrey",
                    width: "1.5em",
                    height: "1.5em",
                  }}
                >
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

                <MenuItem>
                  <Typography textAlign="center" component="a" href={(user.role==="partner")?(`/partner/${user._id}`):(`/user/${user._id}`)} sx={{textDecoration:"none", color:"#000"}}>Account Settings</Typography>
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
