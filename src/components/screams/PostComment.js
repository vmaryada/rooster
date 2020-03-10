import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import MyButton from '../../util/MyButton.js';
import {postComment} from '../../redux/actions/dataAction.js';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import { IconButton, Tooltip } from '@material-ui/core';
//import EditIcon from '@material-ui/icons/Edit'
//import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
//import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({
...theme.spreadableObject
})


function PostComment(props) {
    const classes = props.classes;
    const[state, setState] = useState({body: '', errors: {}});
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(state.body !== ''){
        props.postComment(props.screamId, {body: state.body});
       // setOpen(false);
        setState({...state, body:'', errors: {}})
        }
       else {
           setState({...state, errors : {body:'Comment Cannot be Empty'}})
       }
         }
    const commentFormMarkup = props.authenticated ? <Fragment>
        <Grid item sm = {12} style={{textAlign: 'center',paddingLeft:20, paddingRight:20, backgroundColor: '#dfe3eb'}}>
        <form onSubmit={handleSubmit}>
        <TextField margin="dense" autoFocus id="body" name="body" label="Enter Comment Here"
         onChange={handleChange} type="text" className={classes.TextField}
          fullWidth value={state.body} 
          style={{}}
          error ={state.errors.body? true : false} 
          helperText = {state.errors.body} 
             />
         <Button type="submit" variant="contained" style={{marginTop:15, marginBottom: 15}} color="primary" className={classes.button}>SUBMIT</Button>    
             </form>
        {/*/} <hr className={classes.visibleSeparator}/> */}
        </Grid>
         </Fragment> : null;

         return(
        <div>
          {commentFormMarkup}  
        </div>
    )
}

PostComment.propTypes = {
    postComment: propTypes.func.isRequired,
    screamId: propTypes.string.isRequired,
  //  userHandle: propTypes.string.isRequired,
   // scream: propTypes.object.isRequired,
    UI: propTypes.object.isRequired,
    authenticated: propTypes.bool.isRequired,
    classes: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.ui,
    authenticated: state.user.authenticated,
    scream: state.data.scream
})
const mapActionsToProps = {
    postComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostComment));

