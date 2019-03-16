import { compose } from 'redux'
import persistState from 'redux-localstorage'

export function initEnhancer(persist = true, persistConfig = {}) {
  const {paths, config} = persistConfig
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


  return persist
    ? composeEnhancers(persistState(paths, config))
    : composeEnhancers()
}
