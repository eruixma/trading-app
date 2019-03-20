import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts'


class PortfolioComposition extends PureComponent {

  render() {
    const {store: {portfolio: {stocks}}} = this.props
    let industryCount = {}
    stocks.forEach(s => {
      industryCount[s.industry] = (industryCount[s.industry] || 0) + 1
    })
    let data = []
    let other = 0
    Object.keys(industryCount).map(k => ({name: k, value: industryCount[k]}))
      .forEach(v => {
        if (v.value > 1) {
          data.push(v)
        } else {
          other++
        }
      })
    data.push({name: 'Other', value: other})
    const COLORS = ['#e66e19', '#dcaf00', '#dc2d37', '#0082f0', '#288964']


    return (
      <div className={'row'} style={{height: '260'}}>
        <div className="tile sm-4">
          <div className="header">
            <div className="left">
              <div className="title">Composition</div>
            </div>
          </div>
          <div className="content">
            <ResponsiveContainer width={'100%'} height={260}>
              <PieChart>
                <Pie
                  data={data}
                  cx={240}
                  cy={130}
                  innerRadius={100}
                  outerRadius={120}
                  fill="#f2f2f2"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile sm-8">
          <div className="header">
            <div className="left">
              <div className="title">Industry</div>
            </div>
          </div>
          <div className="content">

          </div>
        </div>

      </div>
    )
  }
}

PortfolioComposition.propTypes = {}

export default getContext({
  store: PropTypes.object,
  actions: PropTypes.object,
})(withRouter(PortfolioComposition))
