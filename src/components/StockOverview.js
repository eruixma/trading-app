import React, { Component, Fragment } from 'react'
import { getContext } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import * as classnames from 'classnames'
import { timeParse } from "d3-time-format"
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale"
import { last } from "react-stockcharts/lib/utils"
import LineChart from './LineChart'
import { format } from 'd3-format'

class StockOverview extends Component {
  arrowIconClassName = (price) => classnames("icon", {
    "icon-arrow-down": price.change.charAt(0) === '-',
    "icon-arrow-up": price.change.charAt(0) === '+'
  })
  colorClassName = (price) => classnames("item text-md", {
    "color-red": price.change.charAt(0) === '-',
    "color-green": price.change.charAt(0) === '+',
  })

  componentDidMount() {
    const {match, actions} = this.props
    actions.fetchSummary(match.params.symbol)
    actions.fetchPrice(match.params.symbol)
    actions.fetchIntradayTimeSeries(match.params.symbol)
  }

  render() {
    const {store: {quotes: {prices, summaries, intradayTimeSeries}}, match: {params: {symbol}}} = this.props

    const price = prices[symbol]
    const summary = summaries[symbol]
    const timeSeries = intradayTimeSeries[symbol]
    return (
      <Fragment>
        <div className={'row'} style={{height: '280px'}}>
          <div className="tile sm-3">
            <div className="content">
              {price&&summary ? (
                  <div className="kpi">
                    <div className="item text-xl">
                      <span>{price.price}</span>
                    </div>
                    <div className={this.colorClassName(price)}>
                        <span>
                          <i className={this.arrowIconClassName(price)}/>
                        </span>
                      <span>{price.change}</span>
                      <span>&nbsp;</span>
                    </div>
                    <table className={'table tiny dashed'} style={{marginTop: '10px'}}>
                      <tbody>
                      <tr>
                        <td style={{fontWeight: 500}}>Market Cap</td>
                        <td>{format(",.2f")(summary['MarketCap'])}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>Enterprise Value</td>
                        <td>{format(",.2f")(summary['EnterpriseValue'])}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>P/E (TTM)</td>
                        <td>{format(",.2f")(summary['PE'])}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>P/B</td>
                        <td>{format(",.2f")(summary['PB'])}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>Headquarters</td>
                        <td>{summary['location']}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>Industry</td>
                        <td>{summary['industry']}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>) :
                <div style={{display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column'}}>
                  <div className="loading" style={{margin: '0 auto'}}/>
                </div>
              }
            </div>
          </div>
          <div className="tile sm-9">
            <div className="header">
              <div className="left">
                <div className="title">Intraday</div>
              </div>
            </div>
            <div className="content">
              {timeSeries ? <LineChart data={timeSeries} symbol={symbol}/> :
                <div style={{display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column'}}>
                  <div className="loading" style={{margin: '0 auto'}}/>
                </div>}
            </div>
          </div>
        </div>
        <div className="row" style={{height: '280px'}}>
          <div className="tile sm-12">
            <div className="header">
              <div className="left">
                <div className="title">Daily</div>
              </div>
            </div>
            <div className="content">

            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default getContext({
  store: PropTypes.object,
  actions: PropTypes.object,
})(withRouter(StockOverview))
