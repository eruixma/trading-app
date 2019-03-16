import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { applyMiddleware, createStore, compose } from 'redux'
import { initEnhancer } from './reduxUtils'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const initState = {
  theme: 'dark'
}

const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(thunk),
    initEnhancer(false),
  ),
)


ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    )
  })
}

