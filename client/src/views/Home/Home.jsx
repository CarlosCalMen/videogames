import CardsContainer from '../../components/CardsContainer/CardsContainer.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import style from './Home.module.css';
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
  const TOTAL_PAGES = Math.ceil(videogames.length / ITEMS_PER_PAGE);
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
  if (currentPage < TOTAL_PAGES) {
    dispatch(incCurrentPage());
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVideogamesList(videogames.slice(startIndex, endIndex));
  }
};

  return (
    <div className={style.mainContainer}>
      <div className={style.filterSearchBar}>
        <div className={style.filters}>
          <Filters/>
        </div>
        <div className={style.searchBar}>
          <SearchBar/>
        </div>
      </div>
      <div className={style.title}>
        <h3>Page {currentPage} from {TOTAL_PAGES}</h3>
        <div className={style.paginator}>
          <button onClick={prevPage}>{previous}</button>
          <input className={style.inputPage} value={`${currentPage}`} disabled={true} />
          <button onClick={nextPage}>{next}</button>
        </div>
      </div>
        <CardsContainer videogames={videogamesList}/>
    </div>
  )
}

export default Home;