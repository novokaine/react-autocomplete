import React                    from 'react';
import ReactDOM                 from 'react-dom';
import registerServiceWorker    from './registerServiceWorker';
import svgSprite                from './data/svg/flags.svg';
// import Autocomplete             from './components/autocomplete/Autocomplete-second';
import Autocomplete from './components/temp/Autocomplete';
import store from './store';
import {Router, Route, IndexRoute} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

const router = (
	<Provider store={store}>
		<Autocomplete/>
	</Provider>
);



// ReactDOM.render(<Autocomplete store={store} countriesData={countriesData} svgData={svgSprite} />, document.getElementById('root'))
// ReactDOM.render(<Autocomplete store={store} />, document.getElementById('root'))

 ReactDOM.render(router, document.getElementById('root'))

registerServiceWorker();
 