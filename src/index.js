import React                    from 'react';
import ReactDOM                 from 'react-dom';
import registerServiceWorker    from './registerServiceWorker';
import countriesData            from './data/countries.json';
import svgSprite                from './data/svg/flags.svg';
import Autocomplete             from './components/autocomplete/Autocomplete';

ReactDOM.render(<Autocomplete countriesData={countriesData} svgData={svgSprite} />, document.getElementById('root'))

registerServiceWorker();
 