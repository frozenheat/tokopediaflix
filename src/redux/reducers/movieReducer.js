import {FETCH_MOVIES, DETAIL_MOVIE, SIMMILIAR_MOVIE, RECOMMEND_MOVIE} from '../actions/types';

const initialState = {
	results : [],
	totalPages:1,
	currentPage:1,
	movie:{},
	similiarMovies:[],
	recommendationMovies:[]
}

export default function(state = initialState, action){
	let x = 0
	switch(action.type){
		case FETCH_MOVIES:
			// assigning movie id to array key
			// let newResults = [];
			// action.payload.results.map(movie => {
			// 	newResults[movie.id] = movie;
			// 	return true;
			// });

			return{
				...state,
				results: action.payload.results,
				totalPages:action.payload.total_pages,
				currentPage:action.payload.page
			};
		case DETAIL_MOVIE:
			return{
				...state,
				movie:action.payload
			}
		case SIMMILIAR_MOVIE:
			x = 0;
			let similiarMovies = [] 
			action.payload.results.map(results => {
				x++;
				if(x <= 4){
					similiarMovies.push(results);
				}

				return true;
			});

			return{
				...state,
				similiarMovies:similiarMovies
			}
		case RECOMMEND_MOVIE:
			x = 0;
			let recommendMovies = [] 
			action.payload.results.map(results => {
				x++;
				if(x <= 4){
					recommendMovies.push(results);
				}

				return true;
			});
			return{
				...state,
				recommendationMovies:recommendMovies
			}
		default:
			return state; 
	}
}