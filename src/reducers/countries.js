import thunkMiddleware  from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {fetchCountries} from "../api/countriesApi";
import * as actions from '../actions/actions';
import {combineReducers} from 'redux';

/*import {
	FETCH_COUNTRIES_FROM_API
} from '../actions/actions';*/

function createCountryList(state = [], action) {
	switch (action.type) {
		case actions.FETCH_COUNTRIES_FROM_API:
			return action.data || state;
		default:
			return state
	}
}
const store = createStore(createCountryList, applyMiddleware(thunkMiddleware));

console.log(fetchCountries())

store.dispatch({
	type: 'RECEIVE_DATA',
	data: 'ceva'
});
console.log(store.getState());
export default store;
/*
console.log(store.getState());
export default store;*/



