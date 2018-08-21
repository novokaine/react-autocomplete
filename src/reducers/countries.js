import thunkMiddleware  from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
const COUNTRY_URL = 'http://localhost:3500/countries.json';
/*
import  {fetchCountries}  from '../api/countriesApi';
import thunkMiddleware  from 'redux-thunk';
*/

/*
const COUNTRY_URL = 'http://localhost:3500/countries.json';

export const receiveData = data => ({type: 'RECEIVE_DATA', data: data});
*/


//console.log(fetchCountries())
export const receiveData = data => ({ type: 'RECEIVE_DATA', data: data });

function createCountryList(state = [], action) {
	switch (action.type) {
		case 'RECEIVE_DATA':
			return action.data || state;
		default:
			return state
	}
}

export const fetchCountries = () => {
	return dispatch => {
		fetch(COUNTRY_URL)
			.then(response=>response.json())
			.then(countries=>dispatch(receiveData(countries)));
	}
};


const store = createStore(createCountryList, applyMiddleware(thunkMiddleware));

store.dispatch(fetchCountries());

/*store.dispatch({
	type: 'RECEIVE_DATA',
	data: this.FetchCountries
});*/



/*store.dispatch({
	type: 'RECEIVE_DATA',
	data: countriesList
});*/
setTimeout(function(){
	console.log(store.getState());
}, 300)



/*const store = createStore(function(state, action){
	switch (action.type){
		case 'ADD_COUNTRIES':
			let countries = Object.assign({}, action.data, {
				countriesList: countriesList
			});
			return Object.assign({}, state, {
				countries: state.countries ? state.countries.concat([countries]) : countries
			});
			break;
			
		default:
			return state || {};
	}
});

store.subscribe(()=>{
	console.log(store.getState());
	
});

store.dispatch({
	type: 'ADD_COUNTRIES'
})*/


/*store.subscribe(() =>{
	console.log(store.getState())
})*/
//console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]

 export default store;
//export default store;


