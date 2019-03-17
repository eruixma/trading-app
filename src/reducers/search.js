import { createActions, handleActions, combineActions, createAction } from 'redux-actions'
import axios from 'axios'
import encodeurl from "encodeurl"


const defaultState = {
  suggestions: []
}

export const fetchSuggestions = (value) => dispatch => {
  axios
    .get(encodeurl(`/api/v1/search/suggestion?q=${value}`))
    .then((suggestions) => {
      dispatch(updateSuggestions(suggestions))
    })
}

export const updateSuggestions = createAction('UPDATE_SUGGESTIONS')

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS')

const reducer = handleActions(
  {
    [updateSuggestions]: (state, {payload}) => {
      return {...state, suggestions:payload.data}
    },

    [clearSuggestions]: (state) => {
      return {...state, suggestions: []}
    }
  },
  defaultState
)

export default reducer
