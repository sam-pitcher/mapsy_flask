from flask import Flask, url_for, redirect
# from flask_login import LoginManager, UserMixin
from flask_bootstrap import Bootstrap

# users = {'foo@bar.tld': {'password': 'secret'}}

# class User(UserMixin):
#     pass

app = Flask(__name__)
app.secret_key = b'changeme'
bootstrap = Bootstrap(app)

import routes

# login_manager = LoginManager()
# login_manager.init_app(app)

# @login_manager.user_loader
# def user_loader(username):
#     # if username not in users:
#     #     return

#     user = User()
#     user.id = username
#     return user

# @login_manager.unauthorized_handler
# def unauthorized_handler():
#     # return('unauthorized')
#     return redirect(url_for('login'))

if __name__ == "__main__":
    # app.run(host='127.0.0.1', port=8080, debug=True)
    app.run()