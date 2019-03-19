import React from "react"
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import {actions as appActions} from '../reducers/app'
import {actions as quotesActions} from '../reducers/quotes'
import {actions as searchActions} from '../reducers/search'
import { PageContext } from '../components/Page'

function mapStateToProps(state) {
  return {store: {...state}}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...appActions,
      ...quotesActions,
      ...searchActions,
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageContext)
