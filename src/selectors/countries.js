import {createSelector} from 'reselect';

export const getCountriesList = state => {
	console.log(state);
	debugger;
	return state.countriesReducer.countriesList;
};