import './App.css';
import {Route,useLocation} from 'react-router-dom';
import {Landing,Home,Form,Detail} from './views/index.js';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname !== '/' && <NavBar/>}
      <Route exact path = '/' component = {Landing}/>
      <Route path = '/home' component = {Home}/> {/*pasar props aqui inmediatamente despues de Home*/}
      <Route path = '/form' component ={Form}/>
      <Route path = '/detail/:id' component ={Detail}/>
    </div>
  );
}

export default App;
