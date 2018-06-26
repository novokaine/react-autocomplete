import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import countriesData from './data/countries.json';

import Autocomplete from './components/autocomplete/Autocomplete';

ReactDOM.render(<Autocomplete countriesData={countriesData} />, document.getElementById('root'))

registerServiceWorker();
 