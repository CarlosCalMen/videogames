import style from './InputBox.module.css';

const InputBox = ({state,label,property,action,errorProperty}) => {
  return (
    <>
        <div className={style.inputBox}>
            <div>
                <label >{label}</label>
            </div>
            <div>
                <input name={property} value={state[property]} onChange={action} type="text" />
            </div>
        </div>
        <div className = {style.error}>
            {errorProperty}
        </div>
    </>
  )
}

export default InputBox;