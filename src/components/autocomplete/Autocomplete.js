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
			dropDownVisible: false,
			cursor: 0,
			selectedElement: 0,
			scrollOffest: 0
		};
		
		
		this.searchCountry = this.searchCountry.bind(this);
		this.selectCountry = this.selectCountry.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		
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
		//console.log(this.state.scrollOffest);
	}
	
	componentWillReceiveProps(){
		console.log('component will receive props');
	}
	
	componentWillUnmount(){
		console.log('Component will unmount');
	}
	
	toggleDropdown(event){
		/*console.log(event.target.className);
		console.log(this.refs.searchCountry.className);*/
		
		if(event.target.className !== this.refs.searchCountry.className){
			this.state.dropDownVisible ? this.setState({dropDownVisible: false}) : this.setState({dropDownVisible: true});
			this.refs.searchCountry.value = "";
			this.setState({
				filterCountry: this.state.countryList
			})
		}
		
	}

	keyboardNavigation(key){
		let keyKode = ['ArrowUp','ArrowDown', 'Enter'];
		if(keyKode.indexOf(key.key) != -1){
			switch (key.key){
				case 'ArrowDown':
					this.setState({cursor: this.state.cursor + 1});
					break;
				case 'ArrowUp':
					this.setState({cursor: this.state.cursor - 1 ? this.state.cursor > 0 : 0});
					break;
			}
		}
	}
	
	handleScrollUpdate(event, values){
		/*console.log(event);
		console.log(Scrollbars);*/
		//console.log(event);
		/*let scroll = new Scrollbars();
		console.log(scroll)*/
		
		//console.log('here is handle scroll update')
	}
	
	getScroll(event, values){
		//console.log(event, values)
	}
	
	handleScroll(event, values){
		console.log(event)
		//this.setState({scrollOffest: values.top});
		
		/*const mineScrollbar = new Scrollbars();
		mineScrollbar.scrollToTop(100);*/
		//console.log(mineScrollbar)
		
		//console.log(Scrollbars);
		//Scrollbars.scrollTop;
		//getScrollHeight()
	}
	
	render() {
		const {loading, flag, filterCountry, dropDownVisible, cursor} = this.state,
			dropDownClassName = dropDownVisible ? "search-wrapper opened" : "search-wrapper";
			
		return (
			<div className={dropDownClassName}  onClick={(event) => this.toggleDropdown(event)} >
				<ul>
					<li className="select-option">
						{ flag ? <svg className="selected-flag"><use xlinkHref={"#" + flag.toLocaleLowerCase()} /></svg> : ''}
						<input value={this.state.value} className={flag ? 'select choosed' : 'select' } readOnly="readonly" type="text" title={this.state.value}/>
						<i className="ico-wb-triangle"/>
					</li>

					<li className="dropdown-list">
						
						<input autoFocus="true" ref="searchCountry"
						       className="search"
						       placeholder="Search"
						       type="text"
						       onChange={() => this.searchCountry(this.refs.searchCountry.value)}
						       onKeyDown={(keyEvent) => this.keyboardNavigation(keyEvent)} />
						
						<i className="ico-wb-search"></i>
						
						<ul>
							<Scrollbars style={{width: 340}}
							            autoHeight
							            onUpdate={(event, values)=>this.handleScrollUpdate(event, values)}
							            onScroll={(Signature, values)=>this.getScroll(Signature, values)}
							            onScrollFrame={this.handleScroll}>

								{loading ? <li>Loading</li> : 
									(filterCountry.length ? 
										filterCountry.map((country, key) => 
												<li key={key} onClick={() => this.selectCountry(country)} className={ key == cursor ? 'hover' : ''}>
													<svg>
														<svg><use  xlinkHref={`#` + country.code.toLowerCase()} /></svg>
													</svg>
													<span>{country.name}</span>
												</li>
											) : <li><span>No results found</span></li>
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