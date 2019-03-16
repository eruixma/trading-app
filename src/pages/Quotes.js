import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'

class Quotes extends PureComponent {
  render() {
    return (
      <Page
        pageName={'Quotes'}
        user={'Ruixin'}
        menu={<Menu/>}
      >

      </Page>
    )
  }
}

Quotes.propTypes = {}

export default Quotes
