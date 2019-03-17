import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class Menu extends PureComponent {
  render() {
    return (
      <div className="tree navigation">
        <ul>
          <li>
            <NavLink className="item" to="/" exact>
              Search
              <i className="icon icon-search right-align"/>
            </NavLink>
          </li>
          <li><NavLink className="item" to="/quotes" exact>Quotes</NavLink></li>
          <li><NavLink className="item" to="/portfolio">Portfolio</NavLink></li>
        </ul>
      </div>
    )
  }
}

Menu.propTypes = {}

export default Menu
