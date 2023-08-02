import { useDispatch,useSelector } from 'react-redux';
import {filterVideogamesBySource,
        filterVideogamesByGenre,
        orderVideogamesByProperty,
        setOrderDirection,
        resetOrderStates,
        resetCurrentPage} from '../../redux/actions.js';
import style from './Filters.module.css';

const Filters = () => {
    const dispatch = useDispatch();
    const genres = useSelector(state=>state.genres);
    const filters = useSelector(state=>state.filter);
    const orderBy = useSelector(state=>state.orderBy);

    const handlerChange = (event)=>{
        const filterName = event.target.name;
        const filterValue = event.target.value;
            console.log('prop '+filterName+' valor '+filterValue)

        switch (filterName) {
            case 'source':
                dispatch(resetCurrentPage());
                return dispatch(filterVideogamesBySource(filterValue));
                case 'genre':
                dispatch(resetCurrentPage());
                return dispatch(filterVideogamesByGenre(filterValue));
            case 'sort':
                    if (filterValue==='none'){
                        dispatch(resetOrderStates());
                        return dispatch(filterVideogamesByGenre(filters.byGenre))
                    }
                    else
                        return dispatch(orderVideogamesByProperty(filterValue));
            case 'direction':
                    dispatch(setOrderDirection(filterValue));
                    return dispatch(orderVideogamesByProperty(orderBy));            
            default:break;
        };     
    };
  return (
    <>
        <div className={style.filters}>
            <label >Filter by:      </label>
            <label >Source </label>
            <select name='source' id='source' value={filters.bySource} onChange={handlerChange}>
                <option value='ALL'>ALL</option>
                <option value='API'>API</option>
                <option value='BBDD'>BBDD</option>
            </select>
            <label>Genre </label>
            <select name='genre' id='genre' value={filters.byGenre} onChange={handlerChange}>
                <option value='All'>All</option>
                {genres.map(genre =>
                    <option key={genre.id} value={genre.name}>{genre.name}</option>)}
            </select>
            <label >Order by:      </label>
            <label >Property </label>
            <select name='sort' id='sort' onChange={handlerChange}>
                <option value='none'>None</option>
                <option value='name'>Name</option>
                <option value='rating'>Rating</option>
            </select>
            <label >Direction</label>
            <input type='radio' name='direction' id='Ascending' value='Ascending' onChange={handlerChange}/>
            <label htmlFor='direction'>Ascending</label>
            <input type='radio' name='direction' id='Descending' value='Descending' onChange={handlerChange}/>
            <label htmlFor='direction'>Descending</label>
        </div>
    </>
  )
}

export default Filters