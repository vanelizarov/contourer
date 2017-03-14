import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer as HotContainer} from 'react-hot-loader';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app';

import allReducers from './reducers';

class Aggregator {

    constructor() {

        const appContainer = document.getElementById('app');
        const store = createStore(
            allReducers,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );

        ReactDOM.render(
            <HotContainer>
                <Provider store={store}>
                    <App />
                </Provider>
            </HotContainer>,
            appContainer
        );

        if (module.hot) {

            module.hot.accept('./components/app', () => {
                require('./components/app');

                ReactDOM.render(
                    <HotContainer>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </HotContainer>,
                    appContainer
                );

            });

        }
    }

}

export default new Aggregator();
