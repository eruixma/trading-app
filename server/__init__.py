#! ../env/bin/python

from flask import Flask
from webassets.loaders import PythonLoader as PythonAssetsLoader

from . import assets
from .models import db
from .controllers.main import main

from .extensions import (
    cache,
    assets_env,
    debug_toolbar,
    login_manager
)

from elasticsearch import Elasticsearch

from ssl import create_default_context
import certifi

context = create_default_context(cafile=certifi.where())

es = Elasticsearch("https://uls32kycjg:srm3vka7ud@rx-trading-app-5203068395.us-east-1.bonsaisearch.net:443", ssl_context=context)

res = es.search(index="stock", body={"query": {"match_all": {}}})
print("Got %d Hits:" % res['hits']['total'])


def create_app(object_name):
    """
    An flask application factory, as explained here:
    http://flask.pocoo.org/docs/patterns/appfactories/

    Arguments:
        object_name: the python path of the config object,
                     e.g. trading.settings.ProdConfig
    """

    app = Flask(__name__)

    app.config.from_object(object_name)

    # initialize the cache
    cache.init_app(app)

    # initialize the debug tool bar
    debug_toolbar.init_app(app)

    # initialize SQLAlchemy
    db.init_app(app)

    login_manager.init_app(app)

    # Import and register the different asset bundles
    assets_env.init_app(app)
    assets_loader = PythonAssetsLoader(assets)
    for name, bundle in assets_loader.load_bundles().items():
        assets_env.register(name, bundle)

    # register our blueprints
    app.register_blueprint(main)

    return app
