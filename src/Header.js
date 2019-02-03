import React,{Component } from 'react';

import { Link } from 'react-router-dom';


import { connect } from 'react-redux';

class Header extends Component{


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


	render(){
		return(
			<header>
				<div className="sticky-header">
					<div className="wrapper">
						<Link className="logo" to="/">Hflix</Link>
						<div className="saldo">
							<label>Saldo :</label> Rp. {this.doRupiahPriceSeparator(this.props.saldo)}
						</div>
						<div className="clear"></div>
					</div>
				</div>
			</header>
		);
	}
}

// Header.propTypes ={
// 	saldo: PropTypes.number
// }

const mapStateToProps = state =>({
	saldo:state.cookie.saldo
});

export default connect(mapStateToProps,null)(Header);