import React, {Fragment} from 'react';
import NoImage from '../images/default-image.png';
//import theme from './theme.js';
import propTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles= theme => ({
    
    card :{display:'flex', marginBottom: '20'},
    cardContent: {width:'100%', flexDirection:'column', padding:25},
    cover: {minWidth:200, objectFit: 'cover'},
    handle: {width:60, height:20, backgroundColor: theme.palette.primary.main, marginBottom:7},
    date:{height:14, width: 100, backgroundColor: 'rgba(0,0,0,0.3)', marginBottom:10},
    fullline:{height:15, width:'90%', marginBottom:10, backgroundColor: 'rgba(0,0,0,0.6)'},
    halfline:{height:15, width:'50%', marginBottom:10, backgroundColor: 'rgba(0,0,0,0.6)'}
})

function ScreamSkeleton(props) {
    const classes = props.classes;
    const content = Array.from ({length:5}).map((item,index)=>{
       return <Card className={classes.card} key={index}>
       <CardMedia className={classes.cover} image={NoImage}>

       </CardMedia>
       <CardContent className={classes.CardContent}>
<div className={classes.handle}>
</div>
<div className={classes.date}>
</div>
<div className={classes.fullline}>
</div>
<div className={classes.fullline}>
</div>
<div className={classes.halfline}>
</div>
       </CardContent>


       </Card> 
    })
     return(   <Fragment>
{content}
        </Fragment>    

    )
}

ScreamSkeleton.propTypes ={
    classes: propTypes.object.isRequired
}


export default withStyles(styles)(ScreamSkeleton);
