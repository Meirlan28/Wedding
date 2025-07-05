from flask import Flask, render_template, request, redirect, session, url_for
from flask import Blueprint, jsonify
from app.models import User
from app import db
from sqlalchemy.exc import IntegrityError
import os

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        fullname = request.form['guestName']
        attendance = request.form['attendance']
        guestCount = request.form['guestCount']

        new_user = User(
            fullname=fullname,
            attendance=attendance,
            guestCount=int(guestCount)
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'success': True})
        except IntegrityError:
            db.session.rollback()
            error_message = "Пользователь с таким именем уже зарегистрирован."
            return jsonify({'success': False, 'error': error_message})

    return render_template('index.html')


@bp.route('/admin/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['user'] = username
            return redirect(url_for('main.admin'))
        else:
            error = 'Неверный логин или пароль'
    return render_template("admin/login.html", error=error)

@bp.route('/admin')
def admin():
    if 'user' not in session:
        return redirect(url_for('main.login'))
    guests = User.query.all()  # Получаем всех гостей из базы
    return render_template("admin/admin.html", username=session['user'], guests=guests)

@bp.route('/admin/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('main.login'))
