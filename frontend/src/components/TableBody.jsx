import { useTask } from "../contexts/TaskContext";
import { useTableTask } from "../contexts/TableTaskContext";
import Loading from "./Loading";

export default function TableBody() {
  const { rows, searchedRows, isLoading } = useTask();
  const { page, rowsPerPage, emptyRows, renderTasks } = useTableTask();

  return (
    <tbody>
      {isLoading === true && (
        <tr>
          <td colSpan={6} style={{ textAlign: "center" }}>
            <Loading />
          </td>
        </tr>
      )}

      {rows === null ? (
        <tr>
          <td colSpan={6} style={{ textAlign: "center" }}>
            <span>Add Some Tasks</span>
          </td>
        </tr>
      ) : searchedRows !== null ? (
        searchedRows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => renderTasks(row))
      ) : (
        rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => renderTasks(row))
      )}

      {}
      {emptyRows > 0 && (
        <tr
          style={{
            height: `calc(${emptyRows} * 40px)`,
            "--TableRow-hoverBackground": "transparent",
          }}
        >
          <td colSpan={6} aria-hidden />
        </tr>
      )}
    </tbody>
  );
}
