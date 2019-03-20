import React, { Component } from 'react'
import { getContext } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import * as encodeurl from 'encodeurl'
import * as classnames from 'classnames'
import HorizontalScroll from 'react-scroll-horizontal'

class WorldIndices extends Component {
  componentDidMount() {
    this.props.actions.fetchWorldIndices()
  }

  render() {
    const {store: {quotes: {worldIndices}}} = this.props
    return (
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
                worldIndices.map(i => (
                  <div className="card" style={{width: '300px'}} key={i.market} onClick={() => this.props.history.push(encodeurl(`/search/result?q=${i.market}`))}>
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
    )
  }
}

export default getContext({
  store: PropTypes.object,
  actions: PropTypes.object,
})(withRouter(WorldIndices))
