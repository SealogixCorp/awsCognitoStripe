import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default  ()=>{
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return(
   <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
     <Toolbar className={classes.toolbar}>
       <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
         Flower app
       </Typography>
       <nav >
         <Link variant="button" color="textPrimary" href="#" className={classes.link}>
           MY ACCOUNT
         </Link>
         <Link variant="button" color="textPrimary" href="#" className={classes.link}>
           MY MEMEBERSHIP
         </Link>
         <Link variant="button" color="textPrimary" href="#" className={classes.link}>
           MY GROUPS
         </Link>
         <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  Languages
</Button>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}>English</MenuItem>
  <MenuItem onClick={handleClose}>Chinese </MenuItem>
  <MenuItem onClick={handleClose}>Urdu</MenuItem>
</Menu>
       </nav>
     </Toolbar>
   </AppBar>
 )
}
