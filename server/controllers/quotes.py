from flask import Blueprint
from flask_restplus import Resource, fields, reqparse

from ..elasticsearch import es
from ..extensions import api

import requests
from bs4 import BeautifulSoup

quotes = Blueprint('quotes', __name__)

ns = api.namespace('quotes', path='/api/v1/quotes', description='market quotes')

index_schema = api.model('IndexSchema', {
    'market': fields.String(),
    'price': fields.Float(),
    'changePercent': fields.String(),
    'change': fields.Float()
})

sector_schema = api.model('IndexSchema', {
    'Information Technology': fields.String(),
    "Consumer Discretionary": fields.String(),
    "Financials": fields.String(),
    "Consumer Staples": fields.String(),
    "Health Care": fields.String(),
    "Utilities": fields.String(),
    "Materials": fields.String(),
    "Communication Services": fields.String(),
    "Energy": fields.String(),
    "Industrials": fields.String(),
    "Real Estate": fields.String()
})

price_schema = api.model('PriceSchema', {
    'price': fields.String(),
    'change': fields.String(),
})

time_series_schema = api.model('TimeSeriesSchema', {
    'time': fields.String(),
    'open': fields.Float(),
    'high': fields.Float(),
    'low': fields.Float(),
    'close': fields.Float(),
    'volume': fields.Float(),
})

parser = reqparse.RequestParser()
parser.add_argument('function', type=str)
parser.add_argument('interval', type=int)

apikey = 'DZHPXXR2H4LNPP84'
alpha_vantage_url = 'https://www.alphavantage.co/query'


