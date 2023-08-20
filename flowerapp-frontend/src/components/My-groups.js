import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import { Auth } from "aws-amplify";
import Navbar from './Navbar';

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
    align: 'right',
    format: (value) => value.toFixed(2),
  },

  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
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
  const navigate = useNavigate();
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
 console.log(response,response.data);

 setGroups(response.data);
 setLoading(false);
   } catch (e) {
     console.log(e);
   }
 };
 useEffect(() => {
   getMyGroups();
 }, []);

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(event.target.value);
   setPage(0);
 };
 if(loading){
   return(
   <div>Loading...</div>)
 };
 const onDelete = async(e)=>{
   try {


    const groupId = e.currentTarget.dataset.id;
    console.log(groupId);
    const user = await Auth.currentAuthenticatedUser();
    console.log(user.signInUserSession.idToken.jwtToken);
    const response = await axios.post(
      `https://api.myflowerarchitect.com/group/delete/${groupId}`,{  }, {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        }
      }
    );
     console.log(response);
   } catch (e) {
     console.log(e);
   }
 }
const renderCell = (column, value,row )=>{
  console.log(column, value);
  if(column.id === "action"){
    console.log(column, value,row )
    return(
      <TableCell key={column.id} align={column.align}>
      <Button
        onClick={()=>{
          console.log(row._id);
        navigate(`group/edit/${row._id}`)
        }}
        color="primary"
        className={classes.submit}
      >
Edit
      </Button>

         <Button
         data-id={row._id}
           onClick={onDelete}
           color="primary"
           className={classes.submit}
         >
  Delete
         </Button>
      </TableCell>
    )
  }
  else if(column.id === "tit"){
    return(
    <TableCell key={column.id} align={column.align}>
       <Link to={`group/${row._id}`}>{value}</Link>
    </TableCell>
  )
  }
  return(
    <TableCell key={column.id} align={column.align}>
      {column.format && typeof value === 'number' ? column.format(value) : value}
    </TableCell>
  )
}
  return (
    <React.Fragment>
      <Navbar backgroundColor="bg-gray-100" />
      <main className={classes.layout}>
        <Paper  className={classes.root}>
        <Typography component="h1" variant="h4" align="center">
        My Groups
        </Typography>
        <TableContainer className={classes.container}>
       <Table stickyHeader aria-label="sticky table">
         <TableHead>
           <TableRow>
             {columns.map((column,index) => (
               <TableCell
                 key={index}
                 align={column.align}
                 style={{ minWidth: column.minWidth }}
               >
                 {column.label}
               </TableCell>
             ))}
           </TableRow>
         </TableHead>
         <TableBody>
           {groups.map((row) => {
             return (
               <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                 {columns.map((column) => {
                   const value = row[column.id];
                   return (
                     <>
                    {renderCell(column,value,row)}
                    </>
                   );
                 })}
               </TableRow>
             );
           })}
         </TableBody>
       </Table>
     </TableContainer>
     <TablePagination
       rowsPerPageOptions={[10, 25, 100]}
       component="div"
       count={groups.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
     />

        </Paper>
      </main>
    </React.Fragment>
  );
}
