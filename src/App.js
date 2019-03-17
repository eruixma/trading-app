import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import Portfolio from './container/Portfolio'
import Search from './container/Search'
import Quotes from './container/Quotes'

import './style/common.css'

class App extends Component {


  render() {
    return <Router>
      <Route exact path="/" component={Search}/>
      <Route path="/portfolio" component={Portfolio}/>
      <Route path="/quotes" component={Quotes}/>
    </Router>
  }
}

export default App
