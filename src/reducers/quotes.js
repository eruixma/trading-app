import { createActions, handleActions, combineActions, createAction } from 'redux-actions'
import axios from 'axios'
import encodeurl from "encodeurl"
import _ from "lodash"


const defaultState = {
  worldIndices: [],
  realtimeSector: {
    "Information Technology": 0,
    "Consumer Discretionary": 0,
    "Financials": 0,
    "Consumer Staples": 0,
    "Health Care": 0,
    "Utilities": 0,
    "Materials": 0,
    "Communication Services": 0,
    "Energy": 0,
    "Industrials": 0,
    "Real Estate": 0
  }
}

export const fetchWorldIndices = () => dispatch => {
  axios
    .get(`/api/v1/quotes/indices`)
    .then((indices) => {
      dispatch(updateWorldIndices(indices))
    })
}

export const fetchRealtimeSector = ()=>dispatch =>{
  axios
    .get('/api/v1/quotes/sector')
    .then(sectors=>{
      dispatch(updateRealtimeSector(_.mapValues(sectors.data, v=>parseFloat(v))))
    })
}

export const updateWorldIndices = createAction('UPDATE_WORLD_INDICES')
export const updateRealtimeSector = createAction('UPDATE_REALTIME_SECTOR')


const reducer = handleActions(
  {
    [updateWorldIndices]: (state, {payload}) => {
      return {...state, worldIndices:payload.data}
    },
    [updateRealtimeSector]: (state, {payload}) => {
      return {...state, realtimeSector:payload}
    }
  },
  defaultState
)

export default reducer
