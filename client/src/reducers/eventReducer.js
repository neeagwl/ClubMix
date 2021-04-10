export const eventRegisterReducer = (state={},action)=>{
    switch(action.type){
        case 'EVENT_REGISTER':
            return {loading:true}

        case 'EVENT_REGISTER_SUCCESS':
            return {loading:false,success:true, eventInfo:action.payload}
            
        case 'EVENT_REGISTER_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const getCurrEventReducer = (state={events:[]},action)=>{
    switch(action.type){
        case 'GET_CURR_EVENT_REQ':
            return {loading:true}

        case 'GET_CURR_EVENT_SUCCESS':
            return {loading:false,success:true, events:action.payload}
            
        case 'GET_CURR_EVENT_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const getUpcomingEventReducer = (state={events:[]},action)=>{
    switch(action.type){
        case 'GET_UPCOMING_EVENT_REQ':
            return {loading:true}

        case 'GET_UPCOMING_EVENT_SUCCESS':
            return {loading:false,success:true, events:action.payload}
            
        case 'GET_UPCOMING_EVENT_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}