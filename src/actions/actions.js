const COUNTRY_URL = 'http://localhost:3500/countries.json';

export const fetchCountriesList = () => {
	const promise = fetch(COUNTRY_URL)
		.then(response=>response.json())
		.then(countries => {
			return countries;
		})
		.catch(error => error);
		// .then(countries=>response);
	return {
		types: ['GET_COUNTRIES_REQUEST', 'GET_COUNTRIES_LIST_SUCCESS'],
		promise
	}
	
	//return promise;
}
