import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'
import encodeurl from "encodeurl"

import { actions as quotesActions } from './quotes'


const defaultState = {
  suggestions: [],
  searchResults: []

}

const fetchSuggestions = (value) => dispatch => {
  axios
    .get(encodeurl(`/api/v1/search/suggestions?q=${value}&limit=5`))
    .then((suggestions) => {
      dispatch(updateSuggestions(suggestions))
    })
}

const search = (value) => dispatch => {
  axios
    .get(encodeurl(`/api/v1/search/stocks?q=${value}`))
    .then((results) => {
      dispatch(updateSearchResults(results))
      results.data.forEach(result => {
        dispatch(quotesActions.fetchPrice(result.symbol))
      })
    })
}

const updateSuggestions = createAction('UPDATE_SUGGESTIONS')

const updateSearchResults = createAction('UPDATE_SEARCH_RESULTS')

const clearSuggestions = createAction('CLEAR_SUGGESTIONS')

export const actions = {
  fetchSuggestions,
  search,
  updateSuggestions,
  updateSearchResults,
  clearSuggestions
}

const reducer = handleActions(
  {
    [updateSuggestions]: (state, {payload}) => {
      return {...state, suggestions: payload.data}
    },

    [updateSearchResults]: (state, {payload}) => {
      return {...state, searchResults: payload.data}
    },

    // [clearSuggestions]: (state) => {
    //   return {...state, suggestions: []}
    // }
  },
  defaultState
)

export default reducer
