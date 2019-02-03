import React,{Component } from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';



class Home extends Component{

	constructor(props){
		super(props);
	}


	componentDidMount(){
		const page = this.props.location.search?this.props.location.search:"?page=1";
		this.props.fetchMovies(page);
	}

	shouldComponentUpdate(nextProps,nextState){

		let checkState = false;
		if(nextProps.movies !== this.props.movies){
			checkState = true;
		}

		if(nextProps.location.search !== this.props.location.search ){
			checkState = true;
		}
		return checkState;

	}

	componentDidUpdate(prevProps, prevState, prevContex){

		if(prevProps.location.search !== this.props.location.search){
			this.props.fetchMovies(this.props.location.search);
		}
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




    // Render Movies Element

    starsStyleHelper(movie){
		let backgroundPosition = "center top";
		let topPosition = -18;
		for(let x=1;x<=10;x++){
			if(x > movie.vote_average ){ 
				break;
			}	
			topPosition = -18 * x - 3;
			backgroundPosition = "center top "+topPosition+"px"
		}

		return {
				backgroundPosition: backgroundPosition,
				backgroundRepeat:"no-repeat",
				backgroundSize:"100%"
		};
	}

    priceHelper(movie){
		let price = null;
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

		return price;
	}

	checkBuyHelper(movie){
		let checkBuy = false;
		this.props.myMovies.map(myMovie=>{
			if(myMovie === movie.id){
				checkBuy = true;
			}
			return true;
		});

		return checkBuy;
	}

    renderMoviesElement(){

    	const parent = this;

    	const movies = this.props.movies.map(movie => {

			let starsStyle = parent.starsStyleHelper(movie)

			let price = parent.priceHelper(movie);

			let movieSlug = movie.original_title.replace(" ", "-");	

			let checkBuy = parent.checkBuyHelper(movie); 


			return(

				<li key={movie.id} className="col-md-3">
					<div className="box-wrapper" style={{background:'url("https://image.tmdb.org/t/p/w500'+movie.poster_path+'")no-repeat center / cover'}}>
						<Link className="overlay" to={"/detail/"+movie.id+"-"+movieSlug}>
							<h3 className="title">{movie.original_title}</h3>
							<p className="buyed" style={checkBuy?{display:'inline-block'}:null}>Buyed</p>
							<div className="stars" style={starsStyle}></div>
							<p className="price">Rp {parent.doRupiahPriceSeparator(price)}</p>
						</Link>
					</div>
				</li>
			)	
		});

		return movies;

    }

    // /Render Movies Element

    

    renderPagination(){
    	let end = 10;
		let start = 1;
		for(let x=1; x<= this.props.totalPages;x++){
			end=x>end?end+10:end;
			start = end - 9;
			if(x === this.props.currentPage){break;}
		}

		let pageNumber = [];


		if(start !== 1){
			let prevSection = start - 1;
			pageNumber.push(
				<li key="prevSection">
					<a className="prevSection" href={"?page="+prevSection}>&lt;&lt;</a>
				</li>
			);
		}

		let prev = this.props.currentPage - 1;
		pageNumber.push(
			<li key="prev">
				<Link className="prev" to={"?page="+prev}>&lt;</Link>
			</li>
		);

		while(start<=end){
			pageNumber.push(
				<li key={start}>
					<Link className={start===this.props.currentPage?"active":null} to={"?page="+start}>{start}</Link>
				</li>
			);
			start++;
		}

		let next = this.props.currentPage + 1;
		pageNumber.push(
			<li key="next">
				<Link className="next" to={"?page="+ next}>&gt;</Link>
			</li>
		);

		if(end !== this.props.totalPages){
			pageNumber.push(
				<li key="nextSection">
					<Link className="nextSection" to={"?page="+start}>&gt;&gt;</Link>
				</li>
			);
		}

		return pageNumber
    }

	render(){

		const movies = this.renderMoviesElement();


		const pageNumber = this.renderPagination();


		return(
			<div className="wrapper home">
				<ul className="row trending-list">
					{movies}
				</ul>
				<div className="pagination">
					<ul className="pagination-number">
						{pageNumber}
						<div className="clear"></div>
					</ul>
				</div>
			</div>	
		);	
	}
}

const mapStateToProps = state =>({
	movies: state.movies.results,
	currentPage:state.movies.currentPage,
	totalPages:state.movies.totalPages,
	myMovies:state.cookie.myMovies
});

export default connect(mapStateToProps,{fetchMovies})(Home);