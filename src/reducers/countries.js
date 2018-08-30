function countriesReducer(state =[], action){
	switch (action.type){
		case 'GET_COUNTRIES_LIST':
			return action.data;
		default:
			return state;
	}
}

export default countriesReducer;