import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `${theme.spacing(2)}px 0px`,
  },
}));

const Popup = (props) => {
  const classes = useStyles();
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      classes={{ paper: classes.dialogWrapper }}
      onClose={() => setOpenPopup(false)}
      open={openPopup}
      maxWidth='md'
    >
      <DialogTitle>
        <div className={classes.titleWrapper}>
          <Typography variant='h4'>{title}</Typography>
          <IconButton color='secondary' onClick={() => setOpenPopup(false)}>
            <Close />
          </IconButton>
        </div>
        <DialogContent dividers>{children}</DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default Popup;
