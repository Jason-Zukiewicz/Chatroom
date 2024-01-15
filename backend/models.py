from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()

# ----------------------------------------- [ Category ]----------------------------------------- #
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(24), nullable=False, unique=True)
    budget = db.Column(db.Integer)

    def __init__(self, name, budget):
        self.name = name
        self.budget = budget

    def __repr__(self):
        return '<Category {}>'.format(self.name)

# ----------------------------------------- [ Purchase ]----------------------------------------- #
class Purchase(db.Model):
    id = db.Column(db.Integer,     primary_key=True)
    name = db.Column(db.String(24),  nullable=False)
    amount = db.Column(db.Integer,     nullable=False)
    date = db.Column(db.String(24),  nullable=False)
    category = db.Column(db.Integer,     nullable=False)
    over = db.Column(db.Boolean,     nullable=False)

    def __init__(self, name, amount, date, category):
        self.name = name
        self.amount = amount
        self.date = date
        self.category = category
        self.over = False

    def __repr__(self):
        return '<Purchase {}>'.format(self.desc)
