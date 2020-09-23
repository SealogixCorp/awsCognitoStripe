import React,{useEffect,forwardRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MaterialTable from 'material-table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import { Auth } from "aws-amplify";



import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Appbar from './Appbar';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
const columns = [
  { id: 'tit', label: 'Title', minWidth: 170 },
  { id: 'des', label: "Category", minWidth: 100 },
  {
    id: 'des',
    label: 'Descripton',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'web',
    label: 'Web',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'web',
    label: 'Web',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];






const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default ()=> {
  const classes = useStyles();
 const [page, setPage] = React.useState(0);
 const [groups, setGroups] = React.useState(null);
 const [loading, setLoading] = React.useState(true);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };
 const getMyGroups = async () => {
   try {
       const user = await Auth.currentAuthenticatedUser();
     const response = await  axios.get("https://api.myflowerarchitect.com/group/mygroups", {
   headers: {
     'Authorization': `Bearer ${user.signInUserSession.idToken.jwtToken}`,
     "Accept": "application/json",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*'
   }
 });
 console.log(response);

 setGroups(response.data.data);
 console.log(groups);
 setLoading(false);
   } catch (e) {
     console.log(e);
    setLoading(false);
   }
 };
 useEffect(() => {
   getMyGroups();
},[getMyGroups, groups]);

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(+event.target.value);
   setPage(0);
 };
 if(loading){
   return(
   <div>Loading...</div>)
 };

  return (
    <React.Fragment>
    <Appbar />
      <main className={classes.layout}>
        <Paper  className={classes.root}>
        <Typography component="h1" variant="h4" align="center">
        My Groups
        </Typography>
        <MaterialTable
      title="Editable Example"
      icons={tableIcons}
      columns={[
            { title: "Title", field: "tit" },
            { title: "Cat", field: "cat" },
            { title: "des", field: "des",  },
            {
              title: "Web",
              field: "web",

            },
          ]}
      data={groups}


    />


        </Paper>
      </main>
    </React.Fragment>
  );
}
