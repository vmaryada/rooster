import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import propTypes from 'prop-types';
import MyButton from '../../util/MyButton.js';
import logo from '../../images/rooster.png'
// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import userReducer from '../redux/reducers/userReducer';

import HomeIcon from '@material-ui/icons/Home';

import Notifications from  './Notifications.js';
import PostScream from '../screams/PostScream.js';


function Navbar(props) {
    const authenticated = props.user.authenticated;

    const authenticatedContent = 
    <Fragment>
    <PostScream />
    <MyButton tipTitle='Home'><Link to='/'><HomeIcon color="secondary"/></Link></MyButton>
    <Notifications />
    
    </Fragment>
   
    const unAuthenticatedContent = 
    <Fragment>
    <Button color="inherit" component = {Link} to = "/">Home</Button> 
    <Button color="inherit" component = {Link} to = "/login">Login</Button>
    <Button color="inherit" component = {Link} to = "/signup">Sign Up</Button> 
    </Fragment>
    return (

        <div>
          
          <AppBar title="Rooster">
 <h3 style={{color:'white', position: 'absolute', left:45, top:0, }}>Rooster</h3><img src={logo} style={{width:35, position:'absolute',left:15, top:14}} alt=""/>
                <Toolbar className="nav-container">
                
                {authenticated? authenticatedContent: unAuthenticatedContent }
                 
                </Toolbar>    
            </AppBar>  
            
        </div>
    )
}



Navbar.propTypes ={ 
    user:propTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    user:state.user
})
export default connect(mapStateToProps)(Navbar);
