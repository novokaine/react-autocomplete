import React from 'react';
import RenderCountry from './RenderCountry';
import RenderSearch from './RenderSearch';
import  { Scrollbars } from 'react-custom-scrollbars';
import store from '../../reducers/countries';

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
	
	renderCountry(country, dataKey){
		return (
			<RenderCountry
				key={dataKey}
				dataKey={dataKey}
				countryDetails={country}
				selectCountry={this.selectCountry}
				click={() => this.selectCountry(country)}
				cursor={this.state.cursor}
				refNode={(node)=>{this.country = node}}
				svgData={this.props.svgData}
			/>
		)
	}
	
	searchCountry(searchString){
		let regex = new RegExp(searchString, 'gi');
		let data = this.state.countryList;

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
		console.log(store);
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
					this.setState({cursor: this.state.cursor < this.state.filterCountry.length ? this.state.cursor += 1 : this.state.filterCountry.length -= 1});
					break;
				case 'ArrowUp':
					this.setState({cursor: this.state.cursor > 0 ? this.state.cursor -=1 : 0});
					break;
			}
		}
		/*console.log(this.scrollbar)
		console.log(this.scrollbar.getClientHeight());
		console.log(this.scrollbar.getScrollHeight());
		console.log(this.scrollbar.view.children)*/
		//this.scrollbar.scrollTop(this.scrollbar.props.children[this.state.cursor])
		//this.scrollbar.scrollTop(this.state.cursor * 34 ? this.state.cursor >=0  && this.state.cursor <= this.state.filterCountry.length: '');
		//this.scrollbar.scrollTop(this.state.cursor * 34);
		//console.log(this.state.cursor);
		
		if(this.state.cursor < this.scrollbar.view.children.length) {
			this.scrollbar.scrollTop(this.scrollbar.view.children[this.state.cursor].offsetTop);
		}
		
		//console.log(this.scrollbar.view.children[this.state.cursor].offsetTop)
		
		 //this.scrollbar.scrollTop(this.state.cursor * this.scrollbar.props.children.height);
		// console.log(document.querySelector(`${this.dropDownList}`))
		//console.log(this.country)
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
		//console.log(store)
		return (
			/*@TODO - check to see a better splitting*/
			<div className={dropDownClassName} onClick={(event) => this.toggleDropdown(event)} >
				<ul>
					<RenderSearch flag={flag} value={value} propRef={(node)=>{this.select = node}} svgData={this.props.svgData}/>
					
					<li className="dropdown-list">
						<input ref={(input)=>{this.searchInput = input}}
						       className="search"
						       placeholder="Search"
						       type="text"
						       onChange={() => this.searchCountry(this.searchInput.value)}
						       onKeyDown={(keyEvent) => this.keyboardNavigation(keyEvent)} />
						
						<i className="ico-wb-search"></i>
						
						
							<Scrollbars style={{width: 340}}
							            autoHeight
							            onUpdate={this.handleScrollUpdate}
							            onScroll={this.getScroll}
							            onScrollFrame={this.handleScroll}
							            ref={(scrollbar) => {this.scrollbar = scrollbar}}>
								
								<ul>
									{loading ?
									<li>Loading</li> :
									(filterCountry.length ?
										filterCountry.map((country, key) => this.renderCountry(country, key)) :
											<li><span>No results found</span></li>
								)}
							
						</ul>
					</Scrollbars>
					</li>
				</ul>
			</div>
		)
	}
}

export default Autocomplete;