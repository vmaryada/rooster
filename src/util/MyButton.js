import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

function MyButton(props) {
    const children = props.children;
    const onClick = props.onClick;
    const tipTitle = props.tipTitle;
    const tipPlacement = props.placement;
    const tipClassName = props.tipClassName;
    const btnClassName = props.btnClassName

    return (
        <Tooltip title={tipTitle} className={tipClassName} placement={tipPlacement}>
            <IconButton className={btnClassName} onClick={onClick}>
            {children}    
            </IconButton>    
        </Tooltip>
    )
}

export default MyButton
