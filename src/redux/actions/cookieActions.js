import {UPDATE_SALDO, UPDATE_MOVIE_LIST} from './types';



export const updateSaldo = (saldo) => dispatch => {
	dispatch({
		type:UPDATE_SALDO,
		saldo:saldo
	})
}

export const updateMovieList = (movieList) => dispatch => {
	dispatch({
		type:UPDATE_MOVIE_LIST,
		movieList:movieList
	})
}
