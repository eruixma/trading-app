from flask import Blueprint
from flask_restplus import Resource, fields, reqparse

from ..elasticsearch import es
from ..extensions import api

search = Blueprint('search', __name__)

ns = api.namespace('search', path='/api/v1/search', description='search stocks')

suggestion_schema = api.model('SuggestionSchema', {
    'symbol': fields.String(),
    'company': fields.String(),
    'PB': fields.String(),
    'PE': fields.String(),
    'industry': fields.String(),
    'MarketCap': fields.String(),
    'EnterpriseValue': fields.String(),
    'location': fields.String(),
    'description': fields.String(),
})

parser = reqparse.RequestParser()
parser.add_argument('q', type=str, help='value to query')
parser.add_argument('limit', type=int, help='limit number of results')


@ns.route('/')
class Search(Resource):

    @ns.doc("search suggestions")
    @ns.marshal_list_with(suggestion_schema)
    def get(self):
        args = parser.parse_args()
        query_dsl = {
            "query": {
                "multi_match": {
                    "query": args['q'],
                    "fields": ['symbol^4', 'company^3', 'industry^2', 'description', 'message']
                }
            }
        }
        if args['limit']:
            query_dsl['size'] = args['limit']
        result = es.search(
            index='stock',
            doc_type='doc',
            body=query_dsl
        )

        hits = list(map(lambda hit: hit["_source"], result['hits']['hits']))

        return hits
