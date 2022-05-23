import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";

const ClientPagination = (props) => {
  const { pagination, onPageChange, id } = props;
  const { current_page, to, totalRows, totalPages } = pagination;
  const [page, setPage] = useState(current_page);
  const [rowsPerPage, setRowsPerPage] = useState(to);
  const [currentId, setCurrentId] = useState(id);
  useEffect(() => {
    setCurrentId(id);
    if (currentId != id) {
      setPage(0);
      onPageChange(0, rowsPerPage);
    }
  }, [id]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage + 1, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (onPageChange) {
      onPageChange(0, parseInt(event.target.value, 10));
    }
  };

  return (
    <>
      <TablePagination
        count={totalRows}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ClientPagination;
