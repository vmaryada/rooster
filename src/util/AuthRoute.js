import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const  AuthRoute = ({component: Component  , authenticated, ...rest}) => (

<Route 
{...rest}
render={(props) => authenticated=== true ? <Redirect to ='/'/> : <Component {...props}/>}
/>
)

const mapStatetoProps = (state)=> ({
    authenticated: state.user.authenticated
})

AuthRoute.propTypes ={
    authenticated: propTypes.bool.isRequired
}

export default connect(mapStatetoProps)(AuthRoute)