test_data = [
    {
        "time": "2019-03-19",
        "open": 41.49,
        "high": 41.61,
        "low": 41.31,
        "close": 41.38,
        "volume": 2119529
    },
    {
        "time": "2019-03-18",
        "open": 41.42,
        "high": 41.57,
        "low": 41.31,
        "close": 41.53,
        "volume": 2314934
    },
    {
        "time": "2019-03-15",
        "open": 41.13,
        "high": 41.47,
        "low": 41.13,
        "close": 41.41,
        "volume": 2898178
    },
    {
        "time": "2019-03-14",
        "open": 41.14,
        "high": 41.28,
        "low": 41.02,
        "close": 41.14,
        "volume": 2359268
    },
    {
        "time": "2019-03-13",
        "open": 40.98,
        "high": 41.17,
        "low": 40.91,
        "close": 41.12,
        "volume": 1975720
    },
    {
        "time": "2019-03-12",
        "open": 41,
        "high": 41.13,
        "low": 40.98,
        "close": 41.07,
        "volume": 1232669
    },
    {
        "time": "2019-03-11",
        "open": 40.94,
        "high": 41.07,
        "low": 40.92,
        "close": 41.01,
        "volume": 1770765
    },
    {
        "time": "2019-03-08",
        "open": 40.65,
        "high": 40.91,
        "low": 40.65,
        "close": 40.87,
        "volume": 1631019
    },
    {
        "time": "2019-03-07",
        "open": 40.94,
        "high": 40.965,
        "low": 40.6885,
        "close": 40.87,
        "volume": 2177512
    },
    {
        "time": "2019-03-06",
        "open": 41.08,
        "high": 41.14,
        "low": 40.9241,
        "close": 40.97,
        "volume": 1071511
    },
    {
        "time": "2019-03-05",
        "open": 40.88,
        "high": 41.12,
        "low": 40.81,
        "close": 41,
        "volume": 1678035
    },
    {
        "time": "2019-03-04",
        "open": 40.7,
        "high": 40.79,
        "low": 40.51,
        "close": 40.68,
        "volume": 2050117
    },
    {
        "time": "2019-03-01",
        "open": 40.77,
        "high": 40.945,
        "low": 40.49,
        "close": 40.61,
        "volume": 2006407
    },
    {
        "time": "2019-02-28",
        "open": 40.87,
        "high": 41.15,
        "low": 40.78,
        "close": 40.83,
        "volume": 2357442
    },
    {
        "time": "2019-02-27",
        "open": 40.98,
        "high": 41.19,
        "low": 40.94,
        "close": 41.13,
        "volume": 1823837
    },
    {
        "time": "2019-02-26",
        "open": 40.54,
        "high": 40.845,
        "low": 40.52,
        "close": 40.76,
        "volume": 1667636
    },
    {
        "time": "2019-02-25",
        "open": 40.66,
        "high": 40.76,
        "low": 40.5273,
        "close": 40.59,
        "volume": 1952770
    },
    {
        "time": "2019-02-22",
        "open": 40.72,
        "high": 40.765,
        "low": 40.6,
        "close": 40.71,
        "volume": 1601319
    },
    {
        "time": "2019-02-21",
        "open": 40.95,
        "high": 40.96,
        "low": 40.66,
        "close": 40.81,
        "volume": 2306149
    },
    {
        "time": "2019-02-20",
        "open": 41.84,
        "high": 42.22,
        "low": 41.77,
        "close": 42.13,
        "volume": 3107851
    },
    {
        "time": "2019-02-19",
        "open": 41.16,
        "high": 41.55,
        "low": 40.93,
        "close": 41.52,
        "volume": 6952003
    },
    {
        "time": "2019-02-15",
        "open": 42.79,
        "high": 42.92,
        "low": 42.645,
        "close": 42.8,
        "volume": 1562106
    },
    {
        "time": "2019-02-14",
        "open": 42.24,
        "high": 42.525,
        "low": 42.1275,
        "close": 42.37,
        "volume": 2038656
    },
    {
        "time": "2019-02-13",
        "open": 42.55,
        "high": 42.68,
        "low": 42.295,
        "close": 42.33,
        "volume": 1592385
    },
    {
        "time": "2019-02-12",
        "open": 42.03,
        "high": 42.16,
        "low": 41.97,
        "close": 42.1,
        "volume": 1085815
    },
    {
        "time": "2019-02-11",
        "open": 41.81,
        "high": 41.92,
        "low": 41.65,
        "close": 41.68,
        "volume": 1515942
    },
    {
        "time": "2019-02-08",
        "open": 41.6,
        "high": 41.75,
        "low": 41.46,
        "close": 41.75,
        "volume": 973977
    },
    {
        "time": "2019-02-07",
        "open": 42,
        "high": 42.1,
        "low": 41.61,
        "close": 41.82,
        "volume": 1048233
    },
    {
        "time": "2019-02-06",
        "open": 42.22,
        "high": 42.37,
        "low": 42.045,
        "close": 42.1,
        "volume": 1241972
    },
    {
        "time": "2019-02-05",
        "open": 42.17,
        "high": 42.37,
        "low": 42.0944,
        "close": 42.34,
        "volume": 901948
    },
    {
        "time": "2019-02-04",
        "open": 41.77,
        "high": 41.99,
        "low": 41.72,
        "close": 41.97,
        "volume": 1492506
    },
    {
        "time": "2019-02-01",
        "open": 41.58,
        "high": 41.95,
        "low": 41.53,
        "close": 41.71,
        "volume": 1496688
    },
    {
        "time": "2019-01-31",
        "open": 41.9,
        "high": 42.14,
        "low": 41.775,
        "close": 42.13,
        "volume": 1925694
    },
    {
        "time": "2019-01-30",
        "open": 42.57,
        "high": 42.68,
        "low": 42.32,
        "close": 42.48,
        "volume": 1880048
    },
    {
        "time": "2019-01-29",
        "open": 42.2,
        "high": 42.35,
        "low": 42.035,
        "close": 42.08,
        "volume": 1605247
    },
    {
        "time": "2019-01-28",
        "open": 41.53,
        "high": 41.69,
        "low": 41.44,
        "close": 41.62,
        "volume": 1331524
    },
    {
        "time": "2019-01-25",
        "open": 41.87,
        "high": 42.05,
        "low": 41.7581,
        "close": 41.86,
        "volume": 1606235
    },
    {
        "time": "2019-01-24",
        "open": 41.17,
        "high": 41.47,
        "low": 41.17,
        "close": 41.41,
        "volume": 1410517
    },
    {
        "time": "2019-01-23",
        "open": 41.7,
        "high": 41.745,
        "low": 41.44,
        "close": 41.64,
        "volume": 1219945
    },
    {
        "time": "2019-01-22",
        "open": 41.41,
        "high": 41.57,
        "low": 41.2515,
        "close": 41.38,
        "volume": 2288119
    },
    {
        "time": "2019-01-18",
        "open": 42.04,
        "high": 42.1,
        "low": 41.8,
        "close": 41.92,
        "volume": 1600308
    },
    {
        "time": "2019-01-17",
        "open": 41.15,
        "high": 41.535,
        "low": 41.1401,
        "close": 41.49,
        "volume": 1632850
    },
    {
        "time": "2019-01-16",
        "open": 41.43,
        "high": 41.79,
        "low": 41.4,
        "close": 41.54,
        "volume": 1480486
    },
    {
        "time": "2019-01-15",
        "open": 40.95,
        "high": 41.26,
        "low": 40.81,
        "close": 41.22,
        "volume": 1962618
    },
    {
        "time": "2019-01-14",
        "open": 40.91,
        "high": 41.32,
        "low": 40.89,
        "close": 40.98,
        "volume": 2763001
    },
    {
        "time": "2019-01-11",
        "open": 41.29,
        "high": 41.66,
        "low": 41.21,
        "close": 41.42,
        "volume": 2055921
    },
    {
        "time": "2019-01-10",
        "open": 41.13,
        "high": 41.66,
        "low": 41.1,
        "close": 41.53,
        "volume": 1690624
    },
    {
        "time": "2019-01-09",
        "open": 41.46,
        "high": 41.5735,
        "low": 41.13,
        "close": 41.44,
        "volume": 2733753
    },
    {
        "time": "2019-01-08",
        "open": 41.51,
        "high": 41.57,
        "low": 40.95,
        "close": 41.16,
        "volume": 2888260
    },
    {
        "time": "2019-01-07",
        "open": 41.04,
        "high": 41.26,
        "low": 40.86,
        "close": 41.05,
        "volume": 2212255
    },
    {
        "time": "2019-01-04",
        "open": 41.33,
        "high": 41.85,
        "low": 41.26,
        "close": 41.61,
        "volume": 3061163
    },
    {
        "time": "2019-01-03",
        "open": 40.53,
        "high": 40.77,
        "low": 40.29,
        "close": 40.43,
        "volume": 1479404
    },
    {
        "time": "2019-01-02",
        "open": 40.37,
        "high": 40.905,
        "low": 40.25,
        "close": 40.88,
        "volume": 2565040
    },
    {
        "time": "2018-12-31",
        "open": 41.17,
        "high": 41.41,
        "low": 40.845,
        "close": 41.11,
        "volume": 1719904
    },
    {
        "time": "2018-12-28",
        "open": 41.01,
        "high": 41.345,
        "low": 40.875,
        "close": 41.07,
        "volume": 2190480
    },
    {
        "time": "2018-12-27",
        "open": 40.3,
        "high": 40.7,
        "low": 39.85,
        "close": 40.7,
        "volume": 3242731
    },
    {
        "time": "2018-12-26",
        "open": 40.64,
        "high": 41.23,
        "low": 40.01,
        "close": 41.23,
        "volume": 2421162
    },
    {
        "time": "2018-12-24",
        "open": 40.54,
        "high": 40.88,
        "low": 40.28,
        "close": 40.37,
        "volume": 1771123
    },
    {
        "time": "2018-12-21",
        "open": 40.97,
        "high": 41.45,
        "low": 40.41,
        "close": 40.56,
        "volume": 4191906
    },
    {
        "time": "2018-12-20",
        "open": 41.15,
        "high": 41.285,
        "low": 40.74,
        "close": 40.98,
        "volume": 4317403
    },
    {
        "time": "2018-12-19",
        "open": 41.12,
        "high": 41.39,
        "low": 40.3,
        "close": 40.34,
        "volume": 3763528
    },
    {
        "time": "2018-12-18",
        "open": 41.17,
        "high": 41.28,
        "low": 40.67,
        "close": 40.79,
        "volume": 1923031
    },
    {
        "time": "2018-12-17",
        "open": 40.98,
        "high": 41.07,
        "low": 40.54,
        "close": 40.7,
        "volume": 1964980
    },
    {
        "time": "2018-12-14",
        "open": 40.69,
        "high": 41.09,
        "low": 40.69,
        "close": 40.9,
        "volume": 1246958
    },
    {
        "time": "2018-12-13",
        "open": 41.46,
        "high": 41.56,
        "low": 41.175,
        "close": 41.32,
        "volume": 1969839
    },
    {
        "time": "2018-12-12",
        "open": 41.38,
        "high": 41.77,
        "low": 41.255,
        "close": 41.35,
        "volume": 2489213
    },
    {
        "time": "2018-12-11",
        "open": 40.87,
        "high": 40.91,
        "low": 40.105,
        "close": 40.26,
        "volume": 2524477
    },
    {
        "time": "2018-12-10",
        "open": 40.74,
        "high": 40.86,
        "low": 39.99,
        "close": 40.41,
        "volume": 3089840
    },
    {
        "time": "2018-12-07",
        "open": 41.38,
        "high": 41.645,
        "low": 40.6826,
        "close": 40.85,
        "volume": 2877827
    },
    {
        "time": "2018-12-06",
        "open": 40.8,
        "high": 41.01,
        "low": 39.5801,
        "close": 41.01,
        "volume": 5616368
    },
    {
        "time": "2018-12-04",
        "open": 43.26,
        "high": 43.32,
        "low": 42.33,
        "close": 42.55,
        "volume": 3637059
    },
    {
        "time": "2018-12-03",
        "open": 43.47,
        "high": 43.595,
        "low": 43.275,
        "close": 43.47,
        "volume": 2189182
    },
    {
        "time": "2018-11-30",
        "open": 42.24,
        "high": 42.62,
        "low": 42.21,
        "close": 42.54,
        "volume": 1542037
    },
    {
        "time": "2018-11-29",
        "open": 42.72,
        "high": 42.99,
        "low": 42.69,
        "close": 42.81,
        "volume": 1519557
    },
    {
        "time": "2018-11-28",
        "open": 42.77,
        "high": 43.3199,
        "low": 42.57,
        "close": 43.27,
        "volume": 1936419
    },
    {
        "time": "2018-11-27",
        "open": 42.88,
        "high": 43.035,
        "low": 42.68,
        "close": 42.85,
        "volume": 1571290
    },
    {
        "time": "2018-11-26",
        "open": 43.04,
        "high": 43.28,
        "low": 43.03,
        "close": 43.17,
        "volume": 2172067
    },
    {
        "time": "2018-11-23",
        "open": 41.92,
        "high": 41.94,
        "low": 41.71,
        "close": 41.74,
        "volume": 775619
    },
    {
        "time": "2018-11-21",
        "open": 42.18,
        "high": 42.2835,
        "low": 41.87,
        "close": 41.87,
        "volume": 1519004
    },
    {
        "time": "2018-11-20",
        "open": 41.26,
        "high": 41.39,
        "low": 40.959,
        "close": 41.05,
        "volume": 1539763
    },
    {
        "time": "2018-11-19",
        "open": 42.19,
        "high": 42.24,
        "low": 41.65,
        "close": 41.91,
        "volume": 1588272
    },
    {
        "time": "2018-11-16",
        "open": 41.83,
        "high": 42.28,
        "low": 41.77,
        "close": 42.24,
        "volume": 1909948
    },
    {
        "time": "2018-11-15",
        "open": 41.45,
        "high": 42.42,
        "low": 41.35,
        "close": 42.4,
        "volume": 2151243
    },
    {
        "time": "2018-11-14",
        "open": 42.1,
        "high": 42.101,
        "low": 41.34,
        "close": 41.77,
        "volume": 1899480
    },
    {
        "time": "2018-11-13",
        "open": 41.51,
        "high": 42.0234,
        "low": 41.48,
        "close": 41.79,
        "volume": 2919090
    },
    {
        "time": "2018-11-12",
        "open": 41.24,
        "high": 41.24,
        "low": 40.8025,
        "close": 40.88,
        "volume": 1609572
    },
    {
        "time": "2018-11-09",
        "open": 41.24,
        "high": 41.37,
        "low": 41.07,
        "close": 41.23,
        "volume": 2799200
    },
    {
        "time": "2018-11-08",
        "open": 42.26,
        "high": 42.41,
        "low": 41.79,
        "close": 41.93,
        "volume": 1586592
    },
    {
        "time": "2018-11-07",
        "open": 42.15,
        "high": 42.28,
        "low": 41.83,
        "close": 42.28,
        "volume": 2092022
    },
    {
        "time": "2018-11-06",
        "open": 41.58,
        "high": 41.79,
        "low": 41.53,
        "close": 41.79,
        "volume": 2043037
    },
    {
        "time": "2018-11-05",
        "open": 41.86,
        "high": 42.02,
        "low": 41.52,
        "close": 41.7,
        "volume": 2119548
    },
    {
        "time": "2018-11-02",
        "open": 42.33,
        "high": 42.36,
        "low": 41.73,
        "close": 41.96,
        "volume": 2120454
    },
    {
        "time": "2018-11-01",
        "open": 41.47,
        "high": 41.56,
        "low": 41.325,
        "close": 41.56,
        "volume": 2240534
    },
    {
        "time": "2018-10-31",
        "open": 41.16,
        "high": 41.38,
        "low": 41.07,
        "close": 41.09,
        "volume": 2499429
    },
    {
        "time": "2018-10-30",
        "open": 40.5,
        "high": 40.72,
        "low": 40.345,
        "close": 40.67,
        "volume": 2676153
    },
    {
        "time": "2018-10-29",
        "open": 40.93,
        "high": 41.04,
        "low": 39.94,
        "close": 40.18,
        "volume": 4054451
    },
    {
        "time": "2018-10-26",
        "open": 38.63,
        "high": 38.91,
        "low": 38.234,
        "close": 38.66,
        "volume": 3658912
    },
    {
        "time": "2018-10-25",
        "open": 38.99,
        "high": 39.31,
        "low": 38.855,
        "close": 39.14,
        "volume": 3032662
    },
    {
        "time": "2018-10-24",
        "open": 39.19,
        "high": 39.19,
        "low": 38.54,
        "close": 38.57,
        "volume": 4870812
    },
    {
        "time": "2018-10-23",
        "open": 39.71,
        "high": 39.8,
        "low": 39.26,
        "close": 39.4,
        "volume": 8433196
    }
]

