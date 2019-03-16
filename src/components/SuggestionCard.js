import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SuggestionCard extends PureComponent {
  render() {
    return (
      <div className="card">
        <div className="header">
          <div className="left">
            <div className="title">{this.props.company}</div>
            <div className="subtitle">{this.props.symbol}</div>
          </div>
        </div>
      </div>

    )
  }
}

SuggestionCard.propTypes = {
  symbol: PropTypes.string,
  company: PropTypes.string,

}

export default SuggestionCard
