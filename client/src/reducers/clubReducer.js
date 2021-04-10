
export const clubRegisterReducer = (state={},action)=>{
    switch(action.type){
        case 'CLUB_REGISTER':
            return {loading:true}

        case 'CLUB_REGISTER_SUCCESS':
            return {loading:false, clubInfo:action.payload}
            
        case 'CLUB_REGISTER_FAIL':
            return {loading:false, error:action.payload}
        case 'CLUB_RESISTER_RESET':
            return {}    
        default:
            return state    
    }
}