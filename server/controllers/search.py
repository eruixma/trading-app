from flask import Blueprint
from flask_restplus import Resource, fields, reqparse

from ..elasticsearch import es
from ..extensions import api

search = Blueprint('search', __name__)

ns = api.namespace('search', path='/api/v1/search', description='search stocks')

stock_schema = api.model('StockSchema', {
    'symbol': fields.String(),
    'company': fields.String(),
    'PB': fields.Float(),
    'PE': fields.Float(),
    'industry': fields.String(),
    'MarketCap': fields.Float(),
    'EnterpriseValue': fields.Float(),
    'location': fields.String(),
    'description': fields.String(),
})

parser = reqparse.RequestParser()
parser.add_argument('q', type=str, help='value to query')
parser.add_argument('limit', type=int, help='limit number of results')


def parse_keyword(q):
    if ':' in q:
        return q.split(':')[0].strip(), q.split(':')[1].strip()
    return None, q


def parse_logic(q):
    if ' AND ' in q:
        return 'AND', q.split('AND')

    return None, q


def parse_query(q):
    logic, query = parse_logic(q)
    dsl = {}
    if logic == 'AND':
        dsl['query'] = {'bool': {}}
        for s in query:
            k, v = parse_keyword(s)
            if k == 'sort':
                dsl['sort'] = [{v.split(',')[0]: {'order': v.split(',')[1] if len(v.split(',')) > 0 else 'desc'}}]
            elif k in ["company", "PE", "industry", "symbol", "MarketCap", "EnterpriseValue", "PB", "location"]:
                dsl['query']['bool'] = {'must': {'term': {k: v}}}
            else:
                dsl['query']['bool'] = {'must': {'match': {'message': q}}}
    else:
        k, v = parse_keyword(q)
        if k == 'order':
            dsl['sort'] = [{v.split(',')[0]: {'order': v.split(',')[1] if len(v.split(',')) > 0 else 'desc'}}]
        elif k in ["company", "PE", "industry", "symbol", "MarketCap", "EnterpriseValue", "PB", "location"]:
            dsl['query'] = {'term': {k: v}}
        else:
            dsl['query'] = {'match': {'message': q}}

    return dsl


@ns.route('/stocks')
class Stock(Resource):

    @ns.doc("search stocks")
    @ns.marshal_list_with(stock_schema)
    def get(self):
        args = parser.parse_args()
        query = parse_query(args['q'].lower())
        query['size'] = 5
        print(query)

        if args['limit']:
            query['size'] = args['limit']

        result = es.search(
            index='stock',
            doc_type='doc',
            body=query
        )

        hits = list(map(lambda hit: hit["_source"], result['hits']['hits']))

        return hits


@ns.route('/suggestions')
class Suggestion(Resource):

    @ns.doc("search suggestions")
    @ns.marshal_list_with(stock_schema)
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
                        "type": "phrase_prefix",
                        "fields": ['symbol^3', 'company^2']
                    }
                },
                "sort": [
                    {'MarketCap': {'order': 'desc'}}
                ]
            }
        )
        return list(map(lambda hit: hit["_source"], result['hits']['hits']))
