import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import StockInfo from './StockInfo'

class QuotesPage extends Component {
  render() {
    const {match} = this.props
    return (
      <Switch>
        {/*<Route exact path={`${match.path}/`} component={Quotes}/>*/}
        <Route path={`${match.path}/stock/:symbol`} component={StockInfo}/>
      </Switch>
    )
  }
}

export default QuotesPage
