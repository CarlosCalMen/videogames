import {Link,useLocation} from 'react-router-dom';
import Filters from '../Filters/Filters.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import style from './NavBar.module.css';

const NavBar = () => {
  const {pathname} = useLocation();
  return (
    <div className = {style.bar}>
      <Link to='/home'>Home</Link>
      <Link to='/form'>Create</Link>
      {pathname ==='/home' && <Filters />}
      {pathname ==='/home' && <SearchBar />}

    </div>
  )
}

export default NavBar