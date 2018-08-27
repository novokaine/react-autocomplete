/*===============@FIRST VARIANT===============*/
/*
import { createStore, compose} from 'redux';
import rootReducer from './reducers/index';
import countries from './data/countries';

const defaultState = {
	countries
};

const store = createStore(rootReducer, defaultState);

store.dispatch({
	type: 'GET_COUNTRIES_LIST',
	countries: countries
});

export default store;*/

/*===============@SECOND VARIANT===============*/
/*
import {createStore } from 'redux';
import countries from './data/countries';

function getAllCountries(state =[], action){
	switch (action.type){
		case 'GET_COUNTRIES_LIST':
			console.log(action)
	}
}

const store = createStore(getAllCountries, countries);

store.dispatch({
	type: 'GET_COUNTRIES_LIST',
	countries: countries
});

export default store;*/

/*===============@THIRD VARIANT===============*/
/*
import {createStore , applyMiddleware} from 'redux';
import countriesReducer from './reducers/index';
import countries from './data/countries';

function getAllCountries({getState}){
	return next => action => {
		console.log('will dispatch an action');
		
		const returnValue = next(action);
		console.log('state after dispatch');
		
		return returnValue;
	}
}

const store = createStore(countriesReducer, applyMiddleware(getAllCountries));

store.dispatch({
	type: 'GET_COUNTRIES_LIST',
	countries: countries
});

export default store;*/


/*===============@4-th VARIANT===============*/
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import countries from './data/countries';
import * as createAction from './actions/actions';

import { countriesApi, simpleFetchCountries } from './api/countriesApi';

const store = createStore(rootReducer, applyMiddleware(thunk));

function getAllCountries(){
	return (dispatch) => {
		return simpleFetchCountries()
			/*.then(
				response => response.json()
				//response=>dispatch(createAction.getCountries(response.json()))
			)*/
			.then((countriesList)=> {
					console.log(createAction);
					countriesList => dispatch(createAction.getCountries(countriesList));
				}
			)
			/*.then(countriesList=>
				countriesList => dispatch(createAction.getCountries(countriesList))
			)*/
		/*return simpleFetchCountries()
			.then( response => response.json())
			.then(data=>data)*/
	}
}

store.dispatch(getAllCountries());
//store.dispatch(getAllCountries().then(()=>console.log('done')));
export default store;