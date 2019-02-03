import {UPDATE_SALDO,UPDATE_MOVIE_LIST} from '../actions/types';
import cookie from 'react-cookies';


if(!cookie.load("saldo")){
	 cookie.save('saldo', 100000, { path: '/' })
}

const initialState = {
	saldo:cookie.load("saldo")?cookie.load("saldo"):100000,
	myMovies:cookie.load("myMovieList")?cookie.load("myMovieList"):[]
}

export default function(state = initialState, action){
	switch(action.type){
		case UPDATE_SALDO:
			cookie.save('saldo', action.saldo, { path: '/' });
			return{
				...state,
				saldo:action.saldo
			};
		case UPDATE_MOVIE_LIST:
			cookie.save('myMovieList', action.movieList, { path: '/' });
			console.log(JSON.parse(action.movieList));
			return{
				...state,
				myMovies:JSON.parse(action.movieList)
			};
		default:
			return state; 
	}
}