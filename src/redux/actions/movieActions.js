import {FETCH_MOVIES, DETAIL_MOVIE, SIMMILIAR_MOVIE, RECOMMEND_MOVIE} from './types';


export const fetchMovies = (page) => dispatch => {
		fetch('https://api.themoviedb.org/3/movie/now_playing'+page+'&&api_key=abf20d3de7b7e6f5efbb015865d8b8eb')
			.then(res => res.json())
			.then(posts => dispatch({
				type:FETCH_MOVIES,
				payload:posts
			}));

}

export const detailMovie = (movieId) => dispatch => {
		fetch('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=abf20d3de7b7e6f5efbb015865d8b8eb')
			.then(res => res.json())
			.then(posts => dispatch({
				type:DETAIL_MOVIE,
				payload:posts
			}));

}

export const similiarMovie = (movieId) => dispatch => {
		fetch('https://api.themoviedb.org/3/movie/'+movieId+'/similar?api_key=abf20d3de7b7e6f5efbb015865d8b8eb')
			.then(res => res.json())
			.then(posts => dispatch({
				type:SIMMILIAR_MOVIE,
				payload:posts
			}));
}

export const recommendMovie = (movieId) => dispatch => {
		fetch('https://api.themoviedb.org/3/movie/'+movieId+'/recommendations?api_key=abf20d3de7b7e6f5efbb015865d8b8eb')
			.then(res => res.json())
			.then(posts => dispatch({
				type:RECOMMEND_MOVIE,
				payload:posts
			}));
}

