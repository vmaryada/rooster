import React from 'react';
import jwtDecode from 'jwt-decode';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import { Router, Route, Switch} from 'react-router-dom'
//import {withRouter} from 'react-router';
import createHistory from 'history/createBrowserHistory'
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//pages
import home from './pages/home.js';
import signup from './pages/signup.js';
import login from './pages/login.js';
import Navbar from './components/layout/Navbar.js';
import themeFile from './util/theme.js';
import AuthRoute from './util/AuthRoute.js';
//Redux Imports
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {SET_AUTHENTICATED} from './redux/types.js';
import {logoutUser, getUserData} from './redux/actions/userAction.js'
import axios from 'axios';
import user from './pages/user.js';
//import userModal from './pages/userModal.js';
//import userWIthDialog from './pages/userWithDialog.js';


export const history = createHistory();
const theme = createMuiTheme(themeFile);
axios.defaults.baseURL = 'https://us-central1-rooster-a8505.cloudfunctions.net/api';
//let authenticated = false;
//console.log(localStorage)
const token = localStorage.FbIdToken;
 console.log(token);
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp*1000 < Date.now()){
    
    store.dispatch(logoutUser());
    window.location.href= '/login';
  }
  else {
    store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())

  }
}
else{
  //window.location.href= '/login';
   // authenticated = false;
  console.log("No Token")
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
    <div className="App">
    <Router>
    <Navbar /> 
    <div className="container">
    <Switch>
    <Route exact path="/" component = {home}/> 
    <AuthRoute exact path="/login"  component = {login}/> 
    <AuthRoute exact path="/signup"  component = {signup}/>
    <Route exact path="/users/:handle"  component = {user}/>
    <Route exact path="/users/:handle/screams/:screamId" component = {user}/> 
    <h1>Rooster</h1>
    </Switch>  
    </div> 
    </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
