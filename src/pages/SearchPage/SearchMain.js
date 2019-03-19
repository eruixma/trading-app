import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../../components/Page'
import PageContext from '../../container/PageContext'
import Menu from '../../Menu'
import SearchField from '../../components/SearchField'
import Radium from "radium"
import encodeurl from "encodeurl"
import { getContext } from 'recompose'
import { withRouter } from 'react-router-dom'


class SearchTile extends Component {
  state = {
    value: ''
  }
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }

  render() {
    const {store, actions, match, history} = this.props
    let {value} = this.state

    return <div className="tile" style={styles.tile}>
      <div className="wrapper" style={styles.wrapper}>
        <div className="row">
          <label style={styles.label}>Input symbol, company, description, or anything you like</label>
        </div>
        <div className="row">
          <SearchField
            suggestions={store.search.suggestions}
            fetchSuggestions={actions.fetchSuggestions}
            clearSuggestions={actions.clearSuggestions}
            value={value}
            onChange={this.onChange}
          />
        </div>
        <div className="row">
          <div style={styles.buttonWrapper}>
            <button
              className="btn primary"
              style={styles.button}
              onClick={() => {
                history.push(encodeurl(`${match.path}result?q=${value}`))
                actions.search(value)
              }}
            >
              Search
            </button>
            <button className="btn" style={styles.button}>I'm Feeling Lucky</button>
          </div>
        </div>
      </div>
    </div>
  }
}


const SearchTileContext = getContext({
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
})(withRouter(SearchTile))

class SearchMain extends Component {
  render() {
    return (
      <PageContext>
        <Page
          pageName={<span className={'title-name'}>Search stocks</span>}
          user={'Ruixin'}
          menu={<Menu/>}
        >
          <SearchTileContext
            goto={this.props.history.push}
          />
        </Page>
      </PageContext>
    )
  }
}

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
  wrapper: {
    margin: '0 auto 0 auto',
    marginBottom: '10%'
  },
}

export default Radium(SearchMain)
