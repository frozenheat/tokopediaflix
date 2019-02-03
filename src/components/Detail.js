import React,{Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { detailMovie, similiarMovie, recommendMovie } from '../redux/actions/movieActions';
import { updateSaldo, updateMovieList } from '../redux/actions/cookieActions';


class Detail extends Component{
	constructor(props){
		super(props);

		this.state={
			checkBuy:false,
			lastUrl:props.match.url,
		}

		this.buyAction = this.buyAction.bind(this);
	}


	componentDidMount(){
		var parent = this;
		parent.props.detailMovie(parent.props.match.params.movieSlug);
		parent.props.similiarMovie(parent.props.match.params.movieSlug);
		parent.props.recommendMovie(parent.props.match.params.movieSlug);
	}

	shouldComponentUpdate(nextProps,nextState){
		let checkState = true;

		if(nextProps.movie !== this.props.movie){
			this.moviesCheck(this.props.myMovies,nextProps.movie.id);
			checkState=true;
		}

		if(nextProps.match.url !== this.props.match.url){
			checkState=true;
		}

		if(nextProps.similiarMovies !== this.props.similiarMovies){
			checkState=true;
		}

		if(nextProps.recommendationMovies !== this.props.recommendationMovies){
			checkState=true;
		}

		return checkState;
	}

	componentDidUpdate(prevProps, prevState, prevContex){
		if(prevProps.match.url !== this.props.match.url){
			this.props.detailMovie(this.props.match.params.movieSlug);
			this.props.similiarMovie(this.props.match.params.movieSlug);
			this.props.recommendMovie(this.props.match.params.movieSlug);
		}
	}



	buyAction(price,movieId,e){
		let currentSaldo = this.props.saldo;
		let currentMovieList = this.props.myMovies?this.props.myMovies:[];


		if(window.confirm("Buy this movie ?")){
			currentSaldo = currentSaldo - price;
			if(currentSaldo < 0){
				alert('saldo tidak mencukupi');
				return false;
			}


			currentMovieList.push(movieId)
			currentMovieList = JSON.stringify(currentMovieList);


			// update cookie 
			this.props.updateMovieList(currentMovieList);
			this.props.updateSaldo(currentSaldo);
			// update end

			this.setState({
				saldo:currentSaldo,
				checkBuy:true,
			})

			this.moviesCheck(this.props.myMovies, movieId);
		}
		
	}

	moviesCheck(myMoviesList,currentMovieId){
		// my movies check
			let check = false;
			myMoviesList = myMoviesList?myMoviesList:[];
			myMoviesList.map(myMovie=>{
				if(myMovie === currentMovieId){
					check = true;
				}

				return true;
			});
			this.setState({
				checkBuy:check
			});
		// my movies check end
	}


	createPriceSeparator(priceNumber=0, deleteCents=true, suffix=',-' ,separator='.'){
        if (deleteCents){
            priceNumber = Math.round(priceNumber);
        }
        var priceText = priceNumber.toString();
        priceText = priceText.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return priceText + suffix;
    }

    doRupiahPriceSeparator(priceNumber){
        return this.createPriceSeparator(priceNumber,true, ',-', '.');
    }

	similiarMoviesList(){
		//similiar movies list

		if(!this.props.similiarMovies){return null;}
		const movies = this.props.similiarMovies.map(movie => {
			
			// stars review helper

				let backgroundPosition = "center top";
				let topPosition = -18;
				for(let x=1;x<=10;x++){
					if(x > movie.vote_average ){ 
						break;
					}	
					topPosition = -18 * x;
					backgroundPosition = "center top "+topPosition+"px"
				}

				let starsStyle = {
					backgroundImage:"url('/css/images/stars-sprite.png')",
					backgroundPosition: backgroundPosition,
					backgroundRepeat:"no-repeat",
					backgroundSize:"100%"
				}

			// stars review helper end


			// price helper
			let price = 3500;
			switch(true){
				case movie.vote_average >= 3 && movie.vote_average <=5:
					price = 8250;
					break;
				case movie.vote_average >= 6 && movie.vote_average <=8:
					price = 16350;
					break;
				case movie.vote_average >= 8 && movie.vote_average <=10:
					price = 21250;
					break;
				default:
					price = 3500;
					break;
			}
			// price helper end
				
			// detail slug
				let movieSlug = movie.original_title.replace(" ", "-");	
			// detail slug end

			// my movies check
				let checkBuy = false;
				this.props.myMovies.map(myMovie=>{
					if(myMovie === movie.id){
						checkBuy = true;
					}

					return true
				});
			// my movies check end

			return(

				<li key={movie.id} className="col-md-3">
					<div className="box-wrapper" style={{background:'url("https://image.tmdb.org/t/p/w500'+movie.poster_path+'")no-repeat center / cover'}}>
						<Link className="overlay" to={"/detail/"+movie.id+"-"+movieSlug}>
							<h3 className="title">{movie.original_title}</h3>
							<p className="buyed" style={checkBuy?{display:'inline-block'}:null}>Buyed</p>
							<div className="stars" style={starsStyle}></div>
							<p className="price">Rp {this.doRupiahPriceSeparator(price)}</p>
						</Link>
					</div>
				</li>
			)	
		});
		
		return movies;
		
		//similiar movies list end
	}

	recommendationMoviesList(){
		//similiar movies list
		
		if(!this.props.recommendationMovies){return null;}
		const movies = this.props.recommendationMovies.map(movie => {
			
			// stars review helper
				let backgroundPosition = "center top";
				let topPosition = -18;
				for(let x=1;x<=10;x++){
					if(x > movie.vote_average ){ 
						break;
					}	
					topPosition = -18 * x;
					backgroundPosition = "center top "+topPosition+"px"
				}

				let starsStyle = {
					backgroundImage:"url('/css/images/stars-sprite.png')",
					backgroundPosition: backgroundPosition,
					backgroundRepeat:"no-repeat",
					backgroundSize:"100%"
				}

			// stars review helper end

			// detail slug
				let movieSlug = movie.original_title.replace(" ", "-");	
			// detail slug end

			// price helper
			let price = 3500;
			switch(true){
				case movie.vote_average >= 3 && movie.vote_average <=5:
					price = 8250;
					break;
				case movie.vote_average >= 6 && movie.vote_average <=8:
					price = 16350;
					break;
				case movie.vote_average >= 8 && movie.vote_average <=10:
					price = 21250;
					break;
				default:
					price = 3500;
			}
			// price helper end

			
			
			return(

				<li key={movie.id} className="col-md-3">
					<div className="box-wrapper" style={{background:'url("https://image.tmdb.org/t/p/w500'+movie.poster_path+'")no-repeat center / cover'}}>
						<Link className="overlay" to={"/detail/"+movie.id+"-"+movieSlug}>
							<h3 className="title">{movie.original_title}</h3>
							<p className="buyed">Buyed</p>
							<div className="stars" style={starsStyle}></div>
							<p className="price">Rp {this.doRupiahPriceSeparator(price)}</p>
						</Link>
					</div>
				</li>
			)	
		});
		
		return movies;
		
		//similiar movies list end
	}


	starsStyleHelper(){
		let backgroundPosition = "center top";
		let topPosition = -18;
		for(let x=1;x<=10;x++){
			if(x > this.props.movie.vote_average ){ 
				break;
			}	
			topPosition = -18 * x - 1;
			backgroundPosition = "center top "+topPosition+"px"
		}

		return {
				backgroundPosition: backgroundPosition,
				backgroundRepeat:"no-repeat",
				backgroundSize:"100%"
		};
	}


	genreHelperElement(){
		if(this.props.movie.genres){
			return this.props.movie.genres.map(genres =>(
				<li key={genres.id}>
					<i>{genres.name}</i>
				</li>
			));
		}

		return null;
	}

	priceHelper(){
		let price = null;
		switch(true){
			case this.props.movie.vote_average >= 3 && this.props.movie.vote_average <=5:
				price = 8250;
				break;
			case this.props.movie.vote_average >= 6 && this.props.movie.vote_average <=8:
				price = 16350;
				break;
			case this.props.movie.vote_average >= 8 && this.props.movie.vote_average <=10:
				price = 21250;
				break;
			default:
				price = 3500;
		}

		return price;
	}
	

	render(){


		let starsStyle = this.starsStyleHelper();

		let genres = this.genreHelperElement();

		let price = this.priceHelper();

		let similiarMovies = this.similiarMoviesList();

		let recommendationMovies = this.recommendationMoviesList();

		
		return(
			<div className="wrapper detail-page">
				<div className="row detail-desc">
					<div className="col-md-5 image">
						<div className="image-placeholder" style={{background:"url('https://image.tmdb.org/t/p/w500"+this.props.movie.poster_path+"')no-repeat center / cover"}}></div>
					</div>
					<div className="col-md-7 desc">
						<h2 className="title">{this.props.movie.original_title}</h2>
						<p className="price">Rp {this.doRupiahPriceSeparator(price)}</p>
						<div className="rating-stars" style={starsStyle}></div>
						<ul className="genre">
							{genres}
							<div className="clear"></div>
						</ul>
						<div className="clear"></div>
						{this.state.checkBuy?(<button className="buyed">Buyed</button>):<button className="buy" onClick={this.buyAction.bind(null,price,this.props.movie.id)}>Buy</button>}
						<div className="clear"></div>
						<hr />
						<p className="synopsis">Synopsis:</p>
						<p className="synopsis">
							{this.props.movie.overview}
						</p>
						<h3 className="recommended-title">Recommended for you</h3>
						<hr />
						<ul className="row recommendationMoviesListSection">
							{recommendationMovies}
						</ul>
					</div>
				</div>
				
				<div className="similiar">
					<h2 className="related-title">Related Movies</h2>
					<ul className="row similiar-list">
						{similiarMovies}
					</ul>
				</div>
			</div>
		);
		
	}
}

const mapStateToProps = state =>({
	movie:state.movies.movie,
	similiarMovies:state.movies.similiarMovies,
	recommendationMovies:state.movies.recommendationMovies,
	saldo:state.cookie.saldo,
	myMovies:state.cookie.myMovies
});

export default connect(mapStateToProps,{detailMovie, similiarMovie, recommendMovie, updateSaldo, updateMovieList})(Detail);