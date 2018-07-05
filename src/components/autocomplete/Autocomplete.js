import React from 'react';
import RenderCountry from './RenderCountry';
import RenderSearch from './RenderSearch';
import  { Scrollbars } from 'react-custom-scrollbars';
//https://github.com/malte-wessel/react-custom-scrollbars

class Autocomplete extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: true,
			value: "Please select", 
			flag: "",
			selected: {},
			dropDownVisible: false,
			cursor: 0
		};
		
		
		this.searchCountry      = this.searchCountry.bind(this);
		this.selectCountry      = this.selectCountry.bind(this);
		this.toggleDropdown     = this.toggleDropdown.bind(this);
		this.handleScroll       = this.handleScroll.bind(this);
		this.renderCountry      = this.renderCountry.bind(this);
		
	}
	
	renderCountry(country, key){
		return (
			<RenderCountry
				dataKey={key}
				countryDetails={country}
				selectCountry={this.selectCountry}
				click={() => this.selectCountry(country)}
				cursor={this.state.cursor}
			/>
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
			value:              country.name,
			flag:               country.code,
			dropDownVisible:    !this.state.dropDownVisible,
			filterCountry:      this.props.countriesData
		}, ()=> {
			this.searchInput.value = '';
		});
		
	}
 
	componentDidMount() {
		this.setState({
			loading:        false,
			countryList:    this.props.countriesData,
			filterCountry:  this.props.countriesData
		});
	} 
 
	componentWillUpdate(){
		/*@TODO - yet to be implemented (if needed)*/
	}
	
	componentWillReceiveProps(){
		/*@TODO - yet to be implemented (if needed)*/
	}
	
	componentWillUnmount(){
		/*@TODO - yet to be implemented (if needed)*/
	}
	
	toggleDropdown(event){
		if(event.target !== this.select) {
			return;
		}

		this.setState({
			dropDownVisible: !this.state.dropDownVisible
		}, ()=> { this.searchInput.focus() });
	}

	keyboardNavigation(event){
		let keyKode = ['ArrowUp','ArrowDown', 'Enter'];
		if(keyKode.indexOf(event.key) != -1){
			switch (event.key){
				case 'ArrowDown':
					this.setState({cursor: this.state.cursor < this.state.filterCountry.length ? this.state.cursor + 1 : this.state.filterCountry.length - 1});
					break;
				case 'ArrowUp':
					this.setState({cursor: this.state.cursor > 0 ? this.state.cursor -1 : 0});
					break;
			}
		}
	}
	
	handleScrollUpdate(event){
		/*@TODO - yet to be implemented (if needed)*/
	}
	
	getScroll(event){
		/*@TODO - yet to be implemented (if needed)*/
	}
	
	handleScroll(event){
		/*@TODO - yet to be implemented (if needed)*/
	}
	
	render() {
		const {loading, filterCountry, dropDownVisible, flag, value} = this.state,
			dropDownClassName = dropDownVisible ? "search-wrapper opened" : "search-wrapper";
			
		return (
			/*@TODO - check to see a better splitting*/
			<div className={dropDownClassName} onClick={(event) => this.toggleDropdown(event)} >
				<ul>
					<RenderSearch flag={flag} value={value} propRef={(node)=>{this.select = node}}/>
					
					<li className="dropdown-list">
						<input ref={(input)=>{this.searchInput = input}}
						       className="search"
						       placeholder="Search"
						       type="text"
						       onChange={() => this.searchCountry(this.searchInput.value)}
						       onKeyDown={(keyEvent) => this.keyboardNavigation(keyEvent)} />
						
						<i className="ico-wb-search"></i>
						
						<ul>
							<Scrollbars style={{width: 340}}
							            autoHeight
							            onUpdate={this.handleScrollUpdate}
							            onScroll={this.getScroll}
							            onScrollFrame={this.handleScroll} ref="mineScrollbar">

								{loading ?
									<li>Loading</li> :
									(filterCountry.length ?
										filterCountry.map((country, key) => this.renderCountry(country, key)) :
											<li><span>No results found</span></li>
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