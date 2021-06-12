import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Notification = (props) => {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({ ...notify, isOpen: false });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={notify.isOpen}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
