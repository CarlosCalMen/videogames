import {GET_ALL_VIDEOGAMES,
        GET_VIDEOGAME_BY_NAME,
        GET_GENRES,
        TOOGLE_VIDEOGAMES_UPDATED,
        INC_CURRENT_PAGE,
        DEC_CURRENT_PAGE,
        FILTER_VIDEOGAMES_BY_GENRE,
        FILTER_VIDEOGAMES_BY_SOURCE,
        ORDER_VIDEOGAMES_BY_PROPERTY,
        SET_ORDER_DIRECTION,
        RESET_ORDER_STATES,
        RESET_CURRENT_PAGE} from "./actions";

const initialState = {
    allVideogames:[],
    videogamesFiltered:[],
    videogamesBackUp:[],
    videogamesUpdated:false,
    genres:[],
    filter:{byGenre:'All',
            bySource:'ALL'},
    orderBy:'none',
    direction:'Ascending',        
    currentPage:1,
};

const rootReducer = (state= initialState,action)=>{
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {...state, 
                allVideogames: action.payload,
                videogamesFiltered:action.payload};

        case GET_VIDEOGAME_BY_NAME:
            if (action.payload)
                return {...state, videogamesFiltered: action.payload};
            break;    
        
        case GET_GENRES:
            return {...state, genres: action.payload};
        
        case FILTER_VIDEOGAMES_BY_SOURCE:{
            const {filter,allVideogames} = state;
            let newVideogamesFiltered = [];
            switch (action.payload){
                case 'BBDD':
                    newVideogamesFiltered = (filter.byGenre==='All') //if filter by genre isn´t actived
                    ? allVideogames.filter(videogame=>videogame.created)
                    : allVideogames.filter(videogame=>videogame.created && videogame.genres.includes(filter.byGenre));
                    break;
                case 'API':
                    newVideogamesFiltered = (filter.byGenre==='All') //if filter by genre isn´t actived
                    ? allVideogames.filter(videogame=>!videogame.created)
                    : allVideogames.filter(videogame=>!videogame.created && videogame.genres.includes(filter.byGenre));
                    break;
                default:
                    newVideogamesFiltered = (filter.byGenre==='All') //if filter by genre isn´t actived
                    ? [...allVideogames]
                    : allVideogames.filter(videogame=>videogame.genres.includes(filter.byGenre));
                    break;
                };
            return {...state,
                filter:{...filter,bySource:action.payload},
                videogamesFiltered:newVideogamesFiltered,
                orderBy:'none',
            };
        };

        case FILTER_VIDEOGAMES_BY_GENRE:{
            const {filter,allVideogames} = state;
            let newVideogamesFiltered = (action.payload==='All')//all genres
                ? [...allVideogames]
                : allVideogames.filter(videogame=>videogame.genres.includes(action.payload));
            if (filter.bySource!=='ALL'){//there is one filter by source selected
                if (filter.bySource==='BBDD')
                    newVideogamesFiltered=newVideogamesFiltered.filter(videogame=>videogame.created);
                else 
                    newVideogamesFiltered=newVideogamesFiltered.filter(videogame=>!videogame.creeated);    
            };
            return {...state,
                    filter:{...filter,byGenre:action.payload},
                    videogamesFiltered:newVideogamesFiltered,
                    orderBy:'none',
                };         
        };

        case TOOGLE_VIDEOGAMES_UPDATED:
            return {...state,videogamesUpdated:!state.videogamesUpdated};

        case ORDER_VIDEOGAMES_BY_PROPERTY:
            if (state.orderBy ==='none' && state.videogamesBackUp.length===0)//save the current order to recover
                state.videogamesBackUp = [...state.videogamesFiltered];
            let aux=[...state.videogamesFiltered];
            switch (action.payload) {
                case 'name':
                    if (state.direction==='Ascending')
                        aux = aux.sort((a,b)=>a.name.localeCompare(b.name));
                    else 
                        aux = aux.sort((a,b)=>b.name.localeCompare(a.name));
                    break;
                case 'rating':
                    if (state.direction==='Ascending')
                    aux = aux.sort((a,b)=>a.rating-b.rating);
                    else
                    aux = aux.sort((a,b)=>b.rating-a.rating);
                    break;                   
                default:
                    aux = state.videogamesBackUp.length>0 ?[...state.videogamesBackUp] :[...state.videogamesFiltered];
            };
            return {...state,videogamesFiltered:aux,orderBy:action.payload};

        case SET_ORDER_DIRECTION:
            return {...state,direction:action.payload}

        case INC_CURRENT_PAGE:
            return {...state, currentPage:state.currentPage+1};
        
        case DEC_CURRENT_PAGE:
            return {...state, currentPage:state.currentPage-1}; 
            
        case RESET_ORDER_STATES:
            return {...state, videogamesBackUp:[],orderBy:'none'};     
        
         case RESET_CURRENT_PAGE:
            return {...state,currentPage:1};  

        default:
            return {...state};
    };
};

export default rootReducer;