import style from './Detail.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams,useHistory } from 'react-router-dom';

const URL_BASE = 'http://localhost:3001/videogames';

const Detail = () => {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});
  const history = useHistory();

  useEffect(() => {
      axios.get(`${URL_BASE}/${id}`)
      .then(({data}) => setVideogame(data))
      .catch((error)=>{
        alert(error.response.data.error)
      })
  },[id]);

  const handlerClick = () =>{
    history.push('/home');    
  };

  return (
    <>
      <h1 className={style.title}>{videogame.name}</h1>
      <div className={style.mainContainer}>
        <div className ={style.imageContainer}>
            <img className={style.image} src={videogame.image} alt={videogame.name} />
        </div>
        <div className ={style.dataContainer}>
            <h4>Id: {videogame.id}</h4>
            <h4>Platforms: </h4>
            <h4>  {videogame.platforms?.join(', ')}</h4>
            <h4>Release date: {videogame.released}</h4>
            <h4>Rating: {videogame.rating}</h4>
            <h4>Genres: {videogame.genres?.join(', ')}</h4>
        </div>
        <div className ={style.descriptionContainer}>
            <h5>{videogame.description ? videogame.description.replace(/<[^>]*>/g, '') :null}</h5>
        </div>
      </div>
      <button onClick={handlerClick}>Close</button>
    </>
  );
};

export default Detail;
