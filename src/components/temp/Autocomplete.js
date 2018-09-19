import React from 'react';
import store from '../../store';
import {connect} from 'react-redux';
import {getCountriesList} from '../../selectors/countries';
import {fetchCountriesList} from '../../actions/actions';

class Autocomplete extends React.Component {
	constructor(){
		super();
	}
	componentWillMount(){
		
		console.log(this.props)
		//console.log(store.getState())
	}
	
	componentDidMount(){
		//this.getCountriesList();
		// console.log(store.getState())
	}
	
	componentWillUpdate(){
		// console.log(store.getState())
	}
	
	render(){
		// console.log(this.props.getCountries);
		return (
			<div>Autocomplete here</div>
		)
	}
}


export default connect(state => {
	//selectors here
	countries: getCountriesList(state)
}, dispatch => {
	//actions here
	getCountryList: () => dispatch(fetchCountriesList())
})(Autocomplete);

// export default Autocomplete;