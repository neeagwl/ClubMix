export const postRegisterReducer = (state={},action)=>{
    switch(action.type){
        case 'POST_REGISTER':
            return {loading:true}

        case 'POST_REGISTER_SUCCESS':
            return {loading:false,success:true, postInfo:action.payload}
            
        case 'POST_REGISTER_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const getLatestPostReducer = (state={latestPosts:[]},action)=>{
    switch(action.type){
        case 'GET_LATEST_POST_REQ':
            return {loading:true}

        case 'GET_LATEST_POST_SUCCESS':
            return {loading:false,success:true, latestPosts:action.payload}
            
        case 'GET_LATEST_POST_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}