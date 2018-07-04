import React from 'react';

const RenderSearch = (props)=>{
	const {flag, value} = props;
	return(
		<li className="select-option">
			{ flag ? <svg className="selected-flag"><use xlinkHref={"#" + flag.toLocaleLowerCase()} /></svg> : ''}
			<input value={value} className={flag ? 'select choosed' : 'select' } readOnly="readonly" type="text" title={value} ref={props.propRef} />
			<i className="ico-wb-triangle"/>
		</li>
	)
};

export default RenderSearch;