import {fetchCountriesList} from '../actions/actions';

const initialState = {
	countriesList: fetchCountriesList(),
	areCountriesLoading: true,
	areCountriesLoaded: false
}

export function countriesReducer(state = initialState, action){
	switch (action.type){
		case 'GET_COUNTRIES_REQUEST':
			return state.set('areCountriesLoading', true);
			
		case 'GET_COUNTRIES_LIST_SUCCESS': {
			console.log(action);
			debugger;
			return state
				.set('areCountriesListLoading', false)
				.set('areCountriesListLoaded', true)
				.set('countriesList', action.result.countriesList);
			//return action.data;
		}
		break;
		
		default:
			return state;
	}
}

// export default countriesReducer;