@ns.route('/indices')
class Indices(Resource):

    @ns.marshal_list_with(index_schema)
    def get(self):
        req = requests.get('https://sg.finance.yahoo.com/world-indices/')
        soup = BeautifulSoup(req.text)
        results = []
        rows = soup('tr')
        rows.pop(0)
        for index in rows:
            attr_list = list(index.children)

            results.append({
                'market': attr_list[1].text,
                'price': float(attr_list[2].text.replace(',', '')),
                'change': float(attr_list[3].text.replace(',', '')),
                'changePercent': attr_list[4].text
            })

        return results


@ns.route('/sector')
class SectorPerformance(Resource):

    @ns.marshal_with(sector_schema)
    def get(self):
        req = requests.get('https://www.alphavantage.co/query?function=SECTOR&&apikey=DZHPXXR2H4LNPP84')
        return req.json()['Rank A: Real-Time Performance']


@ns.route('/price/<string:symbol>')
class SectorPerformance(Resource):

    @ns.marshal_with(price_schema)
    def get(self, symbol):
        req = requests.get('https://www.gurufocus.com/stock/%s' % symbol)
        soup = BeautifulSoup(req.text)
        price = soup.select('.stock_header_price')[0].text
        up = soup.select('#stock_header_price_green')
        down = soup.select('#stock_header_price_red')
        if len(up) > 0:
            change = '+' + up[0].text
        else:
            change = '-' + down[0].text
        return {'price': price, 'change': change}


