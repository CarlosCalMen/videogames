import style from './Detail.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const URL_BASE = 'http://localhost:3001/videogames';

const Detail = () => {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    axios.get(`${URL_BASE}/${id}`)
    .then(({ data }) =>{
      if (data.name) setVideogame(data);
      else alert(`There is not a videogame with id ${id}`);  
    });
  },[id]);

  return (
    <>
      <h1>This is Detail view</h1>
      <div className={style.detailContainer}>
        <div className={style.imageContainer}>
          <img src={videogame.image} alt={videogame.name} />
        </div>
        <div className={style.dataContainer}>
          <h2>Id: {videogame.id}</h2>
          <h2>{videogame.name}</h2>
          <h2>Platforms: {videogame.platforms?.join(', ')}</h2>
          <h2>{videogame.description}</h2>
          <h2>Release date: {videogame.released}</h2>
          <h2>Rating: {videogame.rating}</h2>
          <h2>Genres: {videogame.genres?.join(', ')}</h2>
        </div>
      </div>
    </>
  );
};

export default Detail;
