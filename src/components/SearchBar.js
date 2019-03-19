import React, { Component } from 'react'
import encodeurl from 'encodeurl'
import { getContext } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class SearchBar extends Component {
  state = {
    value: ''
  }

  onChange = (value) => this.setState({value})

  componentDidMount(){
    const {location} = this.props
    const values = queryString.parse(location.search)
    this.setState({value:values.q})
  }

  render() {
    let {value} = this.state
    const {history, match, actions} = this.props

    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => this.onChange(e.target.value)}
          style={{width: '400px'}}
        />
        <button
          onClick={() => {
            history.push(encodeurl(`${match.url}?q=${value}`))
            actions.search(value)
          }}
          className="btn primary"
        >
          Search
        </button>
      </div>
    )
  }
}

export default getContext({actions: PropTypes.object})(withRouter(SearchBar))
