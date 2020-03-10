import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
//import EditIcon from '@material-ui/icons/Edit';
//import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Paper } from '@material-ui/core';
import dayjs from 'dayjs';
//import MyButton from '../../util/MyButton.js'
//import theme from '../util/theme.js'
//import EditDetails from './EditDetails.js'
//import { logoutUser, uploadImage } from '../../redux/actions/userAction.js';
const styles = (theme) => ({
    ...theme.spreadThis,
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 150,
            height: 150,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        
    }
   
})

function StaticProfile(props) {
    
   // const classes = props.classes;
    
    const classes = props.classes;
    const profile = props.profile;
    return (
        <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className="image-wrapper" style={{ textAlign: 'center' }}>
                <img src={profile.imageUrl} className='profile-image' alt="" />
            </div>
            <br/>
            <div className="profile-details" style={{ textAlign: 'center' }}>
                <MuiLink component={Link} to={`/users/${profile.handle}`} color="primary" variant="h6">@{profile.handle}</MuiLink>
                {profile.bio && <Typography variant="body2">{profile.bio}</Typography>}
<br/>
                {profile.location && <Fragment><LocationOn color="primary" /><span>{profile.location}</span>
                </Fragment>
                }
                <br/>
                {profile.website && <Fragment><LinkIcon color="primary" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">{` `}{profile.website}</a>
                </Fragment>
                }
                <br />
                <br />
                <CalendarToday color="primary" />
                <span>{dayjs(profile.createdAt).format('MMM YYYY')}</span>
            </div>
            
        </div>
    </Paper>
    )
}
/*const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionstoProps = { logoutUser, uploadImage };*/

StaticProfile.propTypes = {
    profile: propTypes.object.isRequired,
    classes: propTypes.object.isRequired
    //logoutUser: propTypes.func.isRequired,
    //uploadImage: propTypes.func.isRequired
}

export default (withStyles(styles)(StaticProfile))
