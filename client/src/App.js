import React,{createContext} from 'react'
import "./App.css";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Login from  './components/Login';
import Signup from './components/Signup';
import HomeScreen from './components/HomeScreen';
import IndexScreen from './components/IndexScreen';
import ExploreScreen from './components/ExploreScreen';
import Header from './components/Header';
import AddClub from './components/AddClubScreen';
import ShowAllClubScreen from './components/ShowAllClubScreen';
// import Footer      from './components/Footer';
import ClubProfileScreen from './components/ClubProfileScreen';

export const UserContext = createContext();


const App=()=> {

  return (
    <Router>
      <Header/>
      <main>
        <Switch>
          <Route path='/index' component={IndexScreen}/>
          <Route path='/explore' component={ExploreScreen} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/signup' component={Signup} exact/>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/browse' component={ClubProfileScreen} exact/>
          <Route path='/addClub' component={AddClub} exact/>
          <Route path='/clubInfo/:clubId' component={ClubProfileScreen} />
          <Route path='/showAllclub/:clubType' component={ShowAllClubScreen}  />
      </Switch>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
