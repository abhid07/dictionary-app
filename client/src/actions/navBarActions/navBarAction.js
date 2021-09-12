export const GET_SEARCH_QUERY = " GET_SEARCH_QUERY "

export const getUserSearch = (payload) =>{
    return{
        type:GET_SEARCH_QUERY,
        payload:payload
    }
}