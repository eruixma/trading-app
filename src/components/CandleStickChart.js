import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from "d3-format"
import { timeFormat } from "d3-time-format"

import { ChartCanvas, Chart } from "react-stockcharts"
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates"

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale"
import { OHLCTooltip } from "react-stockcharts/lib/tooltip"
import { fitWidth } from "react-stockcharts/lib/helper"
import { last } from "react-stockcharts/lib/utils"

class CandleStickChart extends Component {
  render() {
    const {type, data: initialData, width, ratio} = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor( d => d.date );
    const {data, xScale, xAccessor, displayXAccessor} = xScaleProvider( initialData );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 90)]);
    const xExtents = [start, end];
    return (
      <ChartCanvas
        height={280}
        ratio={ratio}
        width={width}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={[d => [d.high, d.low]]} textFill={'#f2f2f2'}>
          <XAxis axisAt="bottom" orient="bottom" tickStroke={'#f2f2f2'} stroke={'#f2f2f2'}/>
          <YAxis axisAt="left" orient="left" ticks={5} stroke={'none'} tickStroke={'#f2f2f2'}/>
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <CandlestickSeries
            stroke={d => d.close > d.open ? "#288964" : "#dc2d37"}
            wickStroke={d => d.close > d.open ? "#288964" : "#dc2d37"}
            fill={d => d.close > d.open ? "#288964" : "#dc2d37"}
          />
          <OHLCTooltip forChart={1} origin={[10, -5]} textFill={'#f2f2f2'} labelFill={'#0082f0'}/>
        </Chart>
{/*        <Chart
          id={2}
          height={150}
          yExtents={d => d.volume}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
          />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />

          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
        </Chart>*/}
        <CrossHairCursor stroke={'#f2f2f2'}/>
      </ChartCanvas>
    )
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date:PropTypes.string,
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    close: PropTypes.number,
    volume: PropTypes.number
  })).isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
}

CandleStickChart.defaultProps = {
  type: "svg"
}

CandleStickChart = fitWidth(
  CandleStickChart
);

export default CandleStickChart
