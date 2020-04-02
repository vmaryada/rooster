import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { likeScream, unlikeScream } from '../../redux/actions/dataAction.js';
import ChatIcon from '@material-ui/icons/Chat';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LikeButton from './LikeButton.js';
import DeleteScream from './DeleteScream.js';
import MyButton from '../../util/MyButton.js';
import ScreamDialog from './ScreamDialog.js';

const styles = {
    card: {
        position: 'relative',
        display: "flex",
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: "cover",
        display: "block"
    }
}

function Scream(props) {
    console.log('scream component called');
    /*const likedScream = () => {
        if (props.user.likes && props.user.likes.find(like => like.screamId === props.screamData.screamId)) {
            return true
        }
        else { return false; }
    }; */
   /* const likeScream = () => {
        props.likeScream(props.screamData.screamId)
    }
    const unlikeScream = () => {
        props.unlikeScream(props.screamData.screamId)
    } */
    //  console.log(props.screamData);
    const classes = props.classes;
    const userImage = props.screamData.userImage;
    const userHandle = props.screamData.userHandle;
    const body = props.screamData.body;
    const createdAt = props.screamData.createdAt;
    const likeCount = props.screamData.likeCount;
    const commentCount = props.screamData.commentCount;
   // var currentScream = props.screams.filter((scream)=>(scream.screamId === props.screamData.screamId));
   // console.log(currentScream);
    //console.log(commentCount);
    const screamId = props.screamData.screamId;
    const authenticated = props.user.authenticated;
    //const comments = props.screamData.comments;
   // console.log(comments);
    // console.log(props.user);
    const userHandlefromUserReducer = props.user.credentials.handle
    dayjs.extend(relativeTime)
    /*const likeButton = !authenticated ? (<MyButton tipTitle="like"><Link to="/login"><FavoriteBorderIcon color="primary" /></Link></MyButton>)
        :
        (likedScream() ? <MyButton tipTitle="Unlike Scream" onClick={unlikeScream}><FavoriteIcon /></MyButton>
            :
            <MyButton tipTitle="Like Scream" onClick={likeScream}><FavoriteBorderIcon /></MyButton>
        )*/
    const deleteButton = authenticated && userHandle === userHandlefromUserReducer ? (<DeleteScream screamId={screamId} />) : null
    return (

        <div>
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image}></CardMedia>
                <CardContent className={classes.content}>
                    <Typography varinat="h3" component={Link} to={`/users/${userHandle}`} color={"primary"}>{userHandle}</Typography>
                    {deleteButton}
                    <br />
                    <Typography varinat="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <br />
                    <Typography varinat="h5" color={"textPrimary"}>{body}</Typography>
                    <LikeButton screamId = {screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tipTitle='Comments'>
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} likeCount = {likeCount} commentCount = {commentCount} openDialog = {props.openDialog}  />
                   
                </CardContent>
            </Card>
        </div>
    )
}

Scream.propTypes = {
    likeScream: propTypes.func.isRequired,
    unlikeScream: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    screamData: propTypes.object.isRequired,
    openDialog: propTypes.bool
}
const mapStateToProps = state => ({
    user: state.user,
    screams: state.data.screams
   
})
const mapActionsToProps = {
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));