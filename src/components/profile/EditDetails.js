import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../../util/MyButton.js'
//import DialogContentText from '@material-ui/core/DialogContentText';
//import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userAction.js'
const styles = (theme) => ({
    ...theme.spreadThis
})

function EditDetails(props) {
    const [state, setState] = useState({ bio: '', website: '', location: '', open: false });
    const [open, setOpen] = React.useState(false);
    const classes = props.classes;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleSubmit = () => {
        const editData = {
            bio: state.bio,
            website: state.website,
            location: state.location
        }
        props.editUserDetails(editData);
        handleClose();
    }
    useEffect(() => {
        setState({
            ...state,
            bio: props.credentials.bio ? props.credentials.bio : '',
            website: props.credentials.website ? props.credentials.website : '',
            location: props.credentials.location ? props.credentials.location : ''
        })
    }, [props.credentials])
    return (
        <div>
            <MyButton tipTitle="Edit Details" tipPlacement="top" onClick={handleClickOpen} btnClassName="button">
              <EditIcon color="primary" />    
              </MyButton>
            {/*<Tooltip title="Edit Details" placement="top" style={{float:'right'}}>
                <IconButton onClick={handleClickOpen}>
                    <EditIcon></EditIcon>
                </IconButton>
    </Tooltip> */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm">
                <DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" autoFocus id="bio" name="bio" label="Bio" onChange={handleChange} type="text" className={classes.TextField} fullWidth value={state.bio} />
                    <TextField margin="dense" id="website" name="website" label="Website" onChange={handleChange} className={classes.TextField} type="text" fullWidth value={state.website} />
                    <TextField margin="dense" id="location" name="location" label="Location" onChange={handleChange} className={classes.TextField} type="text" fullWidth value={state.location} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
const mapActionstoProps = { editUserDetails };
const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})
EditDetails.propTypes = {
    editUserDetails: propTypes.func.isRequired,
    classes: propTypes.object.isRequired
}
export default connect(mapStateToProps, mapActionstoProps)(withStyles(styles)(EditDetails))
