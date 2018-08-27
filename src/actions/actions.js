export function getCountries(state = [], countriesList){
	console.log('state: ', state, 'CountryList: ', countriesList);
	alert('')
	return {
		type: 'GET_COUNTRIES_LIST',
		countriesList
	}
}

/*export function filterCountries(state = [], filteredCountries){
	return {
		type: 'FILTER_COUNTRIES',
		filteredCountries
	}
}*/

// export const getCountries = countryList => ({ type: 'GET_COUNTRIES_LIST', data: countryList });