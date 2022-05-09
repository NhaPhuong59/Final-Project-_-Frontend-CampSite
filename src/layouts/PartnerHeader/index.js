import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.jpg";
import useAuth from "../../hooks/useAuth";
import { Divider } from "@mui/material";
import CoverImg from "../../images/lance-anderson-JKmjElTIG5I-unsplash.jpg"

const PartnerHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (event) => {
    handleCloseUserMenu();
    const text = event.target.innerText;
    console.log(event.target.innerText);
    console.log(text === "USER");
    if (text === "USER") {
      navigate("user");
    } else if (text === "CAMP") {
      navigate("camp");
    } else if (text === "CREATE CAMP") {
      navigate("create");
    }
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
    <AppBar position="static">
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
              height={90}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <img src={Logo} alt="logo" height={100} />
              </Link>
            </Box>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem to="user" component={RouterLink}>
                User
              </MenuItem>
              <MenuItem to="camp" component={RouterLink}>
                Camp
              </MenuItem>
              <MenuItem to="create" component={RouterLink}>
                Create Camp
              </MenuItem>
            </Menu>
          </Box>
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
              <Link to="/">
                <img src={Logo} alt="logo" height={100} />
              </Link>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleNavigate}
              sx={{ my: 2, color: "orange", display: "block" }}
            >
              User
            </Button>
            <Button
              onClick={handleNavigate}
              sx={{ my: 2, color: "orange", display: "block" }}
            >
              Camp
            </Button>
            <Button
              onClick={handleNavigate}
              sx={{ my: 2, color: "orange", display: "block" }}
            >
              Create Camp
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
    {/* <Box position="static" zIndex={-1}>
      <img src={CoverImg} alt="cover" height={400}/>
    </Box> */}
    </React.Fragment>
  );
};
export default PartnerHeader;
