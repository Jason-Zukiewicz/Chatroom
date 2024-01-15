from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import abort
from sqlalchemy import and_
import os
from datetime import datetime
from models import db, Category, Purchase	

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# -------------------------------------------------------- [ DataBase ] -----------------------------------------------#
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(app.root_path, 'budget.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = 'dev key'
app.config.from_object(__name__)
db.init_app(app)

@app.cli.command('initdb')
def initdb_command():
	db.drop_all()
	db.create_all()
	print('Initialized the database.')

# -------------------------------------------- [ Cats ] ------------------------------------------------- #
@app.route("/cats/",methods=["GET"])
def cats_get():
	lst = Category.query.all()
	return cat_list_to_dict(lst)

@app.route("/cats/",methods=["POST"])
def cats_post():
	req_data = request.get_json()
	if valid_name(req_data["name"]):
		
		try:
			budget = float(req_data["budget"])
		except:
			budget = None
		newCat = Category(name=req_data["name"], budget=budget)
		db.session.add(newCat)
		db.session.commit()
	return {newCat.id: cat_list_to_dict(newCat)}, 201 
	
#TODO: Ideally, delete purchases with category
@app.route("/cats/<catID>", methods=["DELETE"])
def cat_delete(catID=None):
	abort_if_cat_doesnt_exist(catID)
	cat = Category.query.filter_by(id=catID).first()
	db.session.delete(cat)
	db.session.commit()
	return "", 204

#TODO: Return in Ascending Order of ID
@app.route("/cats/<catID>", methods=["GET"])
def cat_get(catID=None):
	abort_if_cat_doesnt_exist(catID)
	cat = Category.query.filter_by(id=catID).first()
	return cat_list_to_dict(cat)

def abort_if_cat_doesnt_exist(catID):
	if Category.query.filter_by(id=catID).first() is None:
		abort(404)

# -------------------------------------------- [ PURS ] ------------------------------------------------- #
@app.route("/purs/",methods=["GET"])
def purs_get():
	purchases = Purchase.query.order_by(Purchase.date.desc(), Purchase.id.desc()).all()	
	return pur_list_to_dict(purchases)

@app.route("/purs/",methods=["POST"])
def purs_post():
	req_data = request.get_json()
	newPur = Purchase(req_data["name"],req_data["amount"],req_data["date"],req_data["cat"])
	db.session.add(newPur)
	db.session.commit() 
	check_budget(req_data["date"], req_data["cat"])
	return {newPur.id: pur_list_to_dict(newPur)}, 201
	
@app.route("/purs/<purID>", methods=["DELETE"])
def pur_delete(purID=None):
	abort_if_pur_doesnt_exist(purID)
	pur = Purchase.query.filter_by(id=purID).first()
	db.session.delete(pur)
	db.session.commit()
	return "", 204

#TODO: Return in decending Order of date 
@app.route("/purs/<purID>", methods=["GET"])
def pur_get(purID=None):
	abort_if_pur_doesnt_exist(purID)
	pur = Purchase.query.filter_by(id=purID).first()
	return cat_list_to_dict(pur)

def abort_if_pur_doesnt_exist(purID):
	if Purchase.query.filter_by(id=purID).first() is None:
		abort(404)

# -------------------------------------------- [ Functions ] ------------------------------------------------- #
#TODO: THeses dont work as intended
def cat_list_to_dict(lst):
	dict = {}
	for item in Category.query.all():
		dict[item.id] = {"name":item.name , "budget":item.budget}
	return dict

#TODO: THeses dont work as intended
def pur_list_to_dict(lst):
	dict = {}
	purchases = Purchase.query.order_by(Purchase.date.desc(), Purchase.id.desc()).all()	
	for item in purchases:
		dict[item.id] = {"name":item.name , "amount":item.amount, "date":item.date, "cat":item.category, "over":item.over}
	return dict

def valid_name(name):
	if Category.query.filter_by(name=name).first() is not None:
		return False
	return True


def check_budget(date, category):
	cat = Category.query.filter_by(name=category).first()
	if cat.budget is None :
		return
	purs = Purchase.query.filter(
					and_(
						Purchase.date.ilike(f"%{date[:7]}%"),
						category == cat.name
					)
				)
	amount = 0
	for pur in purs:
		amount += pur.amount
		if amount > cat.budget:
			print(f"{pur.name} is over budget of {cat.budget}")
			Purchase.query.filter_by(id=pur.id).update({"over":True})
	db.session.commit()


# -------------------------------------------- [ OLD ] ------------------------------------------------- #
if __name__ == "__main__":
	app.run(debug=True)