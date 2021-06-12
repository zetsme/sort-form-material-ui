import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { NotListedLocation } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogActions: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}));
const ConfirmDialog = (props) => {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton className={classes.titleIcon}>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{confirmDialog.title}</Typography>
        <Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          color='default'
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button color='secondary' onClick={confirmDialog.onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
