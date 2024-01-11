import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const [acc, setAcc] = React.useState({ username: "", passwordHash: "" });
  const { axios } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAcc({
      ...acc,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/users/login", {
        username: acc.username,
        password: acc.passwordHash,
      });

      // Encode the username and password in Base64
      const base64Credentials = btoa(`${acc.username}:${acc.passwordHash}`);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Basic ${base64Credentials}`;

      if (response.data === "Login successfully") {
        Cookies.set("username", acc.username);
        Cookies.set("password", acc.passwordHash);
        Cookies.set("credentials", base64Credentials);
        navigate("/home");
      } else {
        // Handle error
        alert(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Login failed. Please check username and password.");
      } else {
        alert("An error occurred during login.");
      }
      // Handle error
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordHash"
              label="Password"
              type="password"
              id="passwordHash"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
