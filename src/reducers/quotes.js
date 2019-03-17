import { createActions, handleActions, combineActions, createAction } from 'redux-actions'
import axios from 'axios'
import encodeurl from "encodeurl"


const defaultState = {
  worldIndices: []
}

export const fetchWorldIndices = () => dispatch => {
  axios
    .get(`/api/v1/quotes/indices`)
    .then((indices) => {
      dispatch(updateWorldIndices(indices))
    })
}

export const updateWorldIndices = createAction('UPDATE_WORLD_INDICES')


const reducer = handleActions(
  {
    [updateWorldIndices]: (state, {payload}) => {
      return {...state, worldIndices:payload.data}
    }
  },
  defaultState
)

export default reducer
