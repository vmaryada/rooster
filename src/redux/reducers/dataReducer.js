import {LOADING_DATA, SET_SCREAMS,LIKE_SCREAM, UNLIKE_SCREAM, SET_SCREAM, DELETE_SCREAM, POST_SCREAM, POST_COMMENT, SHOW_DIALOG, HIDE_DIALOG} from '../types.js'

const initialState ={
    screams: [],
    scream :{},
    loading:false,
    showDialog: 0 
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_DATA:
        console.log('loadingData')
        return {
            ...state,
            loading:true
        };
        case SET_SCREAMS:
        console.log('SetScream')
        return {
            ...state,
            screams:action.payload,
            loading: false
        };
       

        case DELETE_SCREAM:
        console.log('delete reducer called');
        //console.log(state);
        //let index2 = state.screams.findIndex(scream => scream.screamId === action.payload);
        //state.screams.splice(index2, 1);
       
        return {
            ...state,
            screams: state.screams.filter(scream => scream.screamId !== action.payload)
        };

        case POST_SCREAM: 
        return {
            ...state,
            screams: [{...action.payload}, ...state.screams]
        }
       
        case SET_SCREAM: 
        return {
            ...state,
            scream: {...action.payload}
        }

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
        let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
        state.screams[index] = action.payload;
        console.log('like Scream from DataReducer')
        return {
        ...state
        };

        case POST_COMMENT: 
        let index2 = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
       // console.log(index2);
        state.screams[index2].commentCount = state.screams[index2].commentCount + 1;
        //console.log(state.screams[index2].commentCount);
        state.scream.commentCount = state.scream.commentCount + 1;
        state.scream.comments = [action.payload, ...state.scream.comments];
        console.log(state);
        return {
            ...state
        }
        case SHOW_DIALOG:
        console.log('show Dialog called');
        return{
            ...state, showDialog: state.showDialog + 1
        }
        /*case HIDE_DIALOG:
        console.log('hide Dialog called');
        return{
            ...state, showDialog: state.showDialog + 1
        }*/
        default:
        return state
    }
}

export default dataReducer
