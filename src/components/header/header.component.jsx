import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
import IconButton from '@material-ui/core/IconButton';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


import { makeStyles } from '@material-ui/core/styles';


import { setCurrentUser } from '../../redux/user/user.actions'


import './header.styles.css'





const useStyles = makeStyles( ( theme ) => ({

  root: {

    flexGrow       : 1,
    justifyContent : 'space-between',

  },

  menuButton: {

    marginRight : theme.spacing(2),

  },

  title: {

    flexGrow : 1,

  },

  list: {

    width : 250,

  },

}));

const Header = ( { currentUser, setCurrentUser, history } ) => {

  const classes = useStyles();
  const [state, setState] = React.useState({

    left : false,

  });

  const toggleDrawer = ( anchor, open ) => (event) => {

    if ( event && event.type === 'keydown' && ( event.key === 'Tab' || event.key === 'Shift' ) ) {
      return;
    }

    setState({ ...state, [anchor]: open });

  };


  const list = ( anchor, currentUser ) => (

    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>

        {
          currentUser ?
          
            <ListItem button key={1} onClick={() => {history.push('/')}} >
            
              <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon>
              <ListItemText primary='CREATE FORM' />

            </ListItem>
          :
            null
        }

        {
          currentUser  ?

            <ListItem button key={2} onClick={() => {history.push('/myforms')}} >

              <ListItemIcon> <ShowChartIcon /> </ListItemIcon>
              <ListItemText primary='MY FORMS' />

            </ListItem>
          :
            null
        }

      </List>

    </div>

  );

  return (
    <div className={`${classes.root} header`} >

      <AppBar position='fixed'>

        <Toolbar>

          {

            currentUser ?

              <React.Fragment key={0}>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)} >
                  <MenuIcon />
                </IconButton>

                <SwipeableDrawer
                  anchor='left'
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                  onOpen={toggleDrawer('left', true)}
                >

                  {list('left', currentUser)}

                </SwipeableDrawer>

              </React.Fragment>

            :

                null

          }

          <div className='options'>

            {

              !currentUser ?

                  <Button color='inherit' className='option'  onClick={() => {history.push('/signin')}} >
                      SignIn
                  </Button>

              :

                  null

            }

            {

              !currentUser ?

                  <Button color='inherit' className='option'  onClick={() => {history.push('/signup')}} >
                      SignUp
                  </Button>

              :

                  null

            }

            {

              currentUser ?

                  <Button color='inherit' className='option'  onClick={() => {setCurrentUser(null); Axios.post( '/user/logout' ) ; }}>
                      LOG OUT
                  </Button>

              :

                  null

            }

          </div>

        </Toolbar>

      </AppBar>

    </div>

  );

};


const mapStatetoProps = state => ({

    currentUser : state.user.currentUser

});


const mapDispatchToProps = dispatch => ({

    setCurrentUser : user => dispatch( setCurrentUser( user ) )

});

export default connect( mapStatetoProps, mapDispatchToProps )( withRouter( Header ) );