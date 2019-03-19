import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import SearchMain from './SearchMain'
import SearchResult from './SearchResult'


class SearchPage extends Component {

  render() {
    const {match} = this.props
    return (
        <Switch>
          <Route exact path={`${match.path}/`} component={SearchMain}/>
          <Route path={`${match.path}/result`} component={SearchResult}/>
        </Switch>
    )
  }
}


export default SearchPage
