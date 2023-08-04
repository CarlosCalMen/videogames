import style from './Landing.module.css';
import {useDispatch,useSelector} from 'react-redux';
import {useEffect,useState} from 'react';
import { getGenres,getAllVideogames } from '../../redux/actions.js';
import { useHistory } from 'react-router-dom';


const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const videogames = useSelector(state=>state.allVideogames);
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    dispatch(getAllVideogames()); 
    dispatch(getGenres());
  },[dispatch]); 
  
  useEffect(() => {
    if (videogames.length)
      setLoading(false);
  },[videogames]);  

  const handlerClick = () =>{
    history.push('/home');    
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.imagen}/>
          <h1>Welcome to Videogames API</h1>
          <button onClick={handlerClick} disabled={!videogames.length}>Get in....</button>
          {loading&&<p>Loading....</p>}
      </div>
    </div>
  )
}

export default Landing;