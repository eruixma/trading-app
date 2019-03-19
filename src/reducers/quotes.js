import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'
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
  },
  prices:{

  }
}

const fetchWorldIndices = () => dispatch => {
  axios
    .get(`/api/v1/quotes/indices`)
    .then((indices) => {
      dispatch(updateWorldIndices(indices))
    })
}

const fetchRealtimeSector = ()=>dispatch =>{
  axios
    .get('/api/v1/quotes/sector')
    .then(sectors=>{
      dispatch(updateRealtimeSector(_.mapValues(sectors.data, v=>parseFloat(v))))
    })
}

const fetchPrice = (symbol)=>dispatch=>{
  axios.get(`/api/v1/quotes/price/${symbol}`)
    .then(price=>{
      dispatch(updatePrice({symbol, price: price.data}))
    })
}

const updateWorldIndices = createAction('UPDATE_WORLD_INDICES')
const updateRealtimeSector = createAction('UPDATE_REALTIME_SECTOR')
const updatePrice = createAction('UPDATE_STOCK')

export const actions = {
  fetchWorldIndices,
  fetchRealtimeSector,
  fetchPrice,
  updateWorldIndices,
  updateRealtimeSector,
  updatePrice
}


const reducer = handleActions(
  {
    [updateWorldIndices]: (state, {payload}) => {
      return {...state, worldIndices:payload.data}
    },
    [updateRealtimeSector]: (state, {payload}) => {
      return {...state, realtimeSector:payload}
    },
    [updatePrice]: (state, {payload})=>{
      return {...state, prices: {...state.prices, [payload.symbol]: payload.price}}
    }
  },
  defaultState
)

export default reducer
