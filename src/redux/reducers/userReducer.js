import { SET_USER, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ} from '../types.js';

const initialState = {
    authenticated : false,
    credentials: {},
    likes: [],
    notifications: [],
    loading : false
};

const userReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SET_AUTHENTICATED:
        return {
            ...state,
            authenticated : true,
            loading:false
        };
        case SET_UNAUTHENTICATED: 
        return initialState;
        case SET_USER:
        return {
            authenticated: true,
            loading : false,
            ...action.payload
        }
        case LOADING_USER:
        return {...state, loading: true}
        
        case LIKE_SCREAM:
        console.log('like Scream from userReducer')
        return{
            ...state,
            likes: [...state.likes,{userHandle: state.credentials.handle, screamId: action.payload.screamId}]
        }
        case UNLIKE_SCREAM:
        return{
            ...state, likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
        }

        case MARK_NOTIFICATIONS_READ:
        state.notifications.forEach(notif => notif.read = true);
        return{
            ...state
        }

        default:
        return state;
    }
}

export default userReducer