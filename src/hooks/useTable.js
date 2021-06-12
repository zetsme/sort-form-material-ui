import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  table: {
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#b8c4ff',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f554',
    },
  },
}));

const useTable = (records, headCells, filterFn) => {
  const classes = useStyles();
  //
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  //
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  //
  const TblContainer = (props) => <Table className={classes.table}>{props.children}</Table>;
  //
  const TblHead = () => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  //
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //
  const TblPagination = () => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPage={rowsPerPage}
      count={records.length}
      rowsPerPageOptions={pages}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
  //
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      rowsPerPage * page,
      rowsPerPage * (page + 1)
    );
  };
  return { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting };
};

export default useTable;
