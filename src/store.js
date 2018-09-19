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
// import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import * as rootReducer from './reducers/countries';
// import { fetchCountries } from './actions/actions';



// const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));
const store = createStore(combineReducers(rootReducer), applyMiddleware(thunkMiddleware));

// store.dispatch(fetchCountries());

/*@TODO - map state to props*/


//store.dispatch(getAllCountries()).then(()=>console.log('done'));
//store.dispatch(getAllCountries().then(()=>console.log('done')));
export default store;