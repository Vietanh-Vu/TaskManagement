import * as React from "react";
// import Button from "@mui/material/Button";
import Button from "@mui/joy/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTask } from "../contexts/TaskContext";
import Slide from "@mui/material/Slide";
import TaskInformation from "./TaskInformation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormTaskDialog() {
  const {
    openForm,
    handleCloseForm,
    addTask,
    deleteTask,
    action,
    updateTask,
    isLoading,
  } = useTask();

  return (
    <React.Fragment>
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        maxWidth="md"
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ fontSize: "1.728rem" }}>
          {action === "Add" && "Add new task"}
          {action === "Delete" && "Are you sure want to delete this task?"}
          {action === "Update" && "Update task"}
        </DialogTitle>
        <DialogContent>
          <TaskInformation />
        </DialogContent>
        <DialogActions>
          {action !== "Delete" ? (
            <>
              <Button onClick={handleCloseForm}>Cancel</Button>
              {isLoading ? (
                <Button loading variant="solid">
                  Solid
                </Button>
              ) : (
                <Button onClick={action === "Add" ? addTask : updateTask}>
                  Submit
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleCloseForm}>Disagree</Button>
              {isLoading ? (
                <Button loading variant="solid">
                  Solid
                </Button>
              ) : (
                <Button onClick={deleteTask}>Agree</Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
