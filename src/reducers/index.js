import { combineReducers } from 'redux'
import app from './app'
import search from './search'
import quotes from './quotes'

export default combineReducers({
  app,
  quotes,
  search
})
