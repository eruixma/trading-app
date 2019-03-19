import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'
import HorizontalScroll from 'react-scroll-horizontal'

import 'react-card-scroll/lib/assets/styles.css'
import '../style/quotes.css'
import classnames from 'classnames'
import { ChartCanvas } from 'react-stockcharts'
import BarChart from '../components/BarChart'
import * as encodeurl from 'encodeurl'

class Quotes extends Component {

  updateHandle = null

  componentDidMount() {
    this.props.actions.fetchWorldIndices()
    this.props.actions.fetchRealtimeSector()
  }

  componentWillUnmount() {
    this.updateHandle && clearInterval(this.updateHandle)
    this.updateHandle = null
  }

  render() {
    return (
      <Page
        pageName={'Quotes'}
        user={'Ruixin'}
        menu={<Menu/>}
        theme={this.props.theme}
        changeTheme={this.props.actions.changeTheme}
      >
        <div className="row">
          <div className="tile sm-12">
            <div className="header">
              <div className="left">
                <div className="title">World Indices</div>
              </div>
            </div>

            <div className="content">
              <HorizontalScroll
                reverseScroll={true}
                style={{height: '150px'}}
              >
                {
                  this.props.worldIndices.map(i => (
                    <div className="card" style={{width: '300px'}} key={i.market}  onClick={()=>this.props.history.push(encodeurl(`/?q=${i.market}`))}>
                      <div className="header">
                        <div className="left">
                          <div className="title">{i.market}</div>
                        </div>
                      </div>
                      <div className="content">
                        <div className={classnames("kpi", {
                          "color-green": i.change >= 0,
                          'color-red': i.change < 0
                        })}>
                          <div className="item">
                            <span className="text-xl">{i.price}</span>
                            <span className="text-lg color-gray">USD</span>
                          </div>
                          <div className="item">
                            <div className="text-lg">
                                <span className={classnames("item")}>
                                  <i className={classnames("icon", {
                                    "icon-arrow-up": i.change >= 0,
                                    'icon-arrow-down': i.change < 0
                                  })}/>{i.changePercent}
                                </span>
                            </div>
                            <div className="text-lg">
                                <span className={classnames("item")}>
                                  <i className={classnames("icon", {
                                    "icon-plus": i.change >= 0,
                                    'icon-minus': i.change < 0
                                  })}/>{i.change}
                                </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </HorizontalScroll>

            </div>
          </div>
        </div>
        <div className="row" style={{height: '600px'}}>
          <div className="tile sm-4">
            <div className="header">
              <div className="left">
                <div className="title">Sector performance</div>
              </div>
            </div>
            <div className="content">
              <BarChart
                data={Object.keys(this.props.realtimeSector).map(k => ({x: k, y: this.props.realtimeSector[k]}))}
              />
            </div>
          </div>
          <div className="tile sm-8" style={{flexDirection:'row', flexWrap:'wrap'}}>
            {
              Object.keys(this.props.realtimeSector).map(k=>(
                <div className="card" style={{width: '30%'}} key={k} onClick={()=>this.props.history.push(encodeurl(`/?q=${k}`))}>
                  <div className="content">
                    <div className="kpi">
                      <div className="color-gray">{k}</div>
                      <div className={classnames("item text-xl",{"color-red":this.props.realtimeSector[k]<0,'color-green':this.props.realtimeSector[k]>=0})}>
                        <span className=""><i className={classnames("icon ",{"icon-arrow-down":this.props.realtimeSector[k]<0,'icon-arrow-up':this.props.realtimeSector[k]>=0})}/></span>
                        <span className="">{this.props.realtimeSector[k]}</span>
                        <span className="">%</span>
                        <span>&nbsp;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </Page>
    )
  }
}

Quotes.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  actions: PropTypes.object
}

export default Quotes
