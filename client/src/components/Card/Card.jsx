import style from './Card.module.css';
import {Link} from 'react-router-dom';

// {genres.map((genre,index)=> <p key= {index}>{genre}</p>)}
const Card = ({id,name,image,genres}) => {
  return (
    <div className = {style.card}>
      <img className = {style.image} src={image} alt={name} />
      <Link to={`/detail/${id}`}>{name}</Link>
      <br />
      <p>Genres: {genres.join(', ')}</p>
    </div>
  );
};

export default Card;