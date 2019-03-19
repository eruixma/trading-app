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

    @ns.marshal_with(time_series_schema)
    def get(self, symbol):
        args = parser.parse_args()
        req = req = requests\
            .get('https://www.alphavantage.co/query?function={}&symbol={}&interval={}min&apikey=DZHPXXR2H4LNPP84'
                 .format(args['function'], symbol, args['interval'])
                 )

        ts = req.json()['Time Series ({}min)'.format(args['interval'])]

        result = []
        for k, v in ts.items():
            result.append({
                'time':k,
                'open': float(v['1. open']),
                'high': float(v['2. high']),
                'low': float(v['3. low']),
                'close': float(v['4. close']),
                'volume': float(v['5. volume']),
            })

        return result
