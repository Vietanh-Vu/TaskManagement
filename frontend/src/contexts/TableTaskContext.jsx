import React, { createContext, useContext } from "react";
import { useTask } from "./TaskContext";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

const TableTaskContext = createContext();

export default function TableTaskProvider({ children }) {
  const { handleOpenForm, data, handleAction, rows, setRows, searchedRows } =
    useTask();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const [totalTasks, setTotalTask] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    setRows(data);
    setTotalTask(data.length);
    return () => {};
  }, [data, setRows]);

  React.useEffect(() => {
    setTotalTask(searchedRows !== null ? searchedRows.length : rows.length);
  }, [rows, searchedRows]);

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  function handleClickBtn(row, inputAction) {
    handleOpenForm(row);
    handleAction(inputAction);
  }

  function renderTasks(row) {
    return (
      <tr key={row.createAt}>
        <td style={{ verticalAlign: "middle" }}>{row.name}</td>

        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {row.priority}
        </td>

        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {row.status === "Done" && (
            <Button
              size="sm"
              variant="soft"
              color="success"
              sx={{ pointerEvents: "none" }}
            >
              {" "}
              {row.status}{" "}
            </Button>
          )}
          {row.status === "Doing" && (
            <Button
              size="sm"
              variant="soft"
              color="primary"
              sx={{ pointerEvents: "none" }}
            >
              {" "}
              {row.status}{" "}
            </Button>
          )}
          {row.status === "Todo" && (
            <Button
              size="sm"
              variant="soft"
              color="warning"
              sx={{ pointerEvents: "none" }}
            >
              {" "}
              {row.status}{" "}
            </Button>
          )}
        </td>

        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {formatDateTime(row.createAt)}
        </td>

        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          {row.note}
        </td>
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="sm"
              variant="plain"
              color="neutral"
              onClick={() => handleClickBtn(row, "Update")}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="soft"
              color="danger"
              onClick={() => handleClickBtn(row, "Delete")}
            >
              Delete
            </Button>
          </Box>
        </td>
      </tr>
    );
  }

  function formatDateTime(isoTime) {
    const date = new Date(isoTime);
    const formattedDate = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  }

  return (
    <TableTaskContext.Provider
      value={{
        page,
        rowsPerPage,
        emptyRows,
        totalTasks,
        renderTasks,
        setPage,
        handleChangeRowsPerPage,
        handleClickBtn,
      }}
    >
      {children}
    </TableTaskContext.Provider>
  );
}

function useTableTask() {
  const context = useContext(TableTaskContext);
  if (context === undefined)
    throw new Error("TableTaskContext is used outside of TableTaskProvider");
  return context;
}

export { TableTaskProvider, useTableTask };
