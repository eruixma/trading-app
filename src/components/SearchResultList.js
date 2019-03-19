import React, { Component } from 'react'
import * as classnames from 'classnames'
import * as PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import queryString from 'query-string'

class SearchResultList extends Component {

  arrowIconClassName = (price) => classnames("icon", {
    "icon-arrow-down": price.change.charAt(0) === '-',
    "icon-arrow-up": price.change.charAt(0) === '+'
  })

  colorClassName = (price) => classnames("item text-md", {
    "color-red": price.change.charAt(0) === '-',
    "color-green": price.change.charAt(0) === '+',
  })

  componentDidMount() {
    const {location, search} = this.props
    const values = queryString.parse(location.search)
    if (values.q) {
      search(values.q)

    }
    // TODO search result page should always have "q" param
  }

  render() {
    const {results, prices} = this.props

    return results.map(result => (
      <div className="row">
        <div className="tile sm-12" style={{height: '240px'}}>
          <div className="content">
            <div className="row">
              <div className="column sm-3">
                {prices[result.symbol] ?
                  <div style={{padding: 16}}>
                    <div className="kpi">
                      <div className="item text-xl">
                        <span>{prices[result.symbol].price}</span>
                      </div>
                      <div className={this.colorClassName(prices[result.symbol])}>
                        <span>
                          <i className={this.arrowIconClassName(prices[result.symbol])}/>
                        </span>
                        <span>{prices[result.symbol].change}</span>
                        <span>&nbsp;</span>
                      </div>
                    </div>
                    <table className={'table tiny dashed'}>
                      <tbody>
                      <tr>
                        <td style={{fontWeight: 500}}>Market Cap</td>
                        <td>{result['MarketCap']}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>Enterprise Value</td>
                        <td>{result['EnterpriseValue']}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>P/E (TTM)</td>
                        <td>{result['PE']}</td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 500}}>P/B</td>
                        <td>{result['PB']}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div> : (
                    <div style={{display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column'}}>
                      <div className="loading" style={{margin: '0 auto'}}/>
                    </div>
                  )
                }
              </div>
              <div className="column sm-9">
                <h3 style={{margin: 0, marginBottom: 8}}>
                  <Link to={`/quotes/stock/${result.symbol}`}>
                    {`${result.company}  (${result.symbol})`}
                  </Link>
                </h3>
                <p>{result.description.replace('\\n\\n', '').replace('\\', '')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }
}

export default getContext({
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
})(withRouter(({store, actions, location}) => <SearchResultList
  results={store.search.searchResults}
  prices={store.quotes.prices}
  search={actions.search}
  location={location}
/>))
