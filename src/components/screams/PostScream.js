import React, { useState} from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../../util/MyButton.js';
import {postScream} from '../../redux/actions/dataAction.js';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import { IconButton, Tooltip } from '@material-ui/core';
//import EditIcon from '@material-ui/icons/Edit'
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    ...theme.spreadableObject,
    postDialog : {
        position:'relative'
    },
    closeIcon : {
        top: '10%',
        left: '90%',
        position: 'absolute'
    }
});

function PostScream(props) {
   
    const [state, setState] = useState({ body: '', errors: {} });
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setState({...state, body:'', errors: {}})
        setOpen(false);
    };
   const handleSubmit = () => {
    if(state.body !== ''){
    props.postScream(state);
    setOpen(false);
    setState({...state, body:'', errors: {}})
    }
   else {
       setState({...state, errors : {body:'Scream Body Cannot be Empty'}})
   }
     }
    const classes = props.classes;
    return (
        <div>
        <MyButton tipTitle="Add Scream" onClick={handleClickOpen}>
        <AddIcon color="secondary" />    
        </MyButton> 
        <Dialog open ={open} onClose={handleClose} fullWidth maxWidth="sm" className={classes.postDialog}>
     
        <DialogTitle>
            Scream Details
        </DialogTitle>
        <CloseIcon onClick={handleClose}  className={classes.closeIcon}/>
        <DialogContent>
            <TextField margin="dense" autoFocus id="body" name="body" label="Scream Body" onChange={handleChange} type="text"
             className={classes.TextField} fullWidth value={state.body}
             multiline rows="3"
             error ={state.errors.body? true : false} 
             helperText = {state.errors.body} 
             />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>   
        <Button onClick={handleSubmit} color="primary">Submit</Button>   
        </DialogActions>
        </Dialog> 
        </div>   
        
    )
}


PostScream.propTypes = {
    postScream: propTypes.func.isRequired,
    UI : propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.ui
})
const mapActionsToProps = {
    postScream
}

export default connect (mapStateToProps,mapActionsToProps)(withStyles(styles)(PostScream));