@ns.route('/timeseries/<string:symbol>')
class TimeSeries(Resource):

    def get_api(self, symbol, function_name, interval):
        if function_name == 'TIME_SERIES_INTRADAY':
            return '{}?function={}&symbol={}&interval={}min&apikey={}'.format(
                alpha_vantage_url,
                function_name,
                symbol,
                interval,
                apikey
            )
        elif function_name == 'TIME_SERIES_DAILY':
            return '{}?function={}&symbol={}&outputsize=compact&apikey={}'.format(
                alpha_vantage_url,
                function_name,
                symbol,
                apikey
            )

        raise (ValueError('unknown function %s' % function_name))

    def get_result_key(self, function_name, interval):
        if function_name == 'TIME_SERIES_INTRADAY':
            return 'Time Series ({}min)'.format(interval)
        elif function_name == 'TIME_SERIES_DAILY':
            return 'Time Series (Daily)'
        else:
            raise (ValueError('unknown function %s' % function_name))

    @ns.marshal_with(time_series_schema)
    def get(self, symbol):
        args = parser.parse_args()
        req = requests.get(self.get_api(symbol, args['function'], args['interval']))

        ts = req.json()[self.get_result_key(args['function'], args['interval'])]

        result = []
        for k, v in ts.items():
            result.append({
                'time': k,
                'open': float(v['1. open']),
                'high': float(v['2. high']),
                'low': float(v['3. low']),
                'close': float(v['4. close']),
                'volume': float(v['5. volume']),
            })

        # if args['function']=='TIME_SERIES_DAILY': return test_data
        return result
