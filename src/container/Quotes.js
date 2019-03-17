import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTheme } from '../reducers/app'
import { fetchWorldIndices, fetchRealtimeSector } from '../reducers/quotes'
import Quotes from '../pages/Quotes'

function mapStateToProps(state) {
  const {theme} = state.app
  const {worldIndices, realtimeSector} = state.quotes
  return {
    realtimeSector,
    worldIndices,
    theme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({changeTheme, fetchWorldIndices,fetchRealtimeSector}, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotes)
