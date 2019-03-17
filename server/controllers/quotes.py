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
        req = requests.get('https://www.alphavantage.co/query?function=SECTOR&apikey=DZHPXXR2H4LNPP84')
        return req.json()['Rank A: Real-Time Performance']
