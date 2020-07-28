import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {

  constructor(props) {
        super(props);
        
        this.state = {

            firstName : '',
            lastName  : '',
            email     : '',
            password  : '',

        }

    }
    
    
    handleChange = event => {

        const { value, name } = event.target;
        this.setState( { [name]: value } );
  
      }
   
  
      handleSubmit = async (event) => {
  
          event.preventDefault();
  
          const { setCurrentUser } = this.props;
          const signupData = {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email    : this.state.email,
                Password : this.state.password,
  
          }
          
          // try {
  
          //     const res = await req.user.signIn( signinData );
  
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
        const { firstName, lastName, email, password } = this.state;

        return (

            <Container component="main" maxWidth="xs">

                <CssBaseline />

                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <form className={classes.form} noValidate>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>

                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={this.handleChange}
                                    value={firstName}
                                />

                            </Grid>

                            <Grid item xs={12} sm={6}>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={this.handleChange}
                                    value={lastName}
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                    value={password}
                                />

                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </Button>

                        <Grid container justify="flex-end">

                            <Grid item>
                            
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>

                            </Grid>

                        </Grid>

                    </form>

                </div>

                <Box mt={5}>
                </Box>

            </Container>

        );
    }
}


export default withStyles( useStyles )( SignUp );
