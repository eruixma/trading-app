import React, { Component, Fragment } from 'react'
import { getContext } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class StockTitle extends Component {
  render() {
    const {match, store: {quotes: {summaries}}} = this.props
    const symbol = match.params.symbol
    return (
      <Fragment>
        <span className="title-name">
          {summaries[symbol]&& summaries[symbol].company}
        </span>
        <span className="subtitle">{symbol}</span>
      </Fragment>
    )
  }
}

export default getContext({store: PropTypes.object})(withRouter(StockTitle))
