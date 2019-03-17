import React, { Component } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="custom-tooltip" style={{background:'transparent'}}>
        <p className="label color-text" >{payload[0].x}</p>
        <p className="intro color-text">{payload[0].y+'%'}</p>
      </div>
    );
  }

  return null;
};

class PNBarChart extends Component {
  render() {
    const { data, type, width, ratio } = this.props;

    return (
      <ResponsiveContainer height={'100%'} width={'100%'}>
        <BarChart
          layout = 'vertical'
          data={data.map(d=>{
            return d.y>=0? {...d, p:d.y}:{...d, n:d.y}
          })}
          margin={{
            top: 5, right: 0, left: 50, bottom: 5,
          }}
        >
          <XAxis  stroke={'#f2f2f2'}  tickFormatter={v=>v+'%'} type={'number'} axisLine={false}/>
          <YAxis dataKey="x" type={'category'} stroke={'#f2f2f2'} axisLine={false}/>
          <Bar dataKey="p" fill="#288964"/>
          <Bar dataKey="n" fill="#dc2d37" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}



export default PNBarChart
