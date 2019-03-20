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
  prices:{},
  summaries:{},
  intradayTimeSeries:{},
  dailyTimeSeries:{},
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

const fetchSummary = (symbol)=>dispatch=>{
  axios.get(`/api/v1/search/stocks?q=symbol:${symbol}`)
    .then(summary=>{
      dispatch(updateSummary({symbol, summary: summary.data[0]}))
    })
}

const fetchIntradayTimeSeries = (symbol)=>dispatch=>{
  axios.get(`/api/v1/quotes/timeseries/${symbol}?function=TIME_SERIES_INTRADAY&interval=1`)
    .then(timeSeries=>{
      dispatch(updateTimeSeries({symbol, intradayTimeSeries: timeSeries.data}))
    })
}

const fetchDailyTimeSeries = (symbol)=>dispatch=>{
  axios.get(`/api/v1/quotes/timeseries/${symbol}?function=TIME_SERIES_DAILY`)
    .then(timeSeries=>{
      dispatch(updateDailyTimeSeries({symbol, dailyTimeSeries: timeSeries.data}))
    })
}


const updateWorldIndices = createAction('UPDATE_WORLD_INDICES')
const updateRealtimeSector = createAction('UPDATE_REALTIME_SECTOR')
const updatePrice = createAction('UPDATE_STOCK')
const updateSummary = createAction('UPDATE_SUMMARY')
const updateTimeSeries = createAction('UPDATE_TIME_SERIES')
const updateDailyTimeSeries = createAction('UPDATE_DAILY_TIME_SERIES')

export const actions = {
  fetchWorldIndices,
  fetchRealtimeSector,
  fetchPrice,
  fetchSummary,
  fetchIntradayTimeSeries,
  fetchDailyTimeSeries,
  updateWorldIndices,
  updateRealtimeSector,
  updatePrice,
  updateSummary,
  updateTimeSeries,
  updateDailyTimeSeries,
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
    },
    [updateSummary]: (state, {payload})=>{
      return {...state, summaries: {...state.summaries, [payload.symbol]: payload.summary}}
    },
    [updateTimeSeries]: (state, {payload})=>{
      return {...state, intradayTimeSeries: {...state.intradayTimeSeries, [payload.symbol]: payload.intradayTimeSeries}}
    },
    [updateDailyTimeSeries]: (state, {payload})=>{
      return {...state, dailyTimeSeries: {...state.dailyTimeSeries, [payload.symbol]: payload.dailyTimeSeries}}
    },
  },
  defaultState
)

export default reducer
