import React, {useEffect ,useState} from 'react'
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import rooster from '../images/rooster.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import axios from 'axios';
import {signUpUser} from '../redux/actions/userAction.js';
import {connect} from 'react-redux';
const styles = (theme) => ({
    ...theme.spreadableObject
 })


 function SignUp(props) {
const [state, setState] = useState({email:"", password:"", password2:"", handle:"", loading:false, errors: {}});

 const handleSubmit = (event) => {
   event.preventDefault();

  // setState({...state, loading: true});
   const signUpData = {
       email : state.email,
       password : state.password,
       confirmPassword: state.password2,
       handle: state.handle
   }
   console.log(signUpData);
   console.log(state);
  props.signUpUser(signUpData, props.history);
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
        <Grid item sm style={{paddingLeft:20, paddingRight: 20}}>
        <img src={rooster} alt="" width='100' className={classes.image}/>
        <Typography variant="h4" className={classes.pageTitle}>Sign Up</Typography>
        <form noValidate onSubmit = {handleSubmit} autoComplete="off">

        <TextField id="email" name="email" type="email" helperText={state.errors.email} error = {state.errors.email ? true : false}
         label="Email" className={classes.textField} onChange={handleChange} fullWidth/>

        <TextField id="password" name="password" type="password" helperText = {state.errors.password}
         error = {state.errors.password ? true : false} label="Password" className={classes.textField} onChange={handleChange} fullWidth/>

        <TextField id="password2" name="password2" type="password" helperText = {state.errors.passwordMatch}
         error = {state.errors.passwordMatch ? true : false} label="Confirm Password" className={classes.textField} onChange={handleChange} fullWidth/>
        
        <TextField id="handle" name="handle" type="text" helperText = {state.errors.handle}
         error = {state.errors.handle ? true : false} label="User Handle" className={classes.textField} onChange={handleChange} fullWidth/>  

        {state.errors.general ? <Typography variant="h5" className= {classes.customError}>{state.errors.general}</Typography> : <span></span> }
        {state.errors.error === 'auth/user-not-found' ? <Typography variant="h5" className= {classes.customError}>User Not Found</Typography> : <span></span> }
        {!props.UI.loading ? <Button type="submit" variant="contained" className={classes.button}>Sign Up</Button>
         : <span style={{display:'flex', justifyContent: 'center'}}><br/><CircularProgress size={30}
          className={classes.spinner}></CircularProgress></span>}
        <br/>
        <br/>
        <small>Already have an account? <Link to="/login">Login here</Link></small>
        </form>
        </Grid>
        <Grid item sm/>
        </Grid>
    )
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI: state.ui
})
const mapActionsToProps = {
    signUpUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignUp));
