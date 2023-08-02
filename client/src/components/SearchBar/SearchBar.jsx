import {useState} from 'react';
import style from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue,setSearchValue] = useState('');
  
  const handlerChange = (event)=>{
    const value = event.target.value;
    setSearchValue(value);
  };

  const onSearch = (value)=>{
    dispatch(getVideogameByName(value));
  };

  return (
    <div className = {style.bar}>
      <input className={style.inputSearch} type = 'search' onChange = {handlerChange} value = {searchValue}/>
      <button className = {style.searchButton} onClick={()=>{onSearch(searchValue); setSearchValue('')}}>Search</button>
    </div>
  )
}

export default SearchBar