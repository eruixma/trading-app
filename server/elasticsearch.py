from elasticsearch import Elasticsearch

from ssl import create_default_context
import certifi

context = create_default_context(cafile=certifi.where())

es = Elasticsearch("https://uls32kycjg:srm3vka7ud@rx-trading-app-5203068395.us-east-1.bonsaisearch.net:443", ssl_context=context)
