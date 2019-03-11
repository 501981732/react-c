import React from 'react';
import ReactDOM from 'react-dom';
import Route from '@/route/';

import {AppContainer} from 'react-hot-loader'

import '@/assets/css/reset.css';

import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Route />, document.getElementById('root'));

const render = Components => {
    ReactDOM.render(
        <AppContainer>
            <Components />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(Route)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
