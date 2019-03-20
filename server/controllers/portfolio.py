import random

from flask import Blueprint
from flask_restplus import Resource, fields
from werkzeug.exceptions import BadRequest

from ..elasticsearch import es
from ..extensions import api
from ..models import db, Portfolio, MockTimeSeries

portfolio = Blueprint('portfolio', __name__)

ns = api.namespace('portfolio', path='/api/v1/portfolio', description='portfolio management')

kpi_schema = api.model('KPISchema', {
    'name': fields.String(description='kpi name'),
    'value': fields.String(description='kpi value'),
    'type': fields.String(description='type of the value, e.g. float, int, ...'),
    'unit': fields.String(description='unit of the value')
})

portfolio_schema = api.model('PortfolioSchema', {
    'symbol': fields.String(),
    'company': fields.String(),
    'industry': fields.String(),
    'amount': fields.Integer(),
    'costPrice': fields.Float(),
    'totalMarketValue': fields.Float(),
    'floatingProfitLoss': fields.Float(),
    'change': fields.Float(),
    'currentPrice': fields.Float(),
})


@ns.route('/kpi/<string:kpi_type>')
@ns.response(403, 'Not Authorized')
@ns.response(400, 'Unknown kpi type')
class PortfolioKPI(Resource):

    @ns.doc("get total assets of portfolio")
    @ns.marshal_with(kpi_schema)
    def get(self, kpi_type):
        if kpi_type == 'assets':
            return self.get_total_assets()
        raise BadRequest('Unknown kpi type %s' % kpi_type)

    def get_total_assets(self):
        return {
            'name': 'Total assets',
            'value': '100',
            'type': 'float',
            'unit': 'USD'
        }


@ns.route('/')
class PortfolioResouse(Resource):
    @ns.doc("get stock list")
    @ns.marshal_list_with(portfolio_schema)
    def get(self):
        result = []
        for p in Portfolio.query.all():
            all = MockTimeSeries.query.filter_by(symbol=p.symbol.lower()).all()
            current_price = all[random.randint(0, len(all)-1)].close
            total_market_value = current_price * p.amount
            floating_profit_loss = total_market_value - p.costPrice * p.amount
            result.append({
                'symbol': p.symbol,
                'company': p.company,
                'industry': p.industry,
                'amount': p.amount,
                'costPrice': p.costPrice,
                'totalMarketValue': total_market_value,
                'floatingProfitLoss': floating_profit_loss,
                'change': floating_profit_loss / total_market_value,
                'currentPrice': current_price,
            })
        return result

    @ns.doc("buy or sell")
    def post(self):
        pass

