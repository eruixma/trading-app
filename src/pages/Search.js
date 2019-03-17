import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Menu from '../Menu'
import SearchField from '../components/SearchField'
import Radium, { Style } from "radium"
import { parse } from 'query-string'
import encodeurl from "encodeurl"

import '../style/search.css'

import CandleStickChart from '../components/CandleStickChart'
import { timeParse } from "d3-time-format"
import _ from 'lodash'

// TODO temp test data
const hsbcIntradayTS = {
  "2019-03-15": {
    "1. open": "41.1300",
    "2. high": "41.4700",
    "3. low": "41.1300",
    "4. close": "41.4100",
    "5. volume": "2898178"
  },
  "2019-03-14": {
    "1. open": "41.1400",
    "2. high": "41.2800",
    "3. low": "41.0200",
    "4. close": "41.1400",
    "5. volume": "2359268"
  },
  "2019-03-13": {
    "1. open": "40.9800",
    "2. high": "41.1700",
    "3. low": "40.9100",
    "4. close": "41.1200",
    "5. volume": "1975720"
  },
  "2019-03-12": {
    "1. open": "41.0000",
    "2. high": "41.1300",
    "3. low": "40.9800",
    "4. close": "41.0700",
    "5. volume": "1232669"
  },
  "2019-03-11": {
    "1. open": "40.9400",
    "2. high": "41.0700",
    "3. low": "40.9200",
    "4. close": "41.0100",
    "5. volume": "1770765"
  },
  "2019-03-08": {
    "1. open": "40.6500",
    "2. high": "40.9100",
    "3. low": "40.6500",
    "4. close": "40.8700",
    "5. volume": "1631019"
  },
  "2019-03-07": {
    "1. open": "40.9400",
    "2. high": "40.9650",
    "3. low": "40.6885",
    "4. close": "40.8700",
    "5. volume": "2177512"
  },
  "2019-03-06": {
    "1. open": "41.0800",
    "2. high": "41.1400",
    "3. low": "40.9241",
    "4. close": "40.9700",
    "5. volume": "1071511"
  },
  "2019-03-05": {
    "1. open": "40.8800",
    "2. high": "41.1200",
    "3. low": "40.8100",
    "4. close": "41.0000",
    "5. volume": "1678035"
  },
  "2019-03-04": {
    "1. open": "40.7000",
    "2. high": "40.7900",
    "3. low": "40.5100",
    "4. close": "40.6800",
    "5. volume": "2050117"
  },
  "2019-03-01": {
    "1. open": "40.7700",
    "2. high": "40.9450",
    "3. low": "40.4900",
    "4. close": "40.6100",
    "5. volume": "2006407"
  },
  "2019-02-28": {
    "1. open": "40.8700",
    "2. high": "41.1500",
    "3. low": "40.7800",
    "4. close": "40.8300",
    "5. volume": "2357442"
  },
  "2019-02-27": {
    "1. open": "40.9800",
    "2. high": "41.1900",
    "3. low": "40.9400",
    "4. close": "41.1300",
    "5. volume": "1823837"
  },
  "2019-02-26": {
    "1. open": "40.5400",
    "2. high": "40.8450",
    "3. low": "40.5200",
    "4. close": "40.7600",
    "5. volume": "1667636"
  },
  "2019-02-25": {
    "1. open": "40.6600",
    "2. high": "40.7600",
    "3. low": "40.5273",
    "4. close": "40.5900",
    "5. volume": "1952770"
  },
  "2019-02-22": {
    "1. open": "40.7200",
    "2. high": "40.7650",
    "3. low": "40.6000",
    "4. close": "40.7100",
    "5. volume": "1601319"
  },
  "2019-02-21": {
    "1. open": "40.9500",
    "2. high": "40.9600",
    "3. low": "40.6600",
    "4. close": "40.8100",
    "5. volume": "2306149"
  },
  "2019-02-20": {
    "1. open": "41.8400",
    "2. high": "42.2200",
    "3. low": "41.7700",
    "4. close": "42.1300",
    "5. volume": "3107851"
  },
  "2019-02-19": {
    "1. open": "41.1600",
    "2. high": "41.5500",
    "3. low": "40.9300",
    "4. close": "41.5200",
    "5. volume": "6952003"
  },
  "2019-02-15": {
    "1. open": "42.7900",
    "2. high": "42.9200",
    "3. low": "42.6450",
    "4. close": "42.8000",
    "5. volume": "1562106"
  },
  "2019-02-14": {
    "1. open": "42.2400",
    "2. high": "42.5250",
    "3. low": "42.1275",
    "4. close": "42.3700",
    "5. volume": "2038656"
  },
  "2019-02-13": {
    "1. open": "42.5500",
    "2. high": "42.6800",
    "3. low": "42.2950",
    "4. close": "42.3300",
    "5. volume": "1592385"
  },
  "2019-02-12": {
    "1. open": "42.0300",
    "2. high": "42.1600",
    "3. low": "41.9700",
    "4. close": "42.1000",
    "5. volume": "1085815"
  },
  "2019-02-11": {
    "1. open": "41.8100",
    "2. high": "41.9200",
    "3. low": "41.6500",
    "4. close": "41.6800",
    "5. volume": "1515942"
  },
  "2019-02-08": {
    "1. open": "41.6000",
    "2. high": "41.7500",
    "3. low": "41.4600",
    "4. close": "41.7500",
    "5. volume": "973977"
  },
  "2019-02-07": {
    "1. open": "42.0000",
    "2. high": "42.1000",
    "3. low": "41.6100",
    "4. close": "41.8200",
    "5. volume": "1048233"
  },
  "2019-02-06": {
    "1. open": "42.2200",
    "2. high": "42.3700",
    "3. low": "42.0450",
    "4. close": "42.1000",
    "5. volume": "1241972"
  },
  "2019-02-05": {
    "1. open": "42.1700",
    "2. high": "42.3700",
    "3. low": "42.0944",
    "4. close": "42.3400",
    "5. volume": "901948"
  },
  "2019-02-04": {
    "1. open": "41.7700",
    "2. high": "41.9900",
    "3. low": "41.7200",
    "4. close": "41.9700",
    "5. volume": "1492506"
  },
  "2019-02-01": {
    "1. open": "41.5800",
    "2. high": "41.9500",
    "3. low": "41.5300",
    "4. close": "41.7100",
    "5. volume": "1496688"
  },
  "2019-01-31": {
    "1. open": "41.9000",
    "2. high": "42.1400",
    "3. low": "41.7750",
    "4. close": "42.1300",
    "5. volume": "1925694"
  },
  "2019-01-30": {
    "1. open": "42.5700",
    "2. high": "42.6800",
    "3. low": "42.3200",
    "4. close": "42.4800",
    "5. volume": "1880048"
  },
  "2019-01-29": {
    "1. open": "42.2000",
    "2. high": "42.3500",
    "3. low": "42.0350",
    "4. close": "42.0800",
    "5. volume": "1605247"
  },
  "2019-01-28": {
    "1. open": "41.5300",
    "2. high": "41.6900",
    "3. low": "41.4400",
    "4. close": "41.6200",
    "5. volume": "1331524"
  },
  "2019-01-25": {
    "1. open": "41.8700",
    "2. high": "42.0500",
    "3. low": "41.7581",
    "4. close": "41.8600",
    "5. volume": "1606235"
  },
  "2019-01-24": {
    "1. open": "41.1700",
    "2. high": "41.4700",
    "3. low": "41.1700",
    "4. close": "41.4100",
    "5. volume": "1410517"
  },
  "2019-01-23": {
    "1. open": "41.7000",
    "2. high": "41.7450",
    "3. low": "41.4400",
    "4. close": "41.6400",
    "5. volume": "1219945"
  },
  "2019-01-22": {
    "1. open": "41.4100",
    "2. high": "41.5700",
    "3. low": "41.2515",
    "4. close": "41.3800",
    "5. volume": "2288119"
  },
  "2019-01-18": {
    "1. open": "42.0400",
    "2. high": "42.1000",
    "3. low": "41.8000",
    "4. close": "41.9200",
    "5. volume": "1600308"
  },
  "2019-01-17": {
    "1. open": "41.1500",
    "2. high": "41.5350",
    "3. low": "41.1401",
    "4. close": "41.4900",
    "5. volume": "1632850"
  },
  "2019-01-16": {
    "1. open": "41.4300",
    "2. high": "41.7900",
    "3. low": "41.4000",
    "4. close": "41.5400",
    "5. volume": "1480486"
  },
  "2019-01-15": {
    "1. open": "40.9500",
    "2. high": "41.2600",
    "3. low": "40.8100",
    "4. close": "41.2200",
    "5. volume": "1962618"
  },
  "2019-01-14": {
    "1. open": "40.9100",
    "2. high": "41.3200",
    "3. low": "40.8900",
    "4. close": "40.9800",
    "5. volume": "2763001"
  },
  "2019-01-11": {
    "1. open": "41.2900",
    "2. high": "41.6600",
    "3. low": "41.2100",
    "4. close": "41.4200",
    "5. volume": "2055921"
  },
  "2019-01-10": {
    "1. open": "41.1300",
    "2. high": "41.6600",
    "3. low": "41.1000",
    "4. close": "41.5300",
    "5. volume": "1690624"
  },
  "2019-01-09": {
    "1. open": "41.4600",
    "2. high": "41.5735",
    "3. low": "41.1300",
    "4. close": "41.4400",
    "5. volume": "2733753"
  },
  "2019-01-08": {
    "1. open": "41.5100",
    "2. high": "41.5700",
    "3. low": "40.9500",
    "4. close": "41.1600",
    "5. volume": "2888260"
  },
  "2019-01-07": {
    "1. open": "41.0400",
    "2. high": "41.2600",
    "3. low": "40.8600",
    "4. close": "41.0500",
    "5. volume": "2212255"
  },
  "2019-01-04": {
    "1. open": "41.3300",
    "2. high": "41.8500",
    "3. low": "41.2600",
    "4. close": "41.6100",
    "5. volume": "3061163"
  },
  "2019-01-03": {
    "1. open": "40.5300",
    "2. high": "40.7700",
    "3. low": "40.2900",
    "4. close": "40.4300",
    "5. volume": "1479404"
  },
  "2019-01-02": {
    "1. open": "40.3700",
    "2. high": "40.9050",
    "3. low": "40.2500",
    "4. close": "40.8800",
    "5. volume": "2565040"
  },
  "2018-12-31": {
    "1. open": "41.1700",
    "2. high": "41.4100",
    "3. low": "40.8450",
    "4. close": "41.1100",
    "5. volume": "1719904"
  },
  "2018-12-28": {
    "1. open": "41.0100",
    "2. high": "41.3450",
    "3. low": "40.8750",
    "4. close": "41.0700",
    "5. volume": "2190480"
  },
  "2018-12-27": {
    "1. open": "40.3000",
    "2. high": "40.7000",
    "3. low": "39.8500",
    "4. close": "40.7000",
    "5. volume": "3242731"
  },
  "2018-12-26": {
    "1. open": "40.6400",
    "2. high": "41.2300",
    "3. low": "40.0100",
    "4. close": "41.2300",
    "5. volume": "2421162"
  },
  "2018-12-24": {
    "1. open": "40.5400",
    "2. high": "40.8800",
    "3. low": "40.2800",
    "4. close": "40.3700",
    "5. volume": "1771123"
  },
  "2018-12-21": {
    "1. open": "40.9700",
    "2. high": "41.4500",
    "3. low": "40.4100",
    "4. close": "40.5600",
    "5. volume": "4191906"
  },
  "2018-12-20": {
    "1. open": "41.1500",
    "2. high": "41.2850",
    "3. low": "40.7400",
    "4. close": "40.9800",
    "5. volume": "4317403"
  },
  "2018-12-19": {
    "1. open": "41.1200",
    "2. high": "41.3900",
    "3. low": "40.3000",
    "4. close": "40.3400",
    "5. volume": "3763528"
  },
  "2018-12-18": {
    "1. open": "41.1700",
    "2. high": "41.2800",
    "3. low": "40.6700",
    "4. close": "40.7900",
    "5. volume": "1923031"
  },
  "2018-12-17": {
    "1. open": "40.9800",
    "2. high": "41.0700",
    "3. low": "40.5400",
    "4. close": "40.7000",
    "5. volume": "1964980"
  },
  "2018-12-14": {
    "1. open": "40.6900",
    "2. high": "41.0900",
    "3. low": "40.6900",
    "4. close": "40.9000",
    "5. volume": "1246958"
  },
  "2018-12-13": {
    "1. open": "41.4600",
    "2. high": "41.5600",
    "3. low": "41.1750",
    "4. close": "41.3200",
    "5. volume": "1969839"
  },
  "2018-12-12": {
    "1. open": "41.3800",
    "2. high": "41.7700",
    "3. low": "41.2550",
    "4. close": "41.3500",
    "5. volume": "2489213"
  },
  "2018-12-11": {
    "1. open": "40.8700",
    "2. high": "40.9100",
    "3. low": "40.1050",
    "4. close": "40.2600",
    "5. volume": "2524477"
  },
  "2018-12-10": {
    "1. open": "40.7400",
    "2. high": "40.8600",
    "3. low": "39.9900",
    "4. close": "40.4100",
    "5. volume": "3089840"
  },
  "2018-12-07": {
    "1. open": "41.3800",
    "2. high": "41.6450",
    "3. low": "40.6826",
    "4. close": "40.8500",
    "5. volume": "2877827"
  },
  "2018-12-06": {
    "1. open": "40.8000",
    "2. high": "41.0100",
    "3. low": "39.5801",
    "4. close": "41.0100",
    "5. volume": "5616368"
  },
  "2018-12-04": {
    "1. open": "43.2600",
    "2. high": "43.3200",
    "3. low": "42.3300",
    "4. close": "42.5500",
    "5. volume": "3637059"
  },
  "2018-12-03": {
    "1. open": "43.4700",
    "2. high": "43.5950",
    "3. low": "43.2750",
    "4. close": "43.4700",
    "5. volume": "2189182"
  },
  "2018-11-30": {
    "1. open": "42.2400",
    "2. high": "42.6200",
    "3. low": "42.2100",
    "4. close": "42.5400",
    "5. volume": "1542037"
  },
  "2018-11-29": {
    "1. open": "42.7200",
    "2. high": "42.9900",
    "3. low": "42.6900",
    "4. close": "42.8100",
    "5. volume": "1519557"
  },
  "2018-11-28": {
    "1. open": "42.7700",
    "2. high": "43.3199",
    "3. low": "42.5700",
    "4. close": "43.2700",
    "5. volume": "1936419"
  },
  "2018-11-27": {
    "1. open": "42.8800",
    "2. high": "43.0350",
    "3. low": "42.6800",
    "4. close": "42.8500",
    "5. volume": "1571290"
  },
  "2018-11-26": {
    "1. open": "43.0400",
    "2. high": "43.2800",
    "3. low": "43.0300",
    "4. close": "43.1700",
    "5. volume": "2172067"
  },
  "2018-11-23": {
    "1. open": "41.9200",
    "2. high": "41.9400",
    "3. low": "41.7100",
    "4. close": "41.7400",
    "5. volume": "775619"
  },
  "2018-11-21": {
    "1. open": "42.1800",
    "2. high": "42.2835",
    "3. low": "41.8700",
    "4. close": "41.8700",
    "5. volume": "1519004"
  },
  "2018-11-20": {
    "1. open": "41.2600",
    "2. high": "41.3900",
    "3. low": "40.9590",
    "4. close": "41.0500",
    "5. volume": "1539763"
  },
  "2018-11-19": {
    "1. open": "42.1900",
    "2. high": "42.2400",
    "3. low": "41.6500",
    "4. close": "41.9100",
    "5. volume": "1588272"
  },
  "2018-11-16": {
    "1. open": "41.8300",
    "2. high": "42.2800",
    "3. low": "41.7700",
    "4. close": "42.2400",
    "5. volume": "1909948"
  },
  "2018-11-15": {
    "1. open": "41.4500",
    "2. high": "42.4200",
    "3. low": "41.3500",
    "4. close": "42.4000",
    "5. volume": "2151243"
  },
  "2018-11-14": {
    "1. open": "42.1000",
    "2. high": "42.1010",
    "3. low": "41.3400",
    "4. close": "41.7700",
    "5. volume": "1899480"
  },
  "2018-11-13": {
    "1. open": "41.5100",
    "2. high": "42.0234",
    "3. low": "41.4800",
    "4. close": "41.7900",
    "5. volume": "2919090"
  },
  "2018-11-12": {
    "1. open": "41.2400",
    "2. high": "41.2400",
    "3. low": "40.8025",
    "4. close": "40.8800",
    "5. volume": "1609572"
  },
  "2018-11-09": {
    "1. open": "41.2400",
    "2. high": "41.3700",
    "3. low": "41.0700",
    "4. close": "41.2300",
    "5. volume": "2799200"
  },
  "2018-11-08": {
    "1. open": "42.2600",
    "2. high": "42.4100",
    "3. low": "41.7900",
    "4. close": "41.9300",
    "5. volume": "1586592"
  },
  "2018-11-07": {
    "1. open": "42.1500",
    "2. high": "42.2800",
    "3. low": "41.8300",
    "4. close": "42.2800",
    "5. volume": "2092022"
  },
  "2018-11-06": {
    "1. open": "41.5800",
    "2. high": "41.7900",
    "3. low": "41.5300",
    "4. close": "41.7900",
    "5. volume": "2043037"
  },
  "2018-11-05": {
    "1. open": "41.8600",
    "2. high": "42.0200",
    "3. low": "41.5200",
    "4. close": "41.7000",
    "5. volume": "2119548"
  },
  "2018-11-02": {
    "1. open": "42.3300",
    "2. high": "42.3600",
    "3. low": "41.7300",
    "4. close": "41.9600",
    "5. volume": "2120454"
  },
  "2018-11-01": {
    "1. open": "41.4700",
    "2. high": "41.5600",
    "3. low": "41.3250",
    "4. close": "41.5600",
    "5. volume": "2240534"
  },
  "2018-10-31": {
    "1. open": "41.1600",
    "2. high": "41.3800",
    "3. low": "41.0700",
    "4. close": "41.0900",
    "5. volume": "2499429"
  },
  "2018-10-30": {
    "1. open": "40.5000",
    "2. high": "40.7200",
    "3. low": "40.3450",
    "4. close": "40.6700",
    "5. volume": "2676153"
  },
  "2018-10-29": {
    "1. open": "40.9300",
    "2. high": "41.0400",
    "3. low": "39.9400",
    "4. close": "40.1800",
    "5. volume": "4054451"
  },
  "2018-10-26": {
    "1. open": "38.6300",
    "2. high": "38.9100",
    "3. low": "38.2340",
    "4. close": "38.6600",
    "5. volume": "3658912"
  },
  "2018-10-25": {
    "1. open": "38.9900",
    "2. high": "39.3100",
    "3. low": "38.8550",
    "4. close": "39.1400",
    "5. volume": "3032662"
  },
  "2018-10-24": {
    "1. open": "39.1900",
    "2. high": "39.1900",
    "3. low": "38.5400",
    "4. close": "38.5700",
    "5. volume": "4870812"
  },
  "2018-10-23": {
    "1. open": "39.7100",
    "2. high": "39.8000",
    "3. low": "39.2600",
    "4. close": "39.4000",
    "5. volume": "8433196"
  },
  "2018-10-22": {
    "1. open": "40.6100",
    "2. high": "40.6600",
    "3. low": "40.2500",
    "4. close": "40.3500",
    "5. volume": "6436728"
  },
  "2018-10-19": {
    "1. open": "40.6400",
    "2. high": "40.7550",
    "3. low": "40.3700",
    "4. close": "40.4600",
    "5. volume": "9964672"
  }
}


