import React from 'react';
import ReactDOM from 'react-dom';
import Route from '@/router/';

import {AppContainer} from 'react-hot-loader'

import '@/assets/css/reset.css';
import '@/assets/css/common.css';

import * as serviceWorker from './serviceWorker';

// const Index = lazy(() => import('@/pages/index/'));

// const App = () => (
//   <Router>
//     <Suspense fallback={<div>Loading...</div>}>
//       <Switch>
//         <Route exact path="/" component={Index}/>
//       </Switch>
//     </Suspense>
//   </Router>
// );
// ReactDOM.render(<App />, document.getElementById('root'));

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
