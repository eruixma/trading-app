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
        theme={this.props.theme}
        changeTheme={this.props.actions.changeTheme}
      >

      </Page>
    )
  }
}

Quotes.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  actions: PropTypes.object
}

export default Quotes
