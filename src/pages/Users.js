import {
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
} from '@material-ui/core';
import { Add, Close, EditOutlined, Search } from '@material-ui/icons';
import UserForm from '../components/UserForm';
import * as api from '../api';
import { useEffect, useState } from 'react';
import useTable from '../hooks/useTable';
import Popup from '../components/Popup';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';

const headCells = [
  { id: 'fullName', label: 'User Name' },
  { id: 'email', label: 'Email Address' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'city', label: 'City' },
  { id: 'department', label: 'Department' },
  { id: 'date', label: 'Date' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  searchBar: {
    marginBottom: theme.spacing(4),
  },
  searchInput: {
    width: '75%',
  },
  addButton: {
    marginLeft: 'auto',
  },
}));

const Users = () => {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const getDepartments = async () => {
      const { data } = await api.getDepartments();
      setDepartments(data);
    };
    getDepartments();
  }, []);
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const getUsers = async () => {
    const { data } = await api.getUsers();
    setRecords(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  //
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitile: '' });
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    records,
    headCells,
    filterFn
  );
  const handleSearch = (e) => {
    setFilterFn({
      fn: (items) => {
        if (e.target.value === '') {
          return items;
        } else {
          return items.filter((i) => i.fullName.toLowerCase().includes(e.target.value));
        }
      },
    });
  };
  //
  const addOrEdit = async (user, resetForm) => {
    if (!user.id) {
      await api.createUser(user);
    } else {
      await api.updateUser(user, user.id);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    getUsers();
    setNotify({ isOpen: true, message: 'Submitted Successfully', type: 'success' });
  };
  const onDelete = async (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    await api.deleteUser(id);
    await getUsers();
    setNotify({ isOpen: true, message: 'Deleted Successfully', type: 'error' });
  };
  //
  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.searchBar}>
        <TextField
          color='primary'
          variant='outlined'
          className={classes.searchInput}
          label='Search User'
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={classes.addButton}
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
          endIcon={<Add />}
          variant='outlined'
          color='primary'
        >
          Add New
        </Button>
      </Toolbar>
      {/* Table */}
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell>{item.department}</TableCell>
              {/* <TableCell>{item.date}</TableCell> */}
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton color='primary' onClick={() => openInPopup(item)}>
                  <EditOutlined />
                </IconButton>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete thi record?',
                      subTitile: "You can't undo this operation",
                      onConfirm: () => onDelete(item.id),
                    });
                  }}
                >
                  <Close />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup title='User Form' openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <UserForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} departments={departments} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </Paper>
  );
};

export default Users;
