import React from 'react';
import store from '../../store';

class Autocomplete extends React.Component{
	constructor(){
		super();
	}
	
	componentDidMount(){
		console.log(store.getState())
	}

	render(){
		return (
			<div>Autocomplete here</div>
		)
	}
}

export default Autocomplete;