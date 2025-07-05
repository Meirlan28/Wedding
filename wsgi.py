from app import create_app 
import os
from app.routes import bp as routes_bp


app = create_app()


# if __name__ == '__main__':
#     app.run(debug=True)
