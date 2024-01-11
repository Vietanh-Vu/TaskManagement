import TextField from "@mui/material/TextField";
import { useTask } from "../contexts/TaskContext";
import AutoInput from "./AutoInput";
import { Autocomplete } from "@mui/material";
import { Grid } from "@mui/joy";
import { useEffect, useState } from "react";

export default function TaskInformation() {
  const { curRowData, setCurRowData } = useTask();

  const [name, setName] = useState(
    curRowData !== null ? curRowData.name : null
  );
  const [priority, setPriority] = useState(
    curRowData !== null ? curRowData.priority : null
  );
  const [status, setStatus] = useState(
    curRowData !== null ? curRowData.status : null
  );
  const [note, setNote] = useState(
    curRowData !== null ? curRowData.note : null
  );

  function handleSetName(name) {
    setName(name);
  }
  function handleSetNote(note) {
    setNote(note);
  }

  useEffect(() => {
    setCurRowData((curRowData) => {
      return {
        ...curRowData,
        name: name,
        priority: priority,
        status: status,
        note: note,
      };
    });
  }, [name, priority, status, note, setCurRowData]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sx={{ width: 1200, marginTop: 2 }}>
        <AutoInput
          placeHolder={"Name"}
          curRowText={name}
          onSetName={handleSetName}
        />
      </Grid>
      <Grid
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={6}>
          <Autocomplete
            placeholder="Priority"
            value={priority}
            onChange={(e, newValue) => setPriority(newValue)}
            options={[1, 2, 3, 4, 5]}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => <TextField {...params} label="Priority" />}
            sx={{ width: "100%" }}
            filterOptions={(options, { inputValue }) =>
              options.filter((option) =>
                option
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
              )
            }
          />
        </Grid>
        <Grid xs={6}>
          <Autocomplete
            placeholder="Status"
            value={status}
            onChange={(e, newValue) => setStatus(newValue)}
            options={["Todo", "Doing", "Done"]}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Status" />}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <Grid xs={12} sx={{ width: 1200 }}>
        <AutoInput
          placeHolder={"Note"}
          curRowText={note}
          onSetNote={handleSetNote}
        />
      </Grid>
    </Grid>
  );
}
