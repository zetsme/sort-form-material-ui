import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(5),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar>
        <Typography variant='h6'>Form and Users</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
