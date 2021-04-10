import React,{createContext} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Login       from  './components/Login';
import Signup      from './components/Signup';
import Header from './components/Header';
import AddClub from './components/AddClubScreen';

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
      </Switch>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
