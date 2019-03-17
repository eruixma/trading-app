from flask import Blueprint
from flask_restplus import Resource, fields, reqparse

from ..elasticsearch import es
from ..extensions import api

search = Blueprint('search', __name__)

ns = api.namespace('search', path='/api/v1/search', description='search stocks')

suggestion_schema = api.model('SuggestionSchema', {
    'symbol': fields.String(),
    'company': fields.String()
})

parser = reqparse.RequestParser()
parser.add_argument('q', type=str, help='value to query')


@ns.route('/suggestion')
class Suggestion(Resource):

    @ns.doc("search suggestions")
    @ns.marshal_list_with(suggestion_schema)
    def get(self):
        args = parser.parse_args()
        result = es.search(
            index='stock',
            doc_type='doc',
            body={
                "size": 5,
                "query": {
                    "multi_match": {
                        "query": args['q'],
                        "fields": ['symbol^3', 'company^2', 'description']
                    }
                }
            }
        )
        return list(map(lambda hit: hit["_source"],result['hits']['hits']))
