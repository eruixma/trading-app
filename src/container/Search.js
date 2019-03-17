import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearSuggestions, fetchSuggestions, search } from '../reducers/search'
import {changeTheme} from '../reducers/app'
import Search from '../pages/Search'

function mapStateToProps(state) {
  const {suggestions, searchResults} = state.search
  const {prices} = state.quotes
  const {theme} = state.app
  return {
    prices,
    searchResults,
    suggestions,
    theme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({changeTheme,fetchSuggestions, clearSuggestions, search}, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
