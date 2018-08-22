import thunkMiddleware  from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {fetchCountries} from '../api/countriesApi';
import {countriesActions} from '../actions/actions';

//export const receiveData = data => ({ type: 'RECEIVE_DATA', data: data });
const reduxAction = countriesActions();

function createCountryList(state = [], action) {
	switch (action.type) {
		case 'FETCH_COUNTRIES_FROM_API':
			return action.data || state;
		default:
			return state
	}
}

const store = createStore(createCountryList, applyMiddleware(thunkMiddleware));

store.dispatch({
	type: reduxAction.type,
	data: fetchCountries()
});

console.log(store.getState());

 export default store;



