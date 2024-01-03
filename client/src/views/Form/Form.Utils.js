
const validate = (form,errors,setErrors,property)=>{
    const top=5;
    switch(property){
        case 'name':
        case 'platforms':
        case 'description':{
            const regex = /^.{3,}$/;/*it requires at least 3 characters in property*/ 
            if (regex.test(form[property])) return setErrors({...errors,[property]:''});    
            return setErrors({...errors,[property]:`${property} must have at least 3 characters`});
        }    
        case 'image':{
            const regex =/^(ht|f)tps?:\/\/\w+([.-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i                ;
            if (regex.test(form[property])) return setErrors({...errors,[property]:''});
            return setErrors({...errors,[property]:'Image must be a string with valid Url format'});
        }
        case 'rating':{
            if (form[property]==='') return setErrors({...errors,[property]:`${property} must have a value`}); 
            let value=form[property];//validate value is a number
            value=Number(value);
            if (isNaN(value) || value<1 || value>top) return setErrors({...errors,[property]:`${property} must be an integer between 1 and ${top}`}); 
            return setErrors({...errors,[property]:''});
        }
        case 'released':{
            const regex = /^(?:(?!0000)(?:[1-9]\d{3}|0[1-9]\d{2}|00[1-9]\d|000[1-9]))-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|[12]\d|3[01])$/
            if (regex.test(form[property]) ){
                if (Date.parse(form[property]) < Date.now())
                  return setErrors({...errors,[property]:''})};
            return setErrors({...errors,[property]:'Release date must be a valid date in format yyyy-mm-dd'});
        }
        case 'genres':{
            if (form[property].length) return setErrors({...errors,[property]:''});    
            return setErrors({...errors,[property]:'You must choose at less one genre'});
        }
        default:
            return {...errors};        
    }
};

const initialState = (state)=>{
    return {
    //initial state for state and errors, in second case put a blank character 
        name:state==='form' ?'' : ' ',
        image:state==='form' ?'' : ' ',
        platforms:state==='form' ? [] : ' ',
        description:state==='form' ? '' : ' ',
        released:state==='form' ? '' : ' ',
        rating:state==='form' ? '' : ' ',
        genres:state==='form' ? [] : ' ',
    } 
};

const disable = (errors)=>{
    let disabled = true;
    for (let error in errors) {
        if (!errors[error].length) disabled=false;
        else {
            disabled=true;  
            break; 
        }
    };
    return disabled;
};

export { 
        validate,
        initialState,
        disable,
    };