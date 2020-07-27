import React from 'react';
import { connect } from 'react-redux';
import { Switch , Route, Redirect } from 'react-router-dom'



import SignInPage from './pages/sign-in-page/sign-in-page';
import SignUpPage from './pages/sign-up-page/sign-up-page';


import './App.css';

class App extends React.Component {

 render(){  

    return (

      <div className="App">



        <Switch>

          <Route exact path='/' render={() => this.props.currentUser ? (<SignInPage />) : (<Redirect to='/signin' />) } /> 

          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />) } /> 

          <Route exact path='/signup' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignUpPage />) } />  
            
        </Switch>
      </div>
    );
  }
}


const mapSateToProps = state => ({

  currentUser: state.user.currentUser

})

export default connect(mapSateToProps)(App);
