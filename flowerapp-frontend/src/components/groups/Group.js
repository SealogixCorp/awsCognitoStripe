import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from '../Appbar';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default () => {
	let { id } = useParams();

	const { addToast } = useToasts();
	const history = useHistory();
	const [ group, setGroup ] = React.useState(null);
	const [ loading, setLoading ] = React.useState(true);
	const classes = useStyles();

	useEffect(() => {
		const getMyGroup = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const response = await axios.get(
					`https://api.myflowerarchitect.com/group/${id}`,
					{
						headers: {
							Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
							Accept: 'application/json',
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': '*'
						}
					}
				);
				console.log(response.data.data, response.data);

				setGroup({ ...response.data['statusCode: 200, success: true, count: 1, data'] });
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		getMyGroup();
	}, [id]);

	if (loading) {
		return <div>loading....</div>;
	}

	return (
		<React.Fragment>
			<NavBar />

			<Container className={classes.layout}>
				<Paper className={classes.paper}>
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Group
						</Typography>
						{group._id}
					</div>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
