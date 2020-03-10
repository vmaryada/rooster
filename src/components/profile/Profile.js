import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core//styles/withStyles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Paper } from '@material-ui/core';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton.js';
import ProfileSkeleton from '../../util/ProfileSkeleton.js';
//import theme from '../util/theme.js'
import EditDetails from './EditDetails.js'
import { logoutUser, uploadImage } from '../../redux/actions/userAction.js';
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
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})

function Profile(props) {
    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        props.uploadImage(formData);
        console.log(formData);
    }
    const editProfileImage = () => {
        document.getElementById('profileImageUpload').click();
    }
    const logoutUser = () => {
        props.logoutUser();
    }
    console.log(props.user.authenticated);
    console.log(props.user.loading)
    const classes = props.classes;
    let user = {};
    user = { ...props.user.credentials, loading: props.user.loading };
    console.log(user);
    let authenticatedContent = <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className="image-wrapper" style={{ textAlign: 'center' }}>
                <img src={user.imageUrl} className='profile-image' alt="" />
                <input type="file" id="profileImageUpload" onChange={handleImageUpload} hidden="hidden" />
                {/*<Tooltip title="Edit" placement="top">
                    <IconButton onClick={editProfileImage} btnClassName="button" >
                        <EditIcon color="primary" />
                    </IconButton>
</Tooltip> */}
              <MyButton tipTitle="Edit" tipPlacement="top" onClick={editProfileImage} btnClassName="button">
              <EditIcon color="primary" />    
              </MyButton>
            </div>
            <br/>
            <div className="profile-details" style={{ textAlign: 'center' }}>
                <MuiLink component={Link} to={`/users/${user.handle}`} color="primary" variant="h6">@{user.handle}</MuiLink>
                {user.bio && <Typography variant="body2">{user.bio}</Typography>}
<br/>
                {user.location && <Fragment><LocationOn color="primary" /><span>{user.location}</span>
                </Fragment>
                }
                <br/>
                {user.website && <Fragment><LinkIcon color="primary" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer">{` `}{user.website}</a>
                </Fragment>
                }
                <br />
                <br />
                <CalendarToday color="primary" />
                <span>{dayjs(user.createdAt).format('MMM YYYY')}</span>
            </div>
            <EditDetails />
            {/*<Tooltip title="Log Out" placement="top">
                <IconButton onClick={logoutUser} btnClassName="button" >
                    <KeyboardReturn color="primary" />
                </IconButton>
            </Tooltip> */}
            <MyButton tipTitle="Logout" tipPlacement="top" onClick={logoutUser} btnClassName="button">
              <KeyboardReturn color="primary" />    
              </MyButton>
        </div>
    </Paper>;
    let unAuthenticatedContent = <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
            No Profile Found. Please Login Again
   </Typography>
        <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="primary" component={Link} to="/signup">signup</Button>
        </div>
    </Paper>
    console.log(dayjs(user.createdAt).format('MMM YYYY'));
    return (
        <div>
            {user.loading ? <ProfileSkeleton /> : props.user.authenticated ? authenticatedContent : unAuthenticatedContent}
        </div>
    )
}
const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionstoProps = { logoutUser, uploadImage };

Profile.propTypes = {
    user: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    logoutUser: propTypes.func.isRequired,
    uploadImage: propTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionstoProps)(withStyles(styles)(Profile))
