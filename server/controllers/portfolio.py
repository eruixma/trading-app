from flask import Blueprint
from flask_restplus import Resource, fields
from werkzeug.exceptions import BadRequest

from ..elasticsearch import es
from ..extensions import api
from ..models import db

portfolio = Blueprint('portfolio', __name__)

ns = api.namespace('portfolio', path='/api/v1/portfolio', description='portfolio management')

kpi_schema = api.model('KPISchema', {
    'name': fields.String(description='kpi name'),
    'value': fields.String(description='kpi value'),
    'type': fields.String(description='type of the value, e.g. float, int, ...'),
    'unit': fields.String(description='unit of the value')
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
            'name':'Total assets',
            'value': '100',
            'type': 'float',
            'unit': 'USD'
        }

@ns.route('/')
class Portfolio(Resource):
    @ns.doc("get stock list")
    def get(self):
        pass

    @ns.doc("buy or sell")
    def post(self):
        pass
