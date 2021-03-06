import React from 'react';
import { connect } from 'react-redux';
import { Switch , Route, Redirect } from 'react-router-dom'

import Header from './components/header/header.component'
import SignInPage from './pages/sign-in-page/sign-in-page';
import SignUpPage from './pages/sign-up-page/sign-up-page';
import CreateFormPage from './pages/create-form-page/create-form-page'
import ResponseForm from './components/response-form/response-form.component'
import MyFormsPage from './pages/my-forms-page/my-forms-page';
import InfoPage from './pages/info-page/info-page'


import './App.css';

class App extends React.Component {

 render(){  

    return (

      <div className="App">

        <Header />

        <Switch>

          <Route exact path='/' render={() => this.props.currentUser ? (<CreateFormPage />) : (<Redirect to='/signin' />) } /> 

          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />) } /> 

          <Route exact path='/signup' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignUpPage />) } />  

          <Route exact path='/myforms' render={() => this.props.currentUser ? (<MyFormsPage />) : (<Redirect to='/signin' />) } /> 

          <Route exact path='/info' render={() => this.props.currentUser ? (<InfoPage />) : (<Redirect to='/signin' />) } /> 
          
          <Route path='/forms/:id' render={() => this.props.currentUser ? (<ResponseForm />) : (<Redirect to='/signin' />) }  /> 
            
        </Switch>
      </div>
    );
  }
}


const mapSateToProps = state => ({

  currentUser: state.user.currentUser

})

export default connect(mapSateToProps)(App);
