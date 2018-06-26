import React, {Component} from 'react';

class RenderCountry extends Component{
	render(){
		//console.log(this.props)
		return(
			<li key={this.props.dataKey} onClick={() => this.props.selectCountry(this.props.countryDetails)}>
				<svg>
					<svg><use  xlinkHref={"#" + this.props.countryDetails.code.toLowerCase()} /></svg>
				</svg>
				<span>{this.props.countryDetails.name}</span>
			</li>
		)
	}
}

export default RenderCountry;