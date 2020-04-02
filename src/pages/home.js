import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
//import axios from 'axios';
import Scream from '../components/screams/Scream.js';
import Profile from '../components/profile/Profile.js';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {getScreams} from '../redux/actions/dataAction.js';
import ScreamSkeleton from '../util/ScreamSkeleton.js';
import Box from '@material-ui/core/Box';
//mport { taggedTemplateExpression } from '@babel/types';
function Home(props) {
const [screams, setScreams] = useState([]);
let recentScreamMarkup;
let loading;
    useEffect(()=> {
 props.getScreams();
  console.log(loading);
},[]);
loading = props.data.loading;
useEffect(()=>{
setScreams(props.data.screams);
console.log(loading);
},[props.data.screams])
recentScreamMarkup = !loading ? (screams.map(screamData => <Scream key={screamData.screamId} screamData={screamData} />)  ) : <ScreamSkeleton/>
    console.log('Home page')
    
        return (
            <div>
             
           
            <Grid container spacing={3} alignContent="center" justify="center">
            <Grid component={Box} item xs={11}  display = {{xs:'block', md:'none'}} ><Profile /></Grid>
            <Grid item sm={8} xs = {11}>
           {recentScreamMarkup}
            </Grid>
            <Grid component={Box} item sm={4}  display = {{xs:'none', md:'block'}} >
            <Profile />
            </Grid>
            </Grid>
            
            </div>
        )
    
}
const mapStateToProps = (state) => ({
   data: state.data
})

const mapActionsToProps = {
   getScreams : getScreams

}
Home.propTypes = {
    getScreams: propTypes.func.isRequired,
    data: propTypes.object.isRequired
}
export default connect(mapStateToProps, mapActionsToProps)(Home)

