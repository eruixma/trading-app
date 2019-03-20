import { combineReducers } from 'redux'
import app from './app'
import search from './search'
import quotes from './quotes'
import portfolio from './portfolio'

export default combineReducers({
  app,
  quotes,
  portfolio,
  search
})
