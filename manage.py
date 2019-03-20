#!/usr/bin/env python
import csv
import os

from flask_script import Manager, Server
from flask_script.commands import ShowUrls, Clean
from server import create_app
from server.elasticsearch import es
from server.models import db, User, Portfolio, MockTimeSeries
from sqlalchemy import func
import random

# default to dev config because no one should use this in
# production anyway
env = os.environ.get('APPNAME_ENV', 'dev')
app = create_app('server.settings.%sConfig' % env.capitalize())

manager = Manager(app)
manager.add_command("server", Server(host='0.0.0.0', port=os.getenv('PORT', 5000)))
manager.add_command("show-urls", ShowUrls())
manager.add_command("clean", Clean())


@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """

    return dict(app=app, db=db, es=es, User=User, Portfolio=Portfolio, MockTimeSeries=MockTimeSeries)


@manager.command
def createdb():
    """ Creates a database with all of the tables defined in
        your SQLAlchemy models
    """

    db.create_all()
    directory = os.path.join('.', 'initdata', 'timeseries')
    for root, dirs, files in os.walk(directory):
        for file in files:
            symbol = file.split('.')[0]
            with open(os.path.join(root, file), 'r') as f:
                reader = csv.reader(f)
                next(reader, None)
                for row in reader:
                    mock = MockTimeSeries(symbol, *row)
                    db.session.add(mock)
                    db.session.flush()
                db.session.commit()

    with open(os.path.join('.', 'initdata', 'portfolio', 'mock_portfolio.csv')) as f:
        reader = csv.reader(f)
        for row in reader:
            amount = random.randint(100, 500)
            symbol, company, industry = row
            portfolio = Portfolio(symbol, company, industry, 100*amount, MockTimeSeries.query.filter_by(symbol=row[0].lower()).order_by('time').all()[0].close)
            print(portfolio.symbol)
            db.session.add(portfolio)
            db.session.commit()


if __name__ == "__main__":
    manager.run()
