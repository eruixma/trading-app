import { createActions, handleActions, combineActions, createAction } from 'redux-actions'
import axios from 'axios'
import encodeurl from "encodeurl"

import { fetchPrice } from './quotes'


const defaultState = {
  suggestions: [],
  searchResults: []

}

export const fetchSuggestions = (value) => dispatch => {
  axios
    .get(encodeurl(`/api/v1/search/?q=${value}&limit=5`))
    .then((suggestions) => {
      dispatch(updateSuggestions(suggestions))
    })
}

export const search = (value) => dispatch => {
  axios
    .get(encodeurl(`/api/v1/search/?q=${value}`))
    .then((results) => {
      dispatch(updateSearchResults(results))
      results.data.forEach(result => {
        dispatch(fetchPrice(result.symbol))
      })
    })
}

export const updateSuggestions = createAction('UPDATE_SUGGESTIONS')

export const updateSearchResults = createAction('UPDATE_SEARCH_RESULTS')

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS')

const reducer = handleActions(
  {
    [updateSuggestions]: (state, {payload}) => {
      return {...state, suggestions: payload.data}
    },

    [updateSearchResults]: (state, {payload}) => {
      return {...state, searchResults: payload.data}
    },

    [clearSuggestions]: (state) => {
      return {...state, suggestions: []}
    }
  },
  defaultState
)

export default reducer
