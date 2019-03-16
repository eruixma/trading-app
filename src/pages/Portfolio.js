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
        theme={this.props.theme}
        changeTheme={this.props.actions.changeTheme}
      >

      </Page>
    )
  }
}

Portfolio.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  actions: PropTypes.object
}

export default Portfolio
