import CardsContainer from '../../components/CardsContainer/CardsContainer.jsx';
// import style from './Home.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {useEffect,useState} from 'react';
import { getAllVideogames,
        toogleVideogamesUpdated,
        orderVideogamesByProperty,
        decCurrentPage,
        incCurrentPage } from '../../redux/actions';

const ITEMS_PER_PAGE = 15;
const next = '>';
const previous = '<';

const Home = () => {
  const videogames = useSelector(state=>state.videogamesFiltered);
  const videogamesUpdated = useSelector(state=>state.videogamesUpdated);
  const orderBy=useSelector(state=>state.orderBy);
  const currentPage = useSelector(state=>state.currentPage);
  const [videogamesList,setVideogamesList]=useState([]);
  const dispatch = useDispatch();
  
  useEffect(() =>{
     if (videogamesUpdated){
       dispatch(toogleVideogamesUpdated());
       dispatch(getAllVideogames());
      };
  },[dispatch,videogamesUpdated]); //

  useEffect(()=>{
    dispatch(orderVideogamesByProperty(orderBy));
  },[orderBy,dispatch]);

  useEffect(()=>{
    const aux = [...videogames];
      setVideogamesList(aux.splice((currentPage-1)*ITEMS_PER_PAGE,ITEMS_PER_PAGE)); 
  },[videogames,currentPage]);

const prevPage = () => {
  if (currentPage > 1) {
    dispatch(decCurrentPage());
    const startIndex = (currentPage - 1 ) * ITEMS_PER_PAGE; 
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVideogamesList(videogames.slice(startIndex, endIndex));
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(videogames.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    dispatch(incCurrentPage());
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVideogamesList(videogames.slice(startIndex, endIndex));
  }
};

  return (
    <div>
        <h1>Home</h1>
        <CardsContainer videogames={videogamesList}/>
        <button onClick={prevPage}>{previous}</button>
        <input value={`${currentPage}`} disabled={true} />
        <button onClick={nextPage}>{next}</button>
    </div>
  )
}

export default Home;