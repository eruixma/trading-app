import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTheme } from '../reducers/app'
import Search from '../pages/Search'

function mapStateToProps(state) {
  const {theme} = state.app
  return {
    theme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({changeTheme}, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
