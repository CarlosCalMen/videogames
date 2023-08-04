import {Link} from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className = {style.bar}>
      <Link to='/home'>Home</Link>
      <Link to='/form'>Create</Link>
    </div>
  )
}

export default NavBar