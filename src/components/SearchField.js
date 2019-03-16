import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Autosuggest from 'react-autosuggest'
import SuggestionCard from './SuggestionCard'

class SearchField extends PureComponent {
  state = {
    value: '',
    lastUpdateTime: Date.now()
  }
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }
  getOnSuggestionsFetchRequested = ({value, reason}) => {
    if ((reason === 'input-changed' && Date.now() - this.state.lastUpdateTime > 1000) || reason === 'suggestions-revealed') {
      this.props.fetchSuggestions(value)
      this.setState({lastUpdateTime: Date.now()})
    }
  }

  render() {
    return (
      <div>
        <Autosuggest
          theme={styles.theme}
          suggestions={this.props.suggestions}
          onSuggestionsFetchRequested={this.getOnSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => this.props.clearSuggestions()}
          getSuggestionValue={suggestion => suggestion.symbol}
          renderSuggestion={suggestion => <SuggestionCard {...suggestion}/>}
          inputProps={{
            placeholder: '',
            value: this.state.value,
            onChange: this.onChange,
            autoFocus: true
          }}
        />
      </div>
    )
  }
}

SearchField.propTypes = {
  suggestions: PropTypes.array,
  clearSuggestions: PropTypes.func,
  fetchSuggestions: PropTypes.func
}

const styles = {
  theme: {
    container: {
      position: 'relative',
      marginBottom: '28px',
      height: '60px',
      width: '900px',
    },
    input: {
      marginRight: 0,
      width: '100%',
      height: '100%',
      fontSize: '24px',
      paddingLeft: ' 8px',
      cursor: 'text',
      paddingLop: '21px',
    },
    suggestionsList: {
      listStyle: 'none',
      marginLeft: '-47px'
    },
    suggestion: {
      padding: 0
    }
  }
}
export default Radium(SearchField)
