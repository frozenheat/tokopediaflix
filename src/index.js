import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './components/Home.js';
import Detail from './components/Detail.js';

import Header from './Header';

import {Provider} from 'react-redux';
import store from './redux/stores/store';

import './assets/css/bootstrap.min.css';
import './assets/css/custom.css';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<div className="page-wrapper">
				<Header/>
				<div className="body">
					<Switch>
						<Route path="/" component={Home} exact/>
						<Route path="/detail/:movieSlug" component={Detail}/>
						<Route  component = {Error}/>
					</Switch>
				</div>
			</div>
		</Provider>
	</BrowserRouter>
	, document.getElementById('root'));