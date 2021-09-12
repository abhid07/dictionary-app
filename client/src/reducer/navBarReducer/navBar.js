import {GET_SEARCH_QUERY} from '../../actions/navBarActions/navBarAction'

let initialState = {
    search:""
}

export const navBar=(state=initialState,action)=>{
    switch(action.type){
        case GET_SEARCH_QUERY:
        return{
            ...state,
            search:action.payload
        };
        default:
            return state
    }
} 