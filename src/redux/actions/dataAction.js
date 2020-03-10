import{LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM,
     LOADING_UI, CLEAR_ERRORS, SET_ERRORS, POST_SCREAM, SET_SCREAM, STOP_LOADING_UI, POST_COMMENT} from '../types.js';
import axios from 'axios';

export const getScreams = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    console.log('getScreams Function')
    axios.get('/screams')
    .then(res=> {
        console.log('GetScreams Then')
        console.log(res.data)
     dispatch({type:SET_SCREAMS, payload: res.data}
       )
})
    .catch(err=> {
      dispatch({type:SET_SCREAMS, payload: []})
    })
}

export const likeScream = (screamId) => (dispatch)=> {
    axios.get(`/scream/${screamId}/like`)
    .then(res=> {
       dispatch({type:LIKE_SCREAM, payload: res.data}) 
    }).catch(err=>{
        console.log(err)
    })
}
export const unlikeScream = (screamId) => (dispatch)=> {
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=> {
       dispatch({type:UNLIKE_SCREAM, payload: res.data}) 
    }).catch(err=>{
        console.log(err)
    })
}

export const deleteScream = (screamId) => (dispatch)=> {
    console.log(screamId);
    axios.delete(`/scream/${screamId}`)
    .then(()=> {
       dispatch({type: DELETE_SCREAM, payload: screamId}) 
    }).catch(err=>{
        console.log(err)
    })
}

export const postScream = (postScreamData) => (dispatch)=> {
    dispatch({type: LOADING_UI});
    axios.post('/scream', postScreamData)
    .then((res) => {
       dispatch({type:POST_SCREAM, payload:res.data}); 
       dispatch(clearErrors())
    }).catch(err=>{
        dispatch ({type: SET_ERRORS, payload: err.response.data})
    })
}

export const getScream = (screamId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.get(`/scream/${screamId}`)
    .then( res => {
       dispatch ({type: SET_SCREAM, payload: res.data}) 
       dispatch({type: STOP_LOADING_UI})
    })
    .catch(err=> {
        console.log(err);
    })
}

export const postComment = (screamId,commentData) => (dispatch) => {
    //dispatch({type: LOADING_UI});
    axios.post(`/scream/${screamId}/comment`, commentData)
    .then( res => {
       dispatch ({type: POST_COMMENT, payload: res.data}) 
      // dispatch({type: STOP_LOADING_UI})
      dispatch(clearErrors());
    })
    .catch(err=> {
        dispatch({type:SET_ERRORS, payload: err.response.data})
    })
}

export const clearErrors = () => (dispatch)=> {
    dispatch( {type: CLEAR_ERRORS});
}

export const getUserDataFromHandle = (userHandle) => (dispatch)=> {
    dispatch({type:LOADING_DATA});
     axios.get(`/user/${userHandle}`)
     .then(res=> {
         dispatch({type: SET_SCREAMS, payload: res.data.screams})
     })
     .catch(()=> {
        dispatch({type: SET_SCREAMS, payload: null})
     })
}