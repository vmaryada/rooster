import React from 'react'
import MyButton from '../../util/MyButton.js';
import Dialog from '@material-ui/core/Dialog';
import propTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import { deleteScream } from '../../redux/actions/dataAction.js';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';


const styles = {
    deleteButton: {
        top: '10%',
        left: '90%',
        position: 'absolute'
    }
}
function DeleteScream(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteScream = () => {
        props.deleteScream(props.screamId);
        setOpen(false);
    }
    const classes = props.classes;
    return (
        <div>
            <MyButton tipTitle="Delete Scream" style={{ float: 'right' }} onClick={handleClickOpen} btnClassName={classes.deleteButton}>
                <DeleteIcon color="secondary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">

                <DialogTitle>
                    Are you Sure?
      </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deleteScream} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
const mapActionsToProps = {
    deleteScream
}

DeleteScream.propTypes = {
    deleteScream: propTypes.func.isRequired,
    classes: propTypes.object.isRequired,
    screamId: propTypes.string.isRequired
}

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream));
