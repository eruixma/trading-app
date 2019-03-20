import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getContext } from 'recompose'
import BarChart from './BarChart'
import * as encodeurl from 'encodeurl'
import * as classnames from 'classnames'

class SectorPerformance extends Component {
  componentDidMount() {
    this.props.actions.fetchRealtimeSector()
  }

  render() {
    const {store:{quotes:{realtimeSector}}} = this.props
    return (
      <div className="row" style={{height: '600px'}}>
        <div className="tile sm-4">
          <div className="header">
            <div className="left">
              <div className="title">Sector performance</div>
            </div>
          </div>
          <div className="content">
            <BarChart
              data={Object.keys(realtimeSector).map(k => ({x: k, y: realtimeSector[k]}))}
            />
          </div>
        </div>
        <div className="tile sm-8" style={{flexDirection:'row', flexWrap:'wrap'}}>
          {
            Object.keys(realtimeSector).map(k=>(
              <div className="card" style={{width: '30%'}} key={k} onClick={()=>this.props.history.push(encodeurl(`/search/result?q=${k}`))}>
                <div className="content">
                  <div className="kpi">
                    <div className="color-gray">{k}</div>
                    <div className={classnames("item text-xl",{"color-red":realtimeSector[k]<0,'color-green':realtimeSector[k]>=0})}>
                      <span className=""><i className={classnames("icon ",{"icon-arrow-down":realtimeSector[k]<0,'icon-arrow-up':realtimeSector[k]>=0})}/></span>
                      <span className="">{realtimeSector[k]}</span>
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
    )
  }
}

export default getContext({
  store: PropTypes.object,
  actions: PropTypes.object,
})(withRouter(SectorPerformance))
