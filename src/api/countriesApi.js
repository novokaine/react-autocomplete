const COUNTRY_URL = 'http://localhost:3500/countries.json';

export const countriesApi = () => {
	return fetch(COUNTRY_URL)
		.then(response=>response.json())
		.then(countries=>countries);
};

export const simpleFetchCountries = () =>{
	return fetch('http://localhost:3500/countries.json')
}