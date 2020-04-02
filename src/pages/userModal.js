import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Scream from '../components/screams/Scream.js';
import { connect } from 'react-redux';
import { getUserDataFromHandle } from '../redux/actions/dataAction.js';
import Grid from '@material-ui/core/Grid';
import propTypes from 'prop-types';
import StaticProfile from '../components/profile/StaticProfile.js';
import ScreamSkeleton from '../util/ScreamSkeleton.js';
import ProfileSkeleton from '../util/ProfileSkeleton.js';
import Box from '@material-ui/core/Box';
function User(props) {
    console.log('user Modal called');
    console.log(props);
    const [state, setState] = useState({ profile: null, screamIdParam: null })
    useEffect(() => {
        console.log('use effect in UserModal')
        const handle = props.match.params.handle;
        const screamId = props.match.params.screamId;
        console.log(screamId);
        console.log(props);
        if(screamId){
            setState({...state, screamIdParam: screamId})
        }
        props.getUserDataFromHandle(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                setState({ profile: res.data.user })
            })
            .catch(err => {
                console.log(err);
            })
    }, [ props.data.showDialog])
    const screams = props.data.screams;
    const loading = props.data.loading;
    const screamsMarkup = loading ? (<ScreamSkeleton/>)
    : (screams === null? <p>No Screams YET</p>
    : ( state.screamIdParam 
    ? (screams.map(scream=> {
    if(scream.screamId !== state.screamIdParam) {
        console.log('normal Scream page')
        return <Scream key={scream.screamId} screamData={scream}/> }
        else{ console.log('screams page with Dialog');
            return <Scream key={scream.screamId} screamData={scream} openDialog />
            }
    }
    )) : (screams.map(scream =>
        <Scream key={scream.screamId} screamData={scream} />
    ))))
    return (
        <div>
            <Grid container spacing={3} alignContent="center" justify="center">
           
                <Grid component={Box} item xs={11} display={{xs:'block', md:'none'}} >
    { state.profile === null ? <ProfileSkeleton /> : <StaticProfile profile={state.profile} /> }
                </Grid>
              
                <Grid item sm={8} xs={11}>
                    {screamsMarkup}
                </Grid>
                
                <Grid component={Box} item  md={4} display={{xs:'none', md:'block'}} >
    { state.profile === null ? <ProfileSkeleton /> : <StaticProfile profile={state.profile} /> }
                </Grid>
                
            </Grid>
        </div>
    )
}

User.propTypes = {
    getUserDataFromHandle: propTypes.func.isRequired,
    data: propTypes.object.isRequired
}
const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps, { getUserDataFromHandle })(User);