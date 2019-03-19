import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout'
import { Input } from 'antd'
import { getContext, withContext } from 'recompose'

const {Search} = Input

const {
  AppBar,
  AppWrapper,
  SettingsPanel,
  Header,
  Theme,
  AppContent,
  AppMenu,
  AppBody
} = Layout

class Page extends Component {
  state = {
    showMenu: true,
    showSettings: false
  }

  getSettings = () => {
    return (
      <div className="row">
        <div className="column sm-12 container">
          <div className="profile">
            <i className="icon icon-profile"/>
            <div className="username">Ruixin Ma</div>
          </div>
          <div className="content">
            <div className="title">My settings</div>
            <div className="item">
              <div className="left"> Switch theme</div>
              <div className="right">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.props.theme === 'light'}
                    onChange={e => {
                      this.props.changeTheme(e.target.checked ? 'light' : 'dark')
                    }}/>
                  <i className="ball"/>
                  <span data-enabled="Light" data-disabled="Dark"/>
                </label>
              </div>
            </div>
          </div>
          <div className="bottom">
            <button className="btn big" type="button">
              <i className="icon icon-log-out"/> Sign out
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.className}>
        <Layout
          theme={this.props.theme}
          product={'Stock Trading'}
          user={this.props.user}
          onProfileClick={() => this.setState((old) => ({showSettings: !old.showSettings}))}
          showMenu={this.state.showMenu}
          showSettings={this.state.showSettings}
          currApp={this.props.pageName}
          onToggleMenu={() => this.setState((old) => ({showMenu: !old.showMenu}))}
        >
          <Theme>
            <Header/>
            <main>
              <SettingsPanel>
                {this.getSettings()}
              </SettingsPanel>
              <AppWrapper>
                <AppBar>
                  {this.props.appbar}
                </AppBar>
                <AppBody>
                  <AppMenu>
                    {this.props.menu}
                  </AppMenu>
                  <AppContent>
                    {this.props.children}
                  </AppContent>
                </AppBody>
              </AppWrapper>
            </main>
          </Theme>
        </Layout>
      </div>
    )
  }
}

Page.propTypes = {
  pageName: PropTypes.any,
  user: PropTypes.string,
  appbar: PropTypes.any,
  menu: PropTypes.any,
  changeTheme: PropTypes.func,
  children: PropTypes.any
}

export const PageContext = withContext({
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.any
  },
  props => {
    return props
  }
)(({children}) => React.Children.only(children))


export default getContext({
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
})(
  ({store, actions, children, ...rest}) => (
    <Page
      theme={store.app.theme}
      changeTheme={actions.changeTheme}
      {...rest}
    >
      {children}
    </Page>)
)
