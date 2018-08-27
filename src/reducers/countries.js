/*function countriesReducer(state = [], action){
	console.log('here is the state:', state,  'and here is the action', action);
	return state;
}*/

function countriesReducer(state =[], action){
	switch (action.type){
		case 'GET_COUNTRIES_LIST':
			console.log(action)
			return action.getCountries()
		default:
			return state;
	}
}

export default countriesReducer;