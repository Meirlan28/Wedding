from .extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(64), unique=True, nullable=False)
    attendance = db.Column(db.String(64), nullable=False)
    guestCount = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        return f'<User {self.fullname}>'
