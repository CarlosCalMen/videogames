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
    const direction = useSelector(state=>state.direction);

    const handlerChange = (event)=>{
        const filterName = event.target.name;
        const filterValue = event.target.value;

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
    <div className={style.filtersBar}>
        <div className={style.filters}>
            <div >
                <label >Filter by:      </label>
                <label >Source </label>
                <select name='source' id='source' value={filters.bySource} onChange={handlerChange}>
                    <option value='ALL'>ALL</option>
                    <option value='API'>API</option>
                    <option value='BBDD'>BBDD</option>
                </select>
            </div>
            <div >
                <label>Genre </label>
                <select name='genre' id='genre' value={filters.byGenre} onChange={handlerChange}>
                    <option value='All'>All</option>
                    {genres.map(genre =>
                        <option key={genre.id} value={genre.name}>{genre.name}</option>)}
                </select>
            </div>
        </div>
        <div className={style.order}>   
            <div>
                <label >Order by:      </label>
                <label >Property </label>
                <select name='sort' id='sort' onChange={handlerChange}>
                    <option value='none'>None</option>
                    <option value='name'>Name</option>
                    <option value='rating'>Rating</option>
                </select>
            </div>
            <div>
                <label >Direction:  </label>
                <input disabled={orderBy==='none'} type='radio' name='direction' id='Ascending' value='Ascending' onChange={handlerChange} checked={direction==='Ascending'}/>
                <label htmlFor='direction' disabled={orderBy==='none'}>Ascending</label>
                <input disabled={orderBy==='none'} type='radio' name='direction' id='Descending' value='Descending' onChange={handlerChange} checked={direction==='Descending'}/>
                <label htmlFor='direction' disabled={orderBy==='none'}>Descending</label>
            </div>
        </div>
    </div>
  )
}

export default Filters