import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTask } from "../contexts/TaskContext";
import { useEffect, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.05),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0B6BCB",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1.5em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        outline: "2px solid #0B6BCB",
        borderRadius: theme.shape.borderRadius,
        // borderStyle: "solid",
        // borderWidth: "0.5px",
      },
    },
  },
}));

export default function SearchBox() {
  const { rows, setSearchedRows } = useTask();
  const [searchValue, setSearchValue] = useState(null);

  function handleSearchChange(event) {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  }

  useEffect(() => {
    if (searchValue === null) setSearchedRows(null);
    else
      setSearchedRows(
        rows.filter((row) =>
          row.name.toLowerCase().includes(searchValue.trim().toLowerCase())
        )
      );

    return () => {};
  }, [rows, searchValue, setSearchedRows]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={handleSearchChange}
      />
    </Search>
  );
}
