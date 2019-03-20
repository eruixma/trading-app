import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { format } from "d3-format"
import { timeFormat, timeParse } from "d3-time-format"

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
import _ from 'lodash'
import { ema, stochasticOscillator, bollingerBand } from "react-stockcharts/lib/indicator";
import LineSeries from 'react-stockcharts/lib/series/LineSeries'
import GroupTooltip from 'react-stockcharts/lib/tooltip/GroupTooltip'

class CandleStickChart extends PureComponent {
  render() {
    const {type, data: initialData, width, ratio} = this.props

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)

    const ema5 = ema()
      .id(0)
      .options({ windowSize: 5 })
      .merge((d, c) => {d.ema5 = c;})
      .stroke('#0082f0')
      .accessor(d => d.ema5);

    const ema20 = ema()
      .id(1)
      .options({ windowSize: 20 })
      .merge((d, c) => {d.ema20 = c;})
      .stroke('#dcaf00')
      .accessor(d => d.ema20);


    let calculatedData = ema20(ema5(initialData.map(ts => ({
      ...ts,
      date: timeParse("%Y-%m-%d")(ts.time)
    }))))

    const {data, xScale, xAccessor, displayXAccessor} = xScaleProvider(_.sortBy(calculatedData, ['date']))
    console.log(data)

    const start = xAccessor(last(data))
    const end = xAccessor(data[Math.max(0, data.length - 90)])
    const xExtents = [start, end]



    return (
      <ChartCanvas
        height={420}
        ratio={ratio}
        width={width}
        margin={{left: 70, right: 70, top: 10, bottom: 30}}
        type={type}
        seriesName={this.props.symbol}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={100} yExtents={[d => [d.high, d.low]]} textFill={'#f2f2f2'}>
          <XAxis axisAt="bottom" orient="bottom" tickStroke={'#f2f2f2'} stroke={'#f2f2f2'} ticks={20}/>
          <YAxis axisAt="left" orient="left" ticks={10} stroke={'none'} tickStroke={'#f2f2f2'}/>
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
          <LineSeries yAccessor={ema5.accessor()} stroke={ema5.stroke()} strokeWidth={2}/>
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} strokeWidth={2}/>
          <OHLCTooltip forChart={1} origin={[0, 0]} textFill={'#f2f2f2'} labelFill={'#0082f0'}/>
          <GroupTooltip
            layout="vertical"
            origin={[0, 30]}
            verticalSize={20}
            onClick={e => console.log(e)}
            options={[
              {
                yAccessor: ema5.accessor(),
                yLabel: `${ema5.type()}(${ema5.options().windowSize})`,
                valueFill: ema5.stroke(),
                withShape: true,
              },
              {
                yAccessor: ema20.accessor(),
                yLabel: `${ema20.type()}(${ema20.options().windowSize})`,
                valueFill: ema20.stroke(),
                withShape: true,
              }
            ]}
          />
        </Chart>
        <Chart id={200} height={150} yExtents={d => d.volume} origin={(w, h) => [0, h - 150]}>
          <YAxis axisAt="right" orient="right" ticks={5} tickFormat={format(".2s")} stroke={'none'} tickStroke={'#f2f2f2'}/>

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

          <BarSeries yAccessor={d => d.volume} fill={d => (d.close > d.open ? "rgba(40, 137, 100, 0.5)" : "rgba(220, 45, 55, 0.5)")}
          />
        </Chart>
        <CrossHairCursor stroke={'#f2f2f2'}/>
      </ChartCanvas>
    )
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
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
)

export default CandleStickChart
