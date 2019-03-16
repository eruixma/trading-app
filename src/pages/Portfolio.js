import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'


class Portfolio extends PureComponent {
  render() {
    return (
      <Page
        pageName={'Portfolio'}
        user={'Ruixin'}
        menu={<Menu/>}
      >

      </Page>
    )
  }
}

Portfolio.propTypes = {}

export default Portfolio
