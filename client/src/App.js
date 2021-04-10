import React,{createContext} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Login       from  './components/Login';
import Signup      from './components/Signup';
import Header from './components/Header';
import AddClub from './components/AddClubScreen';
import IndexScreen from './components/IndexScreen';
import ShowAllClubScreen from './components/ShowAllClubScreen';
import ClubProfileScreen from './components/ClubProfileScreen';
import Explore from './components/Explore';

export const UserContext = createContext();


const App=()=> {

  return (
    <Router>
        <Header/>
      <main>
        <Switch>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/signup' component={Signup} exact/>
          <Route path='/addClub' component={AddClub} exact/>
          <Route path='/explore' component={Explore} exact />
          <Route path='/index' component={IndexScreen}/>
          <Route path='/clubInfo/:clubId' component={ClubProfileScreen} />
          <Route path='/showAllclub/:clubType' component={ShowAllClubScreen}  />
      </Switch>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
