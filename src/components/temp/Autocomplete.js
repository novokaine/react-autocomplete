import React from 'react';
import store from '../../store';

class Autocomplete extends React.Component {
	constructor(){
		super();
	}
	componentWillMount(){
		console.log(store.getState())
	}
	
	componentDidMount(){
		console.log(store.getState())
	}
	
	componentWillUpdate(){
		console.log(store.getState())
	}

	render(){
		return (
			<div>Autocomplete here</div>
		)
	}
}

export default Autocomplete;