const COUNTRY_URL = 'http://localhost:3500/countries.json';

export const fetchCountries = () => {
	return fetch(COUNTRY_URL)
		.then(response=>response.json())
		.then(countries=>countries);
};

/*
const countriesList = fetch(COUNTRY_URL)
	.then(response=>response.json())
	.then(countries=>countries);
*/
