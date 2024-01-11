import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FilterTable from "./FilterTable";
import TableHead from "./TableHead";
import TableFoot from "./TableFoot";
import TableBody from "./TableBody";
// function createData(name, priority, status, note) {
//   return { name, priority, status, note };
// }

export default function TableTask() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h1"
          textAlign="center"
          sx={{ pb: 2, fontSize: "2.986rem", fontWeight: "bold" }}
        >
          List Task
        </Typography>

        <FilterTable />

        <Sheet
          variant="outlined"
          sx={{
            "--TableCell-height": "40px",
            // the number is the amount of the header rows.
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            "--Table-firstColumnWidth": "80px",
            "--Table-lastColumnWidth": "144px",
            // background needs to have transparency to show the scrolling shadows
            "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
            "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
            overflow: "auto",
            background: (theme) =>
              `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
              farthest-side at 100% 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
              )
              0 100%`,
            backgroundSize:
              "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "local, local, scroll, scroll",
            backgroundPosition:
              "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
            backgroundColor: "background.surface",
          }}
        >
          <Table
            borderAxis="bothBetween"
            // stripe="odd"
            hoverRow
            sx={{
              "& tr > *:first-child": {
                position: "sticky",
                left: 0,
                boxShadow: "1px 0 var(--TableCell-borderColor)",
                // bgcolor: "background.surface",
              },
              "& tr > *:last-child": {
                position: "sticky",
                right: 0,
                // bgcolor: "var(--TableCell-headBackground)",
              },
            }}
          >
            <TableHead />
            <TableBody />
            <TableFoot />
          </Table>
        </Sheet>
      </Box>
    </>
  );
}
