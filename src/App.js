import React, { Component } from 'react'
import { Mention } from 'antd'
import 'antd/dist/antd.css'
import './style/common.css'

const {toString, toContentState} = Mention

class App extends Component {

  onChange(contentState) {
    console.log(toString(contentState))
  }

  onSelect(suggestion) {
    console.log('onSelect', suggestion)
  }

  render() {
    return (
      <div className={'light'}>
        <header className="sysbar">
          <div className="items-container">
            <div className="item">
              <i className="icon icon-graph-line"></i>
              <span className="product">Stock Trading</span>
            </div>
          </div>
          <div className="items-container">
            <div className="item hover">
              <i className="icon icon-profile"></i>
              <span className="username"> Ruixin Ma </span>
            </div>
          </div>
        </header>
        <main>
          <div className="app">
            <div className="appbody">
              <div className="appcontent">
                <Mention
                  style={{width: '100%'}}
                  onChange={this.onChange}
                  defaultValue={toContentState('@afc163')}
                  defaultSuggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
                  onSelect={this.onSelect}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
