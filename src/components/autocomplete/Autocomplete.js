import React from 'react';
import RenderCountry from "./RenderCountry";
import {Scrollbars } from "react-custom-scrollbars";
//https://github.com/malte-wessel/react-custom-scrollbars

class Autocomplete extends React.Component {
	constructor() {
		super();

		this.state = {
			countryList: [], //initial state filled with countries
			loading: false,
			value: "Please select", 
			flag: "",
			selected: {},
			filterCountry: [], //will be updated with results of countries found
			dropDownVisible: false
		};
		
		
		this.searchCountry = this.searchCountry.bind(this);
		this.selectCountry = this.selectCountry.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		
	}
	
	renderCountryOld(country, key){
		return (
			<RenderCountry dataKey={key} countryDetails={country} selectCountry={this.selectCountry} />
		)
	}
	
	renderCountry(country, key){
		return(
			<li key={key}>
				<svg>
					<svg><use  xlinkHref={"#" + country.code.toLowerCase()} /></svg>
				</svg>
				<span>{country.name}</span>
			</li>
		)
	}
	
	searchCountry(searchString){
		let regex = new RegExp(searchString, 'gi');
		var data = this.state.countryList;

		let matches =  data.filter(country => {
			return country.name.match(regex)
		});

		this.setState({
			filterCountry: matches
		})
	}
 
	selectCountry(country){
		this.setState({
			value: country.name,
			flag: country.code
		})
	}

	componentWillMount() {
		this.setState({loading: true});
		this.setState({
			countryList:this.props.countriesData,
			loading: false,
			filterCountry: this.props.countriesData
		})
	}
 
	componentDidMount() {
		this.dropdown = this.refs.dropdown;
		console.log('component did mount')
	} 
 
	componentWillUpdate(){
		console.log('component will update');
	}
	
	componentWillReceiveProps(){
		console.log('component will receive props');
	}
	
	componentWillUnmount(){
		console.log('Component will unmount');
	}
	
	toggleDropdown(event){
		console.log(event.target.className);
		console.log(this.refs.searchCountry.className);
		
		if(event.target.className !== this.refs.searchCountry.className){
			this.state.dropDownVisible ? this.setState({dropDownVisible: false}) : this.setState({dropDownVisible: true});
			this.refs.searchCountry.value = "";
			this.setState({
				filterCountry: this.state.countryList
			})
		}
		
	}
	
	render() {
		const {loading, flag, filterCountry, dropDownVisible} = this.state,
			dropDownClassName = dropDownVisible ? "search-wrapper opened" : "search-wrapper",
			svgData =  this.props.svgData;
		console.log(svgData)
		return (
			<div className={dropDownClassName}  onClick={(event) => this.toggleDropdown(event)} >
				<ul>
					<li className="select-option">
						{ flag ? <svg className="selected-flag"><use xlinkHref={"#" + flag.toLocaleLowerCase()} /></svg> : ''}
						<input value={this.state.value} className={flag ? 'select choosed' : 'select' } readOnly="readonly" type="text" title={this.state.value}/>
						<i className="ico-wb-triangle"/>
					</li>

					<li className="dropdown-list">
						<input autoFocus="true" ref="searchCountry" className="search" placeholder="Search" type="text"  onChange={() => this.searchCountry(this.refs.searchCountry.value)} />
						<i className="ico-wb-search"></i>
						<ul onKeyDown={this.keyboardNavigation}>
							<Scrollbars style={{width: 340}} autoHeight>
								{loading ? <li>Loading</li> : filterCountry.map((country, key) =>
									<li key={key} onClick={() => this.selectCountry(country)}>
										<svg>
											<svg><use  xlinkHref={`#` + country.code.toLowerCase()} /></svg>
										</svg>
										<span>{country.name}</span>
									</li>
								)}
							</Scrollbars>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default Autocomplete;