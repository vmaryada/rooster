import React, {Fragment} from 'react'
import MyButton from '../../util/MyButton.js';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../../redux/actions/dataAction.js';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {};
function LikeButton(props) {
   
    const authenticated = props.user.authenticated;
    const likedScream = () => {
        if (props.user.likes && props.user.likes.find(like => like.screamId === props.screamId)) {
            return true
        }
        else { return false; }
    };
    
    const likeScream = () => {
        props.likeScream(props.screamId)
    }
    const unlikeScream = () => {
        props.unlikeScream(props.screamId)
    } 
    
    const likeButton = !authenticated ? (<MyButton tipTitle="like"><Link to="/login"><FavoriteBorderIcon color="primary" /></Link></MyButton>)
        :
        (likedScream() ? <MyButton tipTitle="Unlike Scream" onClick={unlikeScream}><FavoriteIcon /></MyButton>
            :
            <MyButton tipTitle="Like Scream" onClick={likeScream}><FavoriteBorderIcon /></MyButton>
        )
    return (
        <Fragment>
        {likeButton}    
        </Fragment>
    )
}

LikeButton.propTypes = {
    likeScream: propTypes.func.isRequired,
    unlikeScream: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    screamId: propTypes.string.isRequired
}
const mapStateToProps = state => ({
    user: state.user
})
const mapActionsToProps = {
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));
