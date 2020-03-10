import React, {Fragment, useState} from 'react'
//import withStyles from '@material-ui/core/styles/withStyles';
//import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
//import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { markNotificationsRead } from '../../redux/actions/userAction.js';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//import LikeButton from './LikeButton.js';
//import DeleteScream from './DeleteScream.js';
//import MyButton from '../../util/MyButton.js';
//import ScreamDialog from './ScreamDialog.js';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
//import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

function Notifications(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const notifications = props.notifications;
    dayjs.extend(relativeTime);
    const handleOpen = event => {
setAnchorEl(event.target);
    }
    const handleClose = () => {
setAnchorEl(null);
    }
  const onMenuOpened = () =>{
let unReadNotificationIds = props.notifications.filter(notif => !notif.read).map(notif=>notif.notificationId)
    props.markNotificationsRead(unReadNotificationIds);

    }
    let notificationsIconMarkup;
    if(notifications && notifications.length > 0)
    {
        notifications.filter(notif=>notif.read === false).length > 0 ?
        notificationsIconMarkup = (<Badge badgeContent= {notifications.filter(notif=>notif.read === false).length}>
<NotificationsIcon/> 
        </Badge>)
        :
        (notificationsIconMarkup = <NotificationsIcon/>)
    }
    else {
        notificationsIconMarkup = <NotificationsIcon/>  
    }
    const notificationsMarkup = (notifications && notifications.length >0) ? (
        notifications.map(notif => {
           const textMarkup = notif.type === 'like'? 'liked' : 'commented on';
           const time = dayjs(notif.createdAt).fromNow();
           const iconColor = notif.read? 'primary': 'secondary';
           const notifIcon = notif.type === 'like'? <FavoriteIcon color={iconColor} style={{marginRight: 10}}/> 
           : 
           <ChatIcon color={iconColor} style={{marginRight: 10}} />
        
        return (
            <MenuItem key={notif.createdAt} onClick = {handleClose} >
            {notifIcon} <Typography component={Link} to={`/users/${notif.recipient}/screams/${notif.screamId}`}>
            {notif.sender} {textMarkup} your scream {time}
            </Typography>
            </MenuItem>
        )
        }))
        : 
        (<MenuItem onClick ={handleClose} >You have No Notifications</MenuItem>)

    
    return (
        <Fragment>
        <Tooltip placement="top" title="Notifications">
         <IconButton aria-owns={ anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={handleOpen}>
             {notificationsIconMarkup}
        </IconButton>   
        </Tooltip>
        <Menu anchorEl={anchorEl} open={ Boolean(anchorEl)} onClose={handleClose} onEntered = {onMenuOpened}>
        {notificationsMarkup}
        </Menu>
        </Fragment>    

    )
    }

Notifications.propTypes = {
    markNotificationsRead: propTypes.func.isRequired,
    //unlikeNotifications: propTypes.func.isRequired,
    notifications: propTypes.array.isRequired,
   // classes: propTypes.object.isRequired,
    
}
const mapStateToProps = state => ({
    notifications: state.user.notifications
})
const mapActionsToProps = {
    markNotificationsRead
}
export default connect(mapStateToProps, mapActionsToProps)(Notifications);
