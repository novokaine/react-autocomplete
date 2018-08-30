const COUNTRY_URL = 'http://localhost:3500/countries.json';
export const getCountries = countryList => ({ type: 'GET_COUNTRIES_LIST', data: countryList });

export const fetchCountries = () => {
	return dispatch => {
		fetch(COUNTRY_URL)
			.then(response=>response.json())
			.then(countries=>dispatch(getCountries(countries)));
	}
};