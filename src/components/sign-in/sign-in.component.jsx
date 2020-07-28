import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {  withStyles } from '@material-ui/core/styles';



import { setCurrentUser } from '../../redux/user/user.actions';
import { req } from '../../url/url'



const useStyles = (theme) => ({

  root: {
    height: '100vh',
  },
  
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

});


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {

            email           : '',
            password        : '',
            isPasswordError : false,
            helperText      : '',

        }

    }
    

    handleChange = event => {

      const { value, name } = event.target;
      this.setState( { [name]: value } );

    }
 

    handleSubmit = async (event) => {

        event.preventDefault();

        const { setCurrentUser } = this.props;
        const signinData = {

            Email    : this.state.email,
            Password : this.state.password,

        }
        
        // try {

        //     const res = await req.user.login( signinData );

        //     axios.defaults.headers.common['Authorization'] = res.AccessToken;
        //     setCurrentUser({ Type: res.Type });
            
        // } 
        // catch (error) {

        //     this.setState ({ isPasswordError: true, helperText: 'password incorrect' });

        // }

        console.log(this.state)
    }


    render(){

        const { classes } = this.props;
        const { email, password, isPasswordError, helperText } = this.state;

        return (

            <Grid container component="main" className={classes.root}>

                <CssBaseline />

                <Grid item xs={false} sm={4} md={7} className={classes.image} />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <div className={classes.paper}>

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <form className={classes.form} noValidate>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChange}
                                value={email}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                                value={password}
                                error={isPasswordError}
                                helperText={helperText}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
                            >

                                Sign In

                            </Button>

                            <Grid container>

                                <Grid item>

                                    <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                    </Link>

                                </Grid>

                            </Grid>

                            <Box mt={5}>
                            </Box>

                        </form>

                    </div>
                    
                </Grid>

            </Grid>

        );

    }

}


const mapDispatchToProps = dispatch => ({

  setCurrentUser: user => dispatch(setCurrentUser(user))
  
});



export default withStyles( useStyles )( connect( null, mapDispatchToProps )( SignIn ) );