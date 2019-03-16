import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'

class Search extends PureComponent {
  render() {
    return (
      <Page
        pageName={'Search'}
        user={'Ruixin'}
        menu={<Menu/>}
      >

      </Page>
    )
  }
}

Search.propTypes = {}

export default Search
