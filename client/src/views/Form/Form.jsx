import style from './Form.module.css';
import InputBox from '../../components/InputBox/InputBox.jsx';
import { useState } from 'react';
import { initialState,validate,disable } from './Form.Utils.js';
import {createVideogame,toogleVideogamesUpdated} from '../../redux/actions.js';
import {useDispatch, useSelector} from 'react-redux';

const Form = () => {
  const [form,setForm] = useState(initialState('form'));
  const [errors,setErrors] = useState(initialState('errors'));
  const dispatch = useDispatch();
  const genres = useSelector(state =>state.genres);

  const changeHandler = (event)=>{
    const {name,value,type,checked} = event.target;
    if (type === 'checkbox'){
      const selectedGenders = checked
        ? [...form.genres,parseInt(value)]
        : form.genres.filter((genreId) => genreId !== parseInt(value));
      setForm({...form,genres: selectedGenders});
      validate({...form,genres: selectedGenders},errors,setErrors,name)  
    }
    else{
      setForm({...form,[name]: value});
      validate({...form,[name]:value},errors,setErrors,name);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // const platforms=form.platforms.split(',');
    // const plats = platforms.map((platform)=>platform.trim());
    const updatedForm = { ...form, platforms: form.platforms.split(',').map((platform)=>platform.trim())};
    setForm(updatedForm);
    dispatch(createVideogame(updatedForm));
    setForm(initialState('form'));
    setErrors(initialState('errors'));
    dispatch(toogleVideogamesUpdated()); 
  };
 
  return (
    <form className={style.formContainer} onSubmit={submitHandler}>
      <h1>CREATE VIDEOGAME</h1>
      <div className={style.inputsContainer}>
        <InputBox state={form} label={'Name'} property={'name'} action={changeHandler} errorProperty={errors.name}/>
        <InputBox state={form} label={'Image'} property={'image'} action={changeHandler} errorProperty={errors.image}/>
        <InputBox state={form} label={'Platforms'} property={'platforms'} action={changeHandler} errorProperty={errors.platforms}/>
        <InputBox state={form} label={'Description'} property={'description'} action={changeHandler} errorProperty={errors.description}/>
        <InputBox state={form} label={'Release Date'} property={'released'} action={changeHandler} errorProperty={errors.released}/>
        <InputBox state={form} label={'Rating'} property={'rating'} action={changeHandler} errorProperty={errors.rating}/>
      </div>
        <label >Genres</label>
        <div className={style.genresContainer}>
          {genres.map((genre)=>(
            <div key={genre.id}>
              <input 
                type='checkbox'
                name='genres'
                value={genre.id}
                onChange={changeHandler}
                checked={form.genres.includes(genre.id)}
              />
            <label>{genre.name}</label>
            </div>
          ))}
        </div>
        <label className={style.error}>{errors.genres}</label>
        <br />
        <button type='submit' disabled={disable(errors)}>Submit</button>
    </form>
  );
};

export default Form;