import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types.js';
import axios from 'axios';
/*-------Log In----------------------------*/
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            const FbIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FbIdToken', FbIdToken);
            axios.defaults.headers.common['Authorization'] = FbIdToken;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            /*  setState({
                 ...state, loading : false
              });*/
            history.push(`/`);
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};
/*-------Signup User----------------------------*/
export const signUpUser = (signUpData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/signup', signUpData).then(res => {
        const FbIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FbIdToken', FbIdToken);
        axios.defaults.headers.common['Authorization'] = FbIdToken;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push(`/`);
    }).catch(err => {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
};

/*-------Log Out----------------------------*/
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FbIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}
/*-------Get User Data----------------------------*/
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user').then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
        .catch(err => console.log(err));
};
/*-------Edit Profile Image----------------------------*/
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    console.log(formData)
    axios.post(`/user/image`, formData)
        .then(res => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}
/*-------Edit User Details----------------------------*/
export const editUserDetails = (editData) => (dispatch) => {
    console.log(editData)
    dispatch({type:LOADING_USER});
  axios.post(`/user`, editData)
  .then(res=>{
      dispatch(getUserData());
  }).catch(err=>console.log(err))

} 

export const markNotificationsRead = (notificationIds) => dispatch => {
axios.post(`/notifications/`, notificationIds)
.then(()=>{
dispatch({type:MARK_NOTIFICATIONS_READ})
})
.catch(err=> {
console.log(err);
})
}