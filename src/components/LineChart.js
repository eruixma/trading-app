import React, { Component } from 'react'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { timeFormat, timeParse } from 'd3-time-format'
import { last } from 'react-stockcharts/lib/utils'
import { Chart, ChartCanvas } from 'react-stockcharts'
import XAxis from 'react-stockcharts/lib/axes/XAxis'
import YAxis from 'react-stockcharts/lib/axes/YAxis'
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates'
import { LineSeries } from 'react-stockcharts/lib/series'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { format } from "d3-format"
import _ from 'lodash'


class LineChart extends Component {
  render() {
    const timeSeries = this.props.data
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.time);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(_.sortBy(timeSeries.map(ts=>({...ts, time: timeParse("%Y-%m-%d %H:%M:%S")(ts.time)})), ['time']));
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length-100])
    ];
    return (
      <ChartCanvas ratio={this.props.ratio} width={this.props.width} height={200}
                   pointsPerPxThreshold={1}
                   margin={{ left: 70, right: 70, top: 0, bottom: 30 }}
                   seriesName={this.props.symbol}
                   data={data}
                   xAccessor={xAccessor}
                   displayXAccessor={displayXAccessor}
                   xScale={xScale}
                   xExtents={xExtents}>
        <Chart id={1} yExtents={d => [d.close]}>
          <XAxis axisAt="bottom" orient="bottom" stroke={'#f2f2f2'} tickStroke={'#f2f2f2'}/>
          <YAxis axisAt="left" orient="left" ticks={7} stroke={'#f2f2f2'} tickStroke={'#f2f2f2'}/>
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M:%S")} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(",.2f")} />

          <LineSeries
            yAccessor={d => d.close}
            strokeWidth={2}
            stroke="#288964"/>
        </Chart>

        <CrossHairCursor stroke={'#f2f2f2'}/>
      </ChartCanvas>
    )
  }
}

LineChart = fitWidth(LineChart)

export default LineChart
