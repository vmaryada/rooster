import React, { useState, useEffect, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../../util/MyButton.js';
//import { postScream } from '../../redux/actions/dataAction.js';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import { IconButton, Tooltip } from '@material-ui/core';
import UnFoldMore from '@material-ui/icons/UnfoldMore'
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataAction.js';
import Comments from './Comments.js';
//import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LikeButton from '../screams/LikeButton.js';
import PostComment from './PostComment.js';
const styles = theme => ({
    ...theme.spreadableObject,
    postDialog: {
        position: 'relative'
    },
    closeIcon: {
        top: '10%',
        left: '90%',
        position: 'absolute'
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: '20px'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    }
});

function ScreamDialog(props) {
    console.log('Scream Dialog component called');
    console.log(props);
    const [state, setState] = useState({ body: '', errors: {} });
    const [open, setOpen] = useState(false);
    //const newPath = '';
    //let oldPath = '';
    //let test = '';
    const [oldPath, setOldPath] = useState('');
    //const [newPath, setNewPath]= useState('');
    /*const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }*/
    useEffect(() => {
      console.log('use effect in scream Dialog');
        if (props.openDialog) {
            handleClickOpen();
        }
  //  }, [open])
    },[props.showDialog])  
  const handleClickOpen = () => {
        setOpen(true);
        //console.log(open);
        props.getScream(props.screamId);

        const oldPathVar = window.location.pathname
        console.log(oldPathVar);

        const newPath = `/users/${props.userHandle}/screams/${props.screamId}`;
        if (oldPathVar === newPath) {
            setOldPath(`/users/${props.userHandle}`)
        }
        else {
            setOldPath(window.location.pathname);
        }
        //setNewPath(newPathVar);
        console.log(newPath);
        window.history.pushState(null, null, newPath);
        //window.history.pushState(null, null, `/users/`)
    };
    const handleClose = () => {

        console.log(oldPath);
        window.history.pushState(null, null, oldPath);
        setState({ ...state, body: '', errors: {} })
        setOpen(false);

    };

    const classes = props.classes;
    const scream = props.scream;
    const loading = props.UI.loading;
    const dialogMarkup = loading ? <div style={{ textAlign: 'center', marginTop: '50', marginBottom: '50' }}> <CircularProgress size={200} thickness={2} /> </div> : (<Grid container spacing={2}>
        <Grid item sm={5}>
            <img src={scream.userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
            <Typography component={Link} color="primary" variant="h5" to={`/users/${scream.userHandle}`}>@{scream.userHandle}</Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography color="primary" variant="body2">{dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography color="primary" variant="body1">{scream.body}</Typography>
            <LikeButton screamId={props.screamId} />
            <span>{props.scream.likeCount} Likes</span>
            <MyButton tipTitle='Comments'>
                <ChatIcon color="primary" />
            </MyButton>
            <span>{props.scream.commentCount} Comments</span>
        </Grid>

        <Comments comments={props.scream.comments} />
    </Grid>)
    //useEffect(()=>{
    //console.log('Scream Dialog')
    //},[props.screams])
    return (
        <Fragment>
            <MyButton tipTitle="Expand Scream" onClick={handleClickOpen} tipClassName={classes.expandButton}>
                <UnFoldMore color="secondary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className={classes.postDialog}>

                <DialogTitle>
                    Scream Details
        </DialogTitle>
                <CloseIcon onClick={handleClose} className={classes.closeIcon} />
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
                {/*} <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
    </DialogActions> */}
                <PostComment screamId={props.screamId} />
            </Dialog>
        </Fragment>

    )
}

ScreamDialog.propTypes = {
    getScream: propTypes.func.isRequired,
    screamId: propTypes.string.isRequired,
    userHandle: propTypes.string.isRequired,
    scream: propTypes.object.isRequired,
    UI: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.ui,
    scream: state.data.scream,
    screams: state.data.screams,
    showDialog: state.data.showDialog
})
const mapActionsToProps = {
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));