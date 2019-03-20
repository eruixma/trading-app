from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, AnonymousUserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())
    balance = db.Column(db.Float())

    def __init__(self, username, password):
        self.username = username
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, value):
        return check_password_hash(self.password, value)

    @property
    def is_authenticated(self):
        if isinstance(self, AnonymousUserMixin):
            return False
        else:
            return True

    def is_active(self):
        return True

    def is_anonymous(self):
        if isinstance(self, AnonymousUserMixin):
            return True
        else:
            return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<User %r>' % self.username


class Portfolio(db.Model):
    symbol = db.Column(db.String(), primary_key=True)
    company = db.Column(db.String())
    industry = db.Column(db.String())
    amount = db.Column(db.Integer())
    costPrice = db.Column(db.Float())

    def __init__(self, symbol, company, industry, amount, costPrice):
        self.symbol = symbol
        self.company = company
        self.industry = industry
        self.amount = amount
        self.costPrice = costPrice


class MockTimeSeries(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    symbol = db.Column(db.String())
    time = db.Column(db.String())
    open = db.Column(db.Float())
    high = db.Column(db.Float())
    low = db.Column(db.Float())
    close = db.Column(db.Float())
    volume = db.Column(db.Float())

    def __init__(self, symbol, time, open, high, low, close, volume):
        self.symbol = symbol
        self.time = time
        self.open = open
        self.high = high
        self.low = low
        self.close = close
        self.volume = volume
