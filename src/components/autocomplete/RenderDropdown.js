import React, {Component} from 'react';
import RenderCountry from './RenderCountry.js';
import RenderSearch from './RenderSearch.js';
import  { Scrollbars } from 'react-custom-scrollbars';


/*@TODO - yet to be implemented (for a better component splitting)*/
class RenderDropdown extends Component{

	constructor(){
		super();

		this.state = {
			cursor: 0
		};

		this.renderCountry = this.renderCountry.bind(this);
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

	render(){
		const {loading, filterCountry, dropDownVisible, flag, value} = this.props;
		return(
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
								(filterCountry.length ? filterCountry.map((country, key) => this.renderCountry(country, key)) :
									<li><span>No results found</span></li>
								)}
						</Scrollbars>
					</ul>
				</li>
			</ul>
		)
	}
}

export default RenderDropdown;