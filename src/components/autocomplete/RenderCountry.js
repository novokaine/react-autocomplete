import React from 'react';

const RenderCountry = (props) =>{
	return(
		<li key={props.dataKey} onClick={props.click} className={props.dataKey === props.cursor ? 'hover' :''} ref={props.refNode}  >
			<svg>
				<svg><use  xlinkHref={`${props.svgData}#${props.countryDetails.code.toLowerCase()}`} /></svg>
			</svg>
			<span>{props.countryDetails.name}</span>
		</li>
	)
};

export default RenderCountry;