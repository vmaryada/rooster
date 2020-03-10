import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import rooster from '../images/rooster.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import axios from 'axios';
//Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction.js';
 
const styles = (theme) => ({
   ...theme.spreadableObject
})


function Login(props) {
const [state, setState] = useState({email:"", password:"",loading:false, errors: {}});
 const handleSubmit = (event) => {
   event.preventDefault();

   //setState({...state, loading: true});
   const userData = {
       "email" : state.email,
       "password" : state.password
   }
   console.log(userData);
   console.log(state);
   props.loginUser(userData, props.history);
  /*axios.post('/login', userData)
   .then(res => {
    localStorage.setItem('FbIdToken', `Bearer ${res.data.token}`);
       setState({
          ...state, loading : false
       });
       props.history.push(`/`);
   })
   .catch(err=> {
       console.log(err.response.data);
       setState({...state, errors : err.response.data, loading: false})
       console.log(state);
   })*/
}
useEffect(() => {
   if(props.UI.errors !== null)
   {
       setState({...state, errors: props.UI.errors})
   }
     },[props.UI.errors])
   

const handleChange = (event) => {
    setState({...state, [event.target.name] : event.target.value});
}
const classes = props.classes;
    return (
        <Grid container className={classes.form} alignContent="center" justify="center">
        <Grid item sm/>
        <Grid item sm>
        <img src={rooster} alt="" width='100' className={classes.image}/>
        <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
        <form noValidate onSubmit = {handleSubmit}>
        <TextField id="email" name="email" type="email" helperText={state.errors.email} error = {state.errors.email ? true : false}
         label="Email" className={classes.textField} onChange={handleChange} fullWidth/>
        <TextField id="password" name="password" type="password" helperText = {state.errors.password}
         error = {state.errors.password ? true : false} label="password" className={classes.textField} onChange={handleChange} fullWidth/>
        {state.errors.general ? <Typography variant="h5" className= {classes.customError}>{state.errors.general}</Typography> : <span></span> }
        {state.errors.error === 'auth/user-not-found' ? <Typography variant="h5" className= {classes.customError}>User Not Found</Typography> : <span></span> }
        {!props.UI.loading ? <Button type="submit" variant="contained" className={classes.button}>Login</Button>
         : <span style={{display:'flex', justifyContent: 'center'}}><br/><CircularProgress size={30}
          className={classes.spinner}></CircularProgress></span>}
        <br/>
        {/*<span style={{display:'flex', justifyContent: 'center'}}><br/><CircularProgress size={30}
          className={classes.spinner}></CircularProgress></span>*/}
        <small>Don't have account? <Link to="/signup">Sign up here</Link></small>
        </form>
        </Grid>
        <Grid item sm/>
        </Grid>
    )
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    user:state.user,
    UI: state.ui
})
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