class Search extends PureComponent {
  state = {
    value: ''
  }
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount() {
    const queries = parse(this.props.location.search)
    return this.setState({value: queries.q || ''})
  }

  render() {
    return (
      <div>
        <Page
          pageName={'Search'}
          user={'Ruixin'}
          menu={<Menu/>}
          theme={this.props.theme}
          changeTheme={this.props.actions.changeTheme}
          className={'search-page'}
          appbar={this.props.location.search !== '' ? (
            <Fragment>
              <input type="text" value={this.state.value} onChange={(e) => this.onChange(e, {newValue: e.target.value})} style={{width: '200px'}}/>
              <button
                onClick={() => this.props.history.push(encodeurl(`/search?q=${this.state.value}`))}
                className="btn primary"
              >Search
              </button>
            </Fragment>
          ) : null}
        >
          {this.props.location.search !== '' ?
            <Fragment>
              <div className="row">
                <div className="card sm-12">
                  <div className="header">
                    <div className="left">
                      <div className="title">HSBC Holding plc</div>
                      <div className="subtitle">HSBC</div>
                    </div>
                  </div>
                  <div className="content">
                    <div className="row">
                      <div className="column sm-4">
                        <div className="kpi">
                          <div className="item color-red text-xl">
                            <span className=""><i className="icon icon-arrow-down"></i></span>
                            <span className="">-0.93</span>
                            <span className="">%</span>
                            <span>&nbsp;</span>
                          </div>
                          <div className="item text-xl">
                            <span>305.50</span>
                            <span className="text-lg color-gray">USD</span>
                          </div>
                        </div>
                        <p style={{marginTop:'8px'}}> HSBC Holdings PLC provides commercial banking, global banking, and wealth management among other services.
                          It operates in Europe, Asia, the Middle East and North Africa, and North America.London-based
                          HSBC has about 4,000 offices in 70 countries and is among the largest banks in the world.
                          It operates in Europe, Asia, the Middle East and North Africa, and North America.
                          The bank provides commercial banking, global banking, and wealth management, among other services.
                        </p>
                      </div>
                      <div className="column sm-8">
                          <CandleStickChart
                            data={_.sortBy(Object.keys(hsbcIntradayTS)
                              .map(k=>Object.assign({
                              date: timeParse("%Y-%m-%d")(k)
                            },_.mapKeys(hsbcIntradayTS[k], (v, key)=>key.split(' ')[1])))
                              .map(data=>({...data, volume: data.volume*1000})), ['date'])
                            }

                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card sm-12">
                  <div className="header">
                    <div className="left">
                      <div className="title">HSBC Holding plc</div>
                      <div className="subtitle">HSBC</div>
                    </div>
                  </div>
                  <div className="content">
                    <div className="row">
                      <div className="column sm-4">
                        <div className="kpi">
                          <div className="item color-red text-xl">
                            <span className=""><i className="icon icon-arrow-down"></i></span>
                            <span className="">-0.93</span>
                            <span className="">%</span>
                            <span>&nbsp;</span>
                          </div>
                          <div className="item text-xl">
                            <span>305.50</span>
                            <span className="text-lg color-gray">USD</span>
                          </div>
                        </div>
                        <p style={{marginTop:'8px'}}> HSBC Holdings PLC provides commercial banking, global banking, and wealth management among other services.
                          It operates in Europe, Asia, the Middle East and North Africa, and North America.London-based
                          HSBC has about 4,000 offices in 70 countries and is among the largest banks in the world.
                          It operates in Europe, Asia, the Middle East and North Africa, and North America.
                          The bank provides commercial banking, global banking, and wealth management, among other services.
                        </p>
                      </div>
                      <div className="column sm-8">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
            : <div className="search-wrapper tile" style={styles.tile}>
              <div className="search-container" style={styles.content}>
                <div className="row">
                  <label style={styles.label}>Symbol, company, description, or anything you expected</label>
                </div>
                <div className="row">
                  <SearchField
                    suggestions={this.props.suggestions}
                    fetchSuggestions={this.props.actions.fetchSuggestions}
                    clearSuggestions={this.props.actions.clearSuggestions}
                    value={this.state.value}
                    onChange={this.onChange}
                  />
                </div>
                <div className="row">
                  <div style={styles.buttonWrapper}>
                    <button
                      className="btn primary"
                      style={styles.button}
                      onClick={() => this.props.history.push(encodeurl(`/search?q=${this.state.value}`))}
                    >Search
                    </button>
                    <button className="btn" style={styles.button}>I'm Feeling Lucky</button>
                  </div>
                </div>
              </div>
            </div>}
        </Page>
      </div>
    )
  }
}

Search.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  actions: PropTypes.object
}

const styles = {
  button: {
    fontSize: '24px',
  },
  buttonWrapper: {
    margin: '0 auto',
  },
  label: {
    fontSize: '32px',
    margin: '0 auto',
    marginBottom: '28px',
  },
  tile: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    margin: '0 auto 0 auto',
    marginBottom: '10%'
  },
}

export default Radium(Search)
