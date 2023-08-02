import style from './Landing.module.css';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { getGenres,getAllVideogames } from '../../redux/actions.js';
import { useHistory } from 'react-router-dom';


const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllVideogames()); 
    dispatch(getGenres());
  },[dispatch]);  

  const handlerClick = () =>{
    history.push('/home');    
  };

  return (
    <div className={style.container}>
      <div>
        <h1>Welcome to Videogames API</h1>
        <button onClick={handlerClick}>Get in....</button>
      </div>
    </div>
  )
}

export default Landing