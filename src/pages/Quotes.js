import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'
import HorizontalScroll from 'react-scroll-horizontal'

import 'react-card-scroll/lib/assets/styles.css'
import '../style/quotes.css'
import classnames from 'classnames'

class Quotes extends Component {

  updateHandle = null

  componentDidMount() {
    this.props.actions.fetchWorldIndices()
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
              {this.props.worldIndices.length===0&& <div className="loading large" style={{margin:'0 auto', marginTop:'50px'}}/>}
              <HorizontalScroll
                reverseScroll={true}
                style={{height: '150px'}}
              >
                {
                  this.props.worldIndices.map(i => (
                    <div className="card" style={{width: '300px'}} key={i.market}>
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
                                  <i className={classnames("icon",{
                                    "icon-arrow-up": i.change >= 0,
                                    'icon-arrow-down': i.change < 0
                                  })}/>{i.changePercent}
                                </span>
                            </div>
                            <div className="text-lg">
                                <span className={classnames("item")}>
                                  <i className={classnames("icon",{
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
      </Page>
    )
  }
}

Quotes.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  actions: PropTypes.object
}

export default Quotes
