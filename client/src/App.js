import React,{createContext} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import HomeScreen from './components/HomeScreen';


export const UserContext = createContext();


const App=()=> {

  return (
    <Router>
      <Header/>
      <main>
        <Switch>
          <Route path='/' component={HomeScreen} exact/>
      </Switch>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
