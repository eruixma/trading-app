import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Autosuggest from 'react-autosuggest'

class SearchField extends PureComponent {
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
        <Autosuggest
          theme={styles.theme}
          suggestions={[{name: 'aaa'}]}
          onSuggestionsFetchRequested={args => console.log(args)}
          onSuggestionsClearRequested={() => console.log('clear suggestions')}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={suggestion => <div>{suggestion.name}</div>}
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

SearchField.propTypes = {}

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
    }
  }
}
export default Radium(SearchField)
