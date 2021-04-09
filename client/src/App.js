import React,{createContext} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Login       from  './components/Login';
import Signup      from './components/Signup';


export const UserContext = createContext();


const App=()=> {

  return (
    <Router>
      <main>
        <Switch>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/signup' component={Signup} exact/>
      </Switch>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
