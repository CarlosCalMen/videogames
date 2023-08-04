import Card from '../Card/Card.jsx';
import style from './CardsContainer.module.css';

const CardsContainer = ({videogames}) => {
  return (
      <div className = {style.cards}>
        {videogames?.map((videogame,index)=>{
          return (
                  <Card 
                    key = {index}
                    id = {videogame.id}
                    name = {videogame.name}
                    image = {videogame.image}
                    genres = {videogame.genres}
                  />)  
        })}
    </div>
  );
};

export default CardsContainer;