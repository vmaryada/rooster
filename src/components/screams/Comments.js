import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
const styles= theme => ({
    ...theme.spreadableObject,
commentImage : {
    maxWidth: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
},
commentData: {
    marginLeft: '20px'
}
})
function Comments(props) {
    console.log(props);
    const comments = props.comments;
    const classes = props.classes;
    return (
       
        <Grid container>
        {comments.map((comment, index)=>{
            const {body, createdAt, userImage, userHandle} = comment;
            return(
                <Fragment key={createdAt}>
                <Grid item sm={12}>
                <Grid container>
                <Grid item sm={2}>
                <img src={userImage} alt="User Image" className={classes.commentImage}/>
                </Grid>
                <Grid item sm={9}>
                <div className={classes.commentData}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                {userHandle}
                </Typography>
                <Typography variant="body2"  color="primary">
                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2"  color="primary">{body} </Typography>
                </div>
                </Grid>
                </Grid>
                </Grid> 
              {index !== (comments.length -1) ?   <hr className={classes.visibleSeparator} /> : <span></span> }
                </Fragment>
            )
        })}
        </Grid>
    )
}

Comments.propTypes = {
    comments: propTypes.array.isRequired
}

/*const mapStateToProps = (state) => ({
    UI: state.ui,
    scream: state.data.scream
})
const mapActionsToProps = {
    getScream
}*/

export default withStyles(styles)(Comments);
