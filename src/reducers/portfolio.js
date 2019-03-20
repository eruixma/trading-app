import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'
import _ from "lodash"


const defaultState = {
  stocks:[]
}


const fetchPortfolio = () => dispatch => {
  axios
    .get(`/api/v1/portfolio/`)
    .then(({data}) => {
      dispatch(updatePortfolio(data))
    })
}

const updatePortfolio = createAction('UPDATE_PORTFOLIO')


export const actions = {
  fetchPortfolio,
}

const reducer = handleActions(
  {
    [updatePortfolio]: (state, {payload}) => {
      return {...state, stocks:payload}
    },
  },
  defaultState
)

export default reducer
