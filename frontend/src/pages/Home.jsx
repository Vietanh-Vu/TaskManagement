import Grid from "@mui/material/Grid";
import TableTask from "../components/TableTask";
import DenseAppBar from "../components/DenseAppBar";
import { TaskProvider } from "../contexts/TaskContext";
import FormDialog from "../components/FormDialogTask";
import TableTaskProvider from "../contexts/TableTaskContext";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userConfirmedClose = useRef(false);
  const { axios, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const checkCredentials = async () => {
      const username = Cookies.get("username");
      const password = Cookies.get("password");

      if (!username || !password) {
        navigate("/login");
      } else {
        try {
          const response = await axios.post("/users/login", {
            username: username,
            password: password,
          });

          if (response.data == "Login failed") {
            setIsLoggedIn(false);
            navigate("/login");
          } else {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkCredentials();
  }, [navigate, axios]);
  return (
    <>
      <DenseAppBar />
      <Grid
        container
        spacing={0}
        justifyContent="center"
        // className={styles.centerContent}
      >
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={6}
          alignItems={"center"}
          sx={{ marginBottom: "100px" }}
        ></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          <TaskProvider>
            <FormDialog />
            <TableTaskProvider>
              <TableTask />
            </TableTaskProvider>
          </TaskProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
