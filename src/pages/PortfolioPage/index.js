import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Portfolio from './Portfolio'

class PortfolioPage extends Component {
  render() {
    const {match} = this.props
    return (
      <Switch>
        <Route exact path={`${match.path}/`} component={Portfolio}/>
      </Switch>
    )
  }
}

export default PortfolioPage
