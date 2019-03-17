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


class Trade(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    final_price = db.Column(db.Float())
    amount = db.Column(db.Integer)


class StockMeta(db.Model):
    symbol = db.Column(db.String(), primary_key=True)
    company = db.Column(db.String())
    industry = db.Column(db.String())
    country = db.Column(db.String())
    description = db.Column(db.String())


class Portfolio(db.Model):
    id = db.Column(db.Integer(), primary_key=True)


class SearchHistory(db.Model):
    query = db.Column(db.String(), primary_key=True)
    last = db.Column(db.DateTime())
    results = db.Column(db.String())
