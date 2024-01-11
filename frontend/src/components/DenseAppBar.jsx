import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/AuthContext";

export default function DenseAppBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  async function handleClick() {
    logout();
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Task Management
            </Typography>
            <Button sx={{ marginLeft: "auto" }} variant="contained">
              Hi {Cookies.get("username")}
            </Button>
            <Button
              sx={{ marginLeft: "10px" }}
              variant="contained"
              onClick={handleClick}
            >
              Logout
            </Button>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
