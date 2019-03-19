import React, { Component } from 'react'
import queryString from 'query-string'

import { Redirect } from 'react-router-dom'
import Page from '../../components/Page'
import Menu from '../../Menu'
import PageContext from '../../container/PageContext'
import SearchBar from '../../components/SearchBar'
import SearchResultList from '../../components/SearchResultList'


class SearchResult extends Component {


  componentDidMount() {
    const {location, actions} = this.props
    const values = queryString.parse(location.search)
    if (values.q) {
      this.setState({value: values.q})

    }
    // TODO search result page should always have "q" param
  }

  render() {
    return this.props.location.search === '' ? (
      <Redirect to={'/'}/>
    ) : (
      <PageContext>
        <Page
          pageName={<SearchBar/>}
          user={'Ruixin'}
          menu={<Menu/>}
        >
          <SearchResultList/>
        </Page>
      </PageContext>
    )
  }
}

SearchResult.propTypes = {}

export default SearchResult
