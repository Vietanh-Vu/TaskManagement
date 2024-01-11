import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { useTask } from "../contexts/TaskContext";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Stack from "@mui/joy/Stack";
import { useTableTask } from "../contexts/TableTaskContext";

export default function TableFoot() {
  const { data } = useTask();

  const { page, rowsPerPage, totalTasks, setPage, handleChangeRowsPerPage } =
    useTableTask();
  return (
    <tfoot>
      <tr>
        <td colSpan={6}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div
              style={{
                verticalAlign: "middle",
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "flex-end",
                fontWeight: "bold",
              }}
            >
              Total Task: {totalTasks}
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              <FormControl orientation="horizontal" size="sm">
                <FormLabel>Rows per page:</FormLabel>
                <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                </Select>
              </FormControl>
              <Typography textAlign="center" sx={{ minWidth: 80 }}>
                {`${page * rowsPerPage + 1}–${Math.min(
                  (page + 1) * rowsPerPage,
                  data.length
                )} of ${data.length}`}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="sm"
                  color="neutral"
                  variant="outlined"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  // ... your existing styles
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  size="sm"
                  color="neutral"
                  variant="outlined"
                  disabled={
                    data.length !== -1
                      ? page >= Math.ceil(data.length / rowsPerPage) - 1
                      : false
                  }
                  onClick={() => setPage(page + 1)}
                  // ... your existing styles
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
          </Stack>
        </td>
      </tr>
    </tfoot>
  );
}
