import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'
import SearchField from '../components/SearchField'
import Radium, { Style } from "radium"

import '../style/search.css'

class Search extends PureComponent {
  state = {
    value: ''
  }
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }

  render() {
    return (
      <div>
        <Page
          pageName={'Search'}
          user={'Ruixin'}
          menu={<Menu/>}
          className={'search-page'}
        >
          <div className="tile" style={styles.tile}>
            <div className="search-container" style={styles.content}>
              <div className="row">
                <label style={styles.label}>Symbol, company, description, or anything you expected</label>
              </div>
              <div className="row">
                <SearchField/>
              </div>
              <div className="row">
                <div style={styles.buttonWrapper}>
                  <button className="btn primary" style={styles.button}>Search</button>
                  <button className="btn" style={styles.button}>I'm Feeling Lucky</button>
                </div>
              </div>
            </div>
          </div>
        </Page>
      </div>
    )
  }
}

Search.propTypes = {}

const styles = {
  button: {
    fontSize: '24px',
  },
  buttonWrapper: {
    margin: '0 auto',
  },
  label: {
    fontSize: '32px',
    margin: '0 auto',
    marginBottom: '28px',
  },
  tile: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    margin: '0 auto 0 auto',
    marginBottom: '10%'
  },
}

export default Radium(Search)
