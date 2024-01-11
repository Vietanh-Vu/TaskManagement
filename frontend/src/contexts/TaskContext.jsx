import React, { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();
function TaskProvider({ children }) {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([]);
  const [curRowData, setCurRowData] = useState(null);
  const [action, setAction] = useState("None");
  const [rows, setRows] = React.useState([]);
  const [searchedRows, setSearchedRows] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { axios } = useAuth();

  function handleCloseForm() {
    setOpenForm(false);
  }

  function handleOpenForm(currentRow) {
    setCurRowData(currentRow);
    setOpenForm(true);
  }

  function handleAction(inputAction) {
    setAction(inputAction);
  }

  function fetchData() {
    setIsLoading(true);
    axios
      .get("/tasks")
      .then((response) => {
        // Xử lý dữ liệu trả về từ API
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  async function addTask() {
    setIsLoading(true);
    const dataPost = {
      name: curRowData.name,
      priority: curRowData.priority,
      status: curRowData.status,
      note: curRowData.note,
    };

    try {
      const response = await axios.post("/tasks", dataPost);
      alert(response.data);
      setIsLoading(false);
      setOpenForm(false);
      fetchData();
    } catch (error) {
      alert("Error adding task:", error);
      setIsLoading(false);
    }
  }

  async function updateTask() {
    setIsLoading(true);
    try {
      const response = await axios.put("/tasks", curRowData);
      alert(response.data);
      setIsLoading(false);
      setOpenForm(false);
      fetchData();
    } catch (error) {
      alert("Error adding task:", error);
      setIsLoading(false);
    }
  }

  async function deleteTask() {
    // console.log(curRowData);
    // const dataDelete = {
    //   createAt: curRowData.createAt,
    //   name: curRowData.name,
    //   priority: curRowData.priority,
    //   status: curRowData.status,
    //   note: curRowData.note,
    // };

    // console.log(dataDelete);
    setIsLoading(true);

    try {
      const response = await axios.delete("/tasks", {
        data: curRowData,
      });
      alert(response.data);
      setIsLoading(false);
      setOpenForm(false);
      fetchData();
    } catch (error) {
      alert("Error delete task:", error);
      setIsLoading(false);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        openForm,
        action,
        data,
        curRowData,
        rows,
        searchedRows,
        isLoading,
        setSearchedRows,
        setRows,
        addTask,
        deleteTask,
        updateTask,
        setCurRowData,
        handleAction,
        handleCloseForm,
        handleOpenForm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("TaskContext is use outside of TaskProvider");
  return context;
}

export { TaskProvider, useTask };
