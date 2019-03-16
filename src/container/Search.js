import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearSuggestions, fetchSuggestions } from '../reducers/search'
import {changeTheme} from '../reducers/app'
import Search from '../pages/Search'

function mapStateToProps(state) {
  const {suggestions} = state.search
  const {theme} = state.app
  return {
    suggestions,
    theme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({changeTheme,fetchSuggestions, clearSuggestions}, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
