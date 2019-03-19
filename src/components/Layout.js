import React from 'react'
import PropTypes from 'prop-types'
import { withContext, getContext } from 'recompose'
import classnames from 'classnames'

function Logo(props) {
  return <i className="icon icon-graph-line color-green"/>
}

const Layout = withContext({
    theme: PropTypes.oneOf(['light', 'dark']),
    product: PropTypes.any,
    user: PropTypes.any,
    onProfileClick: PropTypes.func,
    showMenu: PropTypes.bool,
    showSettings: PropTypes.bool,
    currApp: PropTypes.any,
    onToggleMenu: PropTypes.func,
    children: PropTypes.any
  },
  props => props
)(({children}) => React.Children.only(children))


const Theme = getContext({
  theme: PropTypes.oneOf(['light', 'dark'])
})(
  ({theme, children}) => <div className={theme}>{children}</div>
)

const Header = getContext({
  product: PropTypes.string,
  user: PropTypes.string,
  onProfileClick: PropTypes.func
})(
  ({product, user, onProfileClick}) => <header className="sysbar">
    <div className="items-container">
      <div className="item">
        <Logo/>
        <span className="product">{product}</span>
      </div>
    </div>
    <div className="items-container">
      <div className="item hover" onClick={onProfileClick}>
        <i className="icon icon-profile"/>
        <span className="username">{user}</span>
      </div>
    </div>
  </header>
)


const SettingsPanel = getContext({
  showSettings: PropTypes.bool
})(
  ({showSettings, children}) => <aside className={classnames("settings", {hidden: !showSettings})}>
    {children}
  </aside>
)

const AppWrapper = getContext({
  showSettings: PropTypes.bool
})(
  ({showSettings, children}) => <div className={classnames("app", {
    "slide-right": !showSettings,
    "slide-left": showSettings
  })}>
    {children}
  </div>
)

const AppBar = getContext({
  showMenu: PropTypes.bool,
  currApp: PropTypes.any,
  onToggleMenu: PropTypes.func
})(
  ({showMenu, currApp, onToggleMenu, children}) => <nav className="appbar">
    <div className="actions-left">
      <div className="item"  onClick={onToggleMenu} >
        <i className={classnames("navigation-toggle", {closed: showMenu})}/>
      </div>
      <div className={classnames("menu-anchor", {"open-menu": showMenu})}>Menu</div>
      <div className={classnames("title", {"open-menu": showMenu})}>{currApp}</div>
    </div>
    <div className="actions-right">{children}</div>
  </nav>
)

const AppBody = ({children}) => <div className="appbody">{children}</div>

const AppMenu = getContext({
  showMenu: PropTypes.bool
})(
  ({showMenu, children}) => <div className={classnames("appnav", {hidden: !showMenu})}>{children}</div>
)

const AppContent = ({children}) => <div className="appcontent">{children}</div>

Layout.AppBar = AppBar
Layout.AppWrapper = AppWrapper
Layout.SettingsPanel = SettingsPanel
Layout.Header = Header
Layout.Theme = Theme
Layout.AppContent = AppContent
Layout.AppMenu = AppMenu
Layout.AppBody = AppBody

export default  Layout
