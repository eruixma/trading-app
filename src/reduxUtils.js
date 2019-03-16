import { compose } from 'redux'
import persistState from 'redux-localstorage'

export function initEnhancer(persist = true, persistConfig = {}) {
  const {paths, config} = persistConfig
  const composeEnhancers = process.env.WEBPACK_MODE === 'development'
    /* eslint-disable-next-line no-underscore-dangle */
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
    : compose

  return persist
    ? composeEnhancers(persistState(paths, config))
    : composeEnhancers()
}
