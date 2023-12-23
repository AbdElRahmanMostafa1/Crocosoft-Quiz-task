import React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const pages = [
  {
    link: "/",
    label: "Quizes",
  },
  {
    link: "/add-quiz",
    label: "+ Add Quiz",
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            Crocosoft
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
              {pages.map((page) => (
                <MenuItem key={page.label}>
                  <NavLink
                    to={page.link}
                    onClick={handleCloseNavMenu}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {page.label}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
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
            Crocosoft
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                onClick={handleCloseNavMenu}
                key={page.label}
                to={page.link}
                style={{
                  color: "white",
                  display: "block",
                  marginRight: 20,
                }}
              >
                {page.label}
              </NavLink>
            ))}
          </Box>

          <IconButton
            sx={{ ml: 1 }}
            // onClick={() => dispatch(toggleThemeHandler())}
            color="inherit"
          >
            {/* {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />} */}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
