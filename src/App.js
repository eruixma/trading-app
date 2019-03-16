import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import Portfolio from './container/Portfolio'
import Search from './container/Search'
import Quotes from './container/Quotes'

import './style/common.css'

class App extends Component {

  /*  render() {
      return (
        <div className={'light'}>
          <header className="sysbar">
            <div className="items-container">
              <div className="item">
                <i className="icon icon-graph-line"/>
                <span className="product">Stock Trading</span>
              </div>
            </div>
            <div className="items-container">
              <div className="item hover">
                <i className="icon icon-profile"/>
                <span className="username"> Ruixin Ma </span>
              </div>
            </div>
          </header>
          <main>
            <div className="app slide-right">
              <div className="appbar">
                <div className="actions-left">
                  <div className="item">
                    <i className={"navigation-toggle closed"}/>
                  </div>
                  <div className={"menu-anchor open-menu"}>
                    Menu
                  </div>
                  <div className={"title open-menu"}>
                    Portfolio
                  </div>
                </div>
                <div className="actions-right" style={{width: '25%'}}>
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton={true}
                    style={{verticalAlign: 'middle'}}
                  />
                </div>
              </div>
              <div className="appbody">
                <div className={"appnav"}>
                  <div className="tree navigation">
                    <ul>
                      <li><a className="item active" href="#">Portfolio</a></li>
                      <li><a className="item" href="#">Quote</a></li>
                    </ul>
                  </div>
                </div>
                <div className="appcontent">
                  <Row className={"row"}>
                    <Col span={6}>
                      <div className="tile" style={{borderRight: "3px solid transparent"}}>


                        <div className="header">
                          <div className="left">
                            <div className="title">Total assets</div>
                          </div>
                        </div>


                        <div className="content">
                          <div className="kpi">
                            <div className="item text-xl">34.86 M</div>
                            <div className="item">
                              <div className="color-gray">USD</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col span={6}>
                      <div className="tile" style={{borderRight: "3px solid transparent"}}>


                        <div className="header">
                          <div className="left">
                            <div className="title">Total Market Value</div>
                          </div>
                        </div>


                        <div className="content">
                          <div className="kpi">
                            <div className="item text-xl">2.24 B</div>
                            <div className="item">
                              <div className="color-gray">USD</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="tile" style={{borderRight: "3px solid transparent"}}>


                        <div className="header">
                          <div className="left">
                            <div className="title">Floating P/L</div>
                          </div>
                        </div>


                        <div className="content">
                          <div className="kpi">
                            <div className="item text-xl">2.24 B</div>
                            <div className="item">
                              <div className="color-gray">USD</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="tile" style={{borderRight: "3px solid transparent"}}>


                        <div className="header">
                          <div className="left">
                            <div className="title">Balance</div>
                          </div>
                        </div>


                        <div className="content">
                          <div className="kpi">
                            <div className="item text-xl">2.24 B</div>
                            <div className="item">
                              <div className="color-gray">USD</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={'row'} style={{height: '80%'}}>
                    <Col span={24} style={{height: '80%'}}>
                      <div className="tile" style={{borderRight: "3px solid transparent", height: '85%'}}>


                        <div className="content">
                          <div className="multi-panel-tile">
                            <div className="mid-panel">

                              <div className="header">
                                <div className="left">
                                  <span className="tooltip pointer">
                                    <i className="icon icon-filter actionable left-panel-trigger"></i>
                                    <span className="message bottom" style={{left: "-10px"}}>Toggle filters</span>
                                  </span>
                                  <span className="separator"></span>
                                  <span className="title">Mid panel title</span>
                                  <span className="subtitle">Subtitle</span>
                                </div>
                                <div className="right">
                                  <i className="icon icon-more"></i>
                                </div>
                              </div>

                              <div className="content">
                                <Table
                                  columns={columns}
                                  expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
                                  dataSource={data}
                                />
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </main>
        </div>
      )
    }*/

  render() {
    return <Router>
      <Route exact path="/" component={Quotes}/>
      <Route path="/portfolio" component={Portfolio}/>
      <Route path="/search" component={Search}/>
    </Router>
  }
}

export default App
