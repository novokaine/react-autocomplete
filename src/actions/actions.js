/*ACTIONS CREATORS*/
export const FETCH_COUNTRIES_FROM_API = 'FETCH_COUNTRIES_FROM_API';
const COUNTRY_URL = 'http://localhost:3500/countries.json';
const data = {};
/*
export function fetchCountries(){
	return {
		type: FETCH_COUNTRIES_FROM_API,
		data: countries
	}
};*/

const requestCountries = () =>{
	return {
		type: FETCH_COUNTRIES_FROM_API,
		data
	}
};

export const fetchCountries = () => {
	return dispatch => {
		return fetch(COUNTRY_URL)
			.then(response=>response.json())
			.then(countries=>countries);
	}
	
	/*return fetch(COUNTRY_URL)
		.then(response=>response.json())
		.then(countries=>countries);*/
};