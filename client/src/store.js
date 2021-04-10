import {combineReducers,applyMiddleware, createStore,compose} from 'redux';
import thunk from 'redux-thunk';
import {userLoginReducer, userRegisterReducer} from './reducers/userReducer';
import {clubRegisterReducer} from './reducers/clubReducer';
import {postRegisterReducer, getLatestPostReducer} from './reducers/postReducer';
import {eventRegisterReducer, getCurrEventReducer, getUpcomingEventReducer} from './reducers/eventReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    currEventList : getCurrEventReducer,
    latestPostList : getLatestPostReducer,
    clubRegister: clubRegisterReducer,
    postRegister:postRegisterReducer,
    eventRegister:eventRegisterReducer,
    upcomingEventsList : getUpcomingEventReducer,
    
});


const userInfoFromStorage = localStorage.getItem('userInfo')? 
JSON.parse(
    localStorage.getItem('userInfo'))
    :null
  

const clubInfoFromStorage = localStorage.getItem('clubInfo')? 
    JSON.parse(
        localStorage.getItem('clubInfo'))
        :null

const postInfoFromStorage = localStorage.getItem('postInfo')? 
    JSON.parse(
        localStorage.getItem('postInfo'))
        :null
    
        
const eventInfoFromStorage = localStorage.getItem('eventInfo')? 
JSON.parse(
    localStorage.getItem('eventInfo'))
    :null

        // iske aage ka dekh le
const initialState={
    
    userLogin: {userInfo: userInfoFromStorage},
    // clubRegister: {clubInfo:clubInfoFromStorage}
};

const composeEnhancers=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    reducer,
    initialState, 
    composeEnhancers(applyMiddleware(thunk))
)

export default store