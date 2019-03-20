import React, { Component } from 'react'
import { getContext } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { format } from 'd3-format'
import * as classnames from 'classnames'

class PortfolioKpi extends Component {
  render() {
    const {store: {portfolio: {stocks}}} = this.props
    let totalMV = stocks.reduce((total, stock) => total + stock.totalMarketValue, .0)
    let pl = stocks.reduce((total, stock) => total + stock.floatingProfitLoss, .0)
    return (
      <div className={'row'} style={{height: 150}}>
        <div className="tile sm-3">
          <div className="header">
            <div className="left">
              <div className="title">Total market value</div>
            </div>
          </div>
          <div className="content">
            <div className="kpi">
              <div className="item text-xl">{format('$,.4s')(totalMV)}</div>
            </div>
          </div>
        </div>
        <div className="tile sm-3">
          <div className="header">
            <div className="left">
              <div className="title">Floating P/L</div>
            </div>
          </div>
          <div className="content">
            <div className={classnames('kpi')}>
              <div className={classnames("item text-xl", {'color-green': pl >= 0, 'color-red': pl < 0})}>
                <span><i className={classnames("icon", {
                  'icon-arrow-up': pl >= 0,
                  'icon-arrow-down': pl < 0
                })}/></span>
                <span>{format('.2%')(pl / totalMV)}</span>
                <span>&nbsp;</span>
                </div>
              <div className="item text-xl"><span>{format('$,.4s')(pl)}</span></div>
            </div>
          </div>
        </div>
        <div className="tile sm-3">
          <div className="header">
            <div className="left">
              <div className="title">Balance</div>
            </div>
          </div>
          <div className="content">
            <div className="kpi">
              <div className="item text-xl">{format('$,.4s')(125488467)}</div>
            </div>
          </div>
        </div>
        <div className="tile sm-3">
          <div className="header">
            <div className="left">
              <div className="title">Total</div>
            </div>
          </div>
          <div className="content">
            <div className="kpi">
              <div className="item text-xl">{format('$,.4s')(125488467 + totalMV)}</div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default getContext({
  store: PropTypes.object,
  actions: PropTypes.object,
})(withRouter(PortfolioKpi))
