import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import SearchPage from './pages/SearchPage'

import './style/common.css'

class App extends Component {


  render() {
    return <Router>
      <Switch>
        <Route exact={true} path="/" render={()=><Redirect to={'/search'}/>}/>
        <Route path="/search" component={SearchPage}/>
        {/*<Route path="/portfolio" component={Portfolio}/>*/}
        {/*<Route path="/quotes" component={Quotes}/>*/}
      </Switch>
    </Router>
  }
}

export default App
