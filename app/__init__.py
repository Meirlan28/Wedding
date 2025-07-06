from flask import Flask
from config import Config
from .extensions import db, migrate
from dotenv import load_dotenv
from .routes import bp as routes_bp

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(routes_bp)

    # 🔥 ВАЖНО: импорт моделей внутри функции
    from . import models

    return app
