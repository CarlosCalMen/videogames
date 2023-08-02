import axios from 'axios';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME';
// export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
// export const GET_VIDEOGAMES_TO_SHOW = 'GET_VIDEOGAMES_TO_SHOW';
export const GET_GENRES = 'GET_GENRES';
export const INC_CURRENT_PAGE = 'INC_CURRENT_PAGE';
export const DEC_CURRENT_PAGE = 'DEC_CURRENT_PAGE';
export const FILTER_VIDEOGAMES_BY_GENRE = 'FILTER_VIDEOGAMES_BY_GENRE';
export const FILTER_VIDEOGAMES_BY_SOURCE = 'FILTER_VIDEOGAMES_BY_SOURCE';
export const ORDER_VIDEOGAMES_BY_PROPERTY = 'ORDER_VIDEOGAMES_BY_PROPERTY';
export const SET_ORDER_DIRECTION = 'ORDER_DIRECTION';
export const TOOGLE_VIDEOGAMES_UPDATED = 'TOOGLE_VIDEOGAMES_UPDATED'; 
export const RESET_ORDER_STATES = 'RESET_ORDER_STATES';
export const RESET_CURRENT_PAGE = 'RESET_CURRENT_PAGE';

export const getAllVideogames = ()=>{
    return async (dispatch) => {
        const videogames = (await axios.get('http://localhost:3001/videogames')).data;
        dispatch ({type:GET_ALL_VIDEOGAMES,payload:videogames});
    };
};

export const getVideogameByName = (name)=>{
    return async (dispatch) => {
        const videogames = (await axios.get(`http://localhost:3001/videogames?name=${name}`)).data;
        dispatch({type:GET_VIDEOGAME_BY_NAME,payload:videogames});
    };
};

// export const getVideogameById = (id) => {
//     return async (dispatch)=>{
//         const videogame = (await axios.get(`http://localhost:3001/${id}`)).data;
//         dispatch({type:GET_VIDEOGAME_BY_ID, payload:videogame}); 
//     };
// };

export const toogleVideogamesUpdated = ()=>{
    return (dispatch)=>{
        dispatch({type:TOOGLE_VIDEOGAMES_UPDATED});
    };
};

export const createVideogame = (newVideogame)=>{
    return async (dispatch) => {
        try {
            const videogameCreated = (await axios.post('http://localhost:3001/videogames',newVideogame)).data; 
            dispatch({type:CREATE_VIDEOGAME, payload: videogameCreated});
            alert('Videogame created successfully');
        } 
        catch (error) {
            alert(error.response.data.error);
        }
    };
};

export const getGenres = ()=> {
    return async (dispatch) => {
        const genres = (await axios.get('http://localhost:3001/genres')).data;
        dispatch({type:GET_GENRES, payload: genres});
    };
};

export const filterVideogamesByGenre = (genre)=>{
    return (dispatch)=>{
        dispatch({type:FILTER_VIDEOGAMES_BY_GENRE,payload:genre});
    };
};

export const filterVideogamesBySource = (source)=>{
    return (dispatch)=>{
        dispatch({type:FILTER_VIDEOGAMES_BY_SOURCE,payload:source});
    };
};


export const orderVideogamesByProperty = (property)=>{
    return (dispatch)=>{
        dispatch({type:ORDER_VIDEOGAMES_BY_PROPERTY,payload:property});
    };
};

export const setOrderDirection = (direction)=>{
    return (dispatch)=>{
        dispatch({type:SET_ORDER_DIRECTION,payload:direction});
    };
};

export const incCurrentPage = ()=>{
    return (dispatch)=>{
        dispatch({type:INC_CURRENT_PAGE});
    };
};

export const decCurrentPage = ()=>{
    return (dispatch)=>{
        dispatch({type:DEC_CURRENT_PAGE});
    };
};

export const resetOrderStates = ()=>{
    return (dispatch)=>{
        dispatch({type:RESET_ORDER_STATES});
    };
};

export const resetCurrentPage= ()=>{
    return (dispatch)=>{
        dispatch({type:RESET_CURRENT_PAGE});
    };
};    