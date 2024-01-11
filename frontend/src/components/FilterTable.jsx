import Box from "@mui/joy/Box";
import { useTask } from "../contexts/TaskContext";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Stack from "@mui/joy/Stack";
import SearchBox from "./SearchBox";
import React from "react";

export default function FilterTable() {
  const { data, setRows } = useTask();
  const [filterStatus, setFilterStatus] = React.useState("None");

  function handleFilterStatus(event) {
    const order = event.target.value;
    setFilterStatus(order);
    switch (order) {
      case "None":
        setRows(data);
        break;
      case "Todo":
        setRows(data);
        setRows((prevRows) => {
          return prevRows.filter((row) => row.status === "Todo");
        });
        break;

      case "Doing":
        setRows(data);
        setRows((prevRows) => {
          return prevRows.filter((row) => row.status === "Doing");
        });
        break;

      case "Done":
        setRows(data);
        setRows((prevRows) => {
          return prevRows.filter((row) => row.status === "Done");
        });
        break;

      default:
        break;
    }
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      sx={{ marginBottom: "10px" }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <FormControl orientation="horizontal" sx={{ mb: 2, ml: 1 }}>
          <FormLabel sx={{ fontSize: "1rem" }}>Filter Status</FormLabel>
          <RadioGroup
            orientation="horizontal"
            value={filterStatus}
            onChange={(event) => handleFilterStatus(event)}
          >
            <Radio label="Todo" value={"Todo"} />
            <Radio label="Doing" value={"Doing"} />
            <Radio label="Done" value={"Done"} />
            <Radio label="None" value={"None"} />
          </RadioGroup>
        </FormControl>
        <Box>
          <SearchBox />
        </Box>
      </Stack>
    </Stack>
  );
}
