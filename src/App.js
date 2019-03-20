import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import SearchPage from './pages/SearchPage'

import './style/common.css'
import QuotesPage from './pages/QuotesPage'
import PortfolioPage from './pages/PortfolioPage'

class App extends Component {


  render() {
    return <Router>
      <Switch>
        <Route exact={true} path="/" render={()=><Redirect to={'/search'}/>}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/quotes" component={QuotesPage}/>
        <Route path="/portfolio" component={PortfolioPage}/>
      </Switch>
    </Router>
  }
}

export default App
