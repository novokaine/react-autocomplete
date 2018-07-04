import React from 'react';
import RenderCountry from './RenderCountry';
import RenderSearch from './RenderSearch';
import  { Scrollbars } from 'react-custom-scrollbars';
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
		
		
		this.searchCountry      = this.searchCountry.bind(this);
		this.selectCountry      = this.selectCountry.bind(this);
		this.toggleDropdown     = this.toggleDropdown.bind(this);
		this.handleScroll       = this.handleScroll.bind(this);
		this.renderCountry      = this.renderCountry.bind(this);
		
	}
	
	renderCountry(country, key){
		const {cursor} = this.state;
		
		return (
			<RenderCountry
				dataKey={key}
				countryDetails={country}
				selectCountry={this.selectCountry}
				click={() => this.selectCountry(country)}
				cursor={cursor}
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
			value: country.name,
			flag: country.code,
			dropDownVisible: !this.state.dropDownVisible,
			filterCountry: this.props.countriesData
		}, ()=>{console.log('finish')});
	}

	componentWillMount() {
		this.setState({loading: true});
		
		this.setState({
			countryList:this.props.countriesData,
			loading: false,
			filterCountry: this.props.countriesData
		});
	}
 
	componentDidMount() {
		console.log('component did mount')
	} 
 
	componentWillUpdate(){
	
	}
	
	componentWillReceiveProps(){
		console.log('component will receive props');
	}
	
	componentWillUnmount(){
		console.log('Component will unmount');
	}
	
	toggleDropdown(event){
		
		if(event.target.className !== 'select') {
			return;
		}
		
		this.setState({
			dropDownVisible: !this.state.dropDownVisible
		}, ()=> { this.searchInput.focus() });
		
		event.target.value = "";
		
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
		//console.log(event);
		/*console.log(event);
		console.log(Scrollbars);*/
		//console.log(event);
		/*let scroll = new Scrollbars();
		console.log(scroll)*/
		
		//console.log('here is handle scroll update')
	}
	
	getScroll(event){

		/* @TODO - get the scroll top value of the focused element on keyboard navigation*/
		//console.log(event, values)
		//this.refs.mineScrollbar.scrollTop(this.state.scrollOffest);
	}
	
	handleScroll(event){
		//console.log(event);
		
		//this.setState({scrollOffest: values.top});
		
		/*const mineScrollbar = new Scrollbars();
		mineScrollbar.scrollToTop(100);*/
		//console.log(mineScrollbar)
		
		//console.log(Scrollbars);
		//Scrollbars.scrollTop;
		//getScrollHeight()
	}
	
	render() {
		const {loading, filterCountry, dropDownVisible, flag, value} = this.state,
			dropDownClassName = dropDownVisible ? "search-wrapper opened" : "search-wrapper";
			
		return (
			<div className={dropDownClassName} onClick={(event) => this.toggleDropdown(event)} >
				<ul>
					<RenderSearch flag={flag} value={value}/>
					<li className="dropdown-list">
						{/*ref="searchCountry"*/}
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
									(filterCountry.length ? filterCountry.map((country, key) => this.renderCountry(country, key)) :
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