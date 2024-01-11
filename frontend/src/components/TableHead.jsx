import React from "react";
import Button from "@mui/joy/Button";
import { useTableTask } from "../contexts/TableTaskContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack } from "@mui/joy";
import { useTask } from "../contexts/TaskContext";

export default function TableHead() {
  const { handleClickBtn } = useTableTask();
  const { setRows } = useTask();
  const [orderPriority, setOrderPriority] = React.useState("asc"); // true = asc
  const [orderCreateAt, setOrderCreateAt] = React.useState("asc"); // true = asc

  function handleOrderByPriority() {
    orderPriority === "asc" ? setOrderPriority("des") : setOrderPriority("asc");
    setRows((prevRows) =>
      prevRows.slice().sort((a, b) => {
        // If true => (asc)
        return orderPriority === "asc"
          ? a.priority - b.priority
          : b.priority - a.priority;
      })
    );
  }

  function handleOrderByCreateAt() {
    orderCreateAt === "asc" ? setOrderCreateAt("des") : setOrderCreateAt("asc");
    setRows((prevRows) =>
      prevRows.slice().sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);

        // If true => (asc)
        return orderCreateAt === "asc" ? dateA - dateB : dateB - dateA;
      })
    );
  }

  return (
    <thead>
      <tr>
        <th
          style={{
            width: 400,
            verticalAlign: "middle",
            fontSize: "1rem",
          }}
        >
          Name
        </th>
        <th
          style={{
            width: 100,
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "1rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
              "& svg": {
                transition: "0.2s",
                transform:
                  orderPriority === "asc" ? "rotate(0deg)" : "rotate(180deg)",
              },
              "&:hover": { "& svg": { opacity: 1 } },
            }}
          >
            <Button
              onClick={handleOrderByPriority}
              variant="plain"
              color="string"
            >
              <ArrowDownwardIcon />
              <span>Priority</span>
            </Button>
          </Stack>
        </th>
        <th
          style={{
            width: 100,
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "1rem",
          }}
        >
          Status
        </th>

        <th
          style={{
            width: 200,
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "1rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
              "& svg": {
                transition: "0.2s",
                transform:
                  orderCreateAt === "asc" ? "rotate(0deg)" : "rotate(180deg)",
              },
              "&:hover": { "& svg": { opacity: 1 } },
            }}
          >
            <Button
              onClick={handleOrderByCreateAt}
              variant="plain"
              color="string"
            >
              <ArrowDownwardIcon />
              <span>Create At</span>
            </Button>
          </Stack>
        </th>

        <th
          style={{
            width: 200,
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "1rem",
          }}
        >
          Note
        </th>

        <th style={{ textAlign: "center", verticalAlign: "middle" }}>
          <Button
            size="md"
            variant="solid"
            color="primary"
            onClick={() => handleClickBtn(null, "Add")}
          >
            New Task
          </Button>
        </th>
      </tr>
    </thead>
  );
}
