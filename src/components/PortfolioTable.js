import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { withRouter } from 'react-router-dom'
import { format } from 'd3-format'
import * as classnames from 'classnames'
import Page from './Page'

class PortfolioTable extends PureComponent {
  componentDidMount() {
    this.handle = setInterval(() => this.props.actions.fetchPortfolio(), 5000)
  }

  componentWillUnmount() {
    this.handle && clearInterval(this.handle)
  }

  render() {
    const {store: {portfolio: {stocks}}} = this.props
    return (
      <div className="row" style={{height: 400}}>
        <div className="tile sm-12">
          <div className="content">
            <table className={'table compact dashed striped selectable sortable'}>
              <thead>
              <tr>
                <th>
                  <input id="table-0" type="checkbox"/>
                  <label htmlFor="table-0" className="checkbox select-row"/>
                </th>
                <th className="is-sortable">Company</th>
                <th className="is-sortable">Total market value</th>
                <th className="is-sortable">Floating P/L</th>
                <th className="is-sortable">Change</th>
                <th className="is-sortable">Positions</th>
                <th className="is-sortable">Cost</th>
                <th className="is-sortable">Current price</th>
              </tr>
              </thead>
              <tbody>
              {stocks.map(s => (
                <tr key={s.symbol}>
                  <td>
                    <input id="table-1" type="checkbox"/>
                    <label htmlFor="table-1" className="checkbox select-row"/>
                  </td>
                  <td>{s.company}</td>
                  <td>{format("$,.4s")(s.totalMarketValue).replace(/G/, "B")}</td>
                  <td>{format(",.4s")(s.floatingProfitLoss).replace(/G/, "B")}</td>
                  <td className={classnames({'color-green': s.change >= 0, 'color-red': s.change < 0})}>
                    {format(",.2%")(s.change)} <i className={classnames("icon", {
                    'icon-arrow-up': s.change >= 0,
                    'icon-arrow-down': s.change < 0
                  })}/>
                  </td>
                  <td>{format(",.2s")(s.amount).replace(/G/, "B")}</td>
                  <td>{format("$,.2f")(s.costPrice)}</td>
                  <td>{format("$,.2f")(s.currentPrice)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

PortfolioTable.propTypes = {}

export default getContext({
  store: PropTypes.object,
  actions: PropTypes.object,
})(withRouter(PortfolioTable))
