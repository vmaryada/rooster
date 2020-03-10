import React from 'react'
import { Paper } from '@material-ui/core';
import NoImage from '../images/default-image.png';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
}
, profileImage: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%'
},
fullline:{height:15, width:'80%', marginBottom:10, backgroundColor: 'rgba(0,0,0,0.6)', margin: 15},
halfline:{height:15, width:'80%', marginBottom:10, backgroundColor: 'rgba(0,0,0,0.4)', margin: 15},
date:{height:14, width: 100, backgroundColor: 'rgba(0,0,0,0.3)', margin:15},
profile: {padding: 20}

}
function ProfileSkeleton(props) {
  
const classes = props.classes;
    return (
        <div>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className={classes.imageWrapper} style={{ textAlign: 'center' }}>
                        <img src={NoImage} className={classes.profileImage} alt="" />
                    </div>
                    <br />
                    <div className={classes.handle}>
                    </div>
                    <div className={classes.date}>
                    </div>
                    <div className={classes.fullline}>
                    </div>
                    <div className={classes.halfline}>
                    </div>
                   
                </div>
            </Paper>;
        </div>
    )
}

export default withStyles(styles)(ProfileSkeleton);
