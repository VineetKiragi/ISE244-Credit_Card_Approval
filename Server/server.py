from flask import Flask,request,jsonify
import util
from flask_cors import CORS,cross_origin


app = Flask(__name__)
CORS(app)



@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response=jsonify({
        'income': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow_origin','*')
    return response

@app.route('/get_education_names', methods=['GET'])
def get_education_names():
    response=jsonify({
        'education': util.get_education_names()
    })
    response.headers.add('Access-Control-Allow_origin','*')
    return response

@app.route('/get_family_names', methods=['GET'])
def get_family_names():
    response=jsonify({
        'family': util.get_family_names()
    })
    response.headers.add('Access-Control-Allow_origin','*')
    return response

@app.route('/get_housing_names', methods=['GET'])
def get_housing_names():
    response=jsonify({
        'housing': util.get_housing_names()
    })
    response.headers.add('Access-Control-Allow_origin','*')
    return response

@app.route('/get_occupation_names', methods=['GET'])
def get_occupation_names():
    response=jsonify({
        'occupation': util.get_occupation_names()
    })
    response.headers.add('Access-Control-Allow_origin','*')
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    print('inside server')
    Gender = int(request.form['Gender'])
    if Gender==2:
        Gender=0
    Own_car = int(request.form['Own_car'])
    Own_property = int(request.form['Own_property'])
    Unemployed = int(request.form['Unemployed'])
    Num_children=int(request.form['Num_children'])
    Num_family = int(request.form['Num_family'])
    Account_length = float(request.form['Account_length'])
    Total_income = float(request.form['Total_income'])
    Age = float(request.form['Age'])
    Years_employed = float(request.form['Years_employed'])
    Income_type = request.form['Income_type']
    Education_type = request.form['Education_type']
    Family_status = request.form['Family_status']
    Housing_type = request.form['Housing_type']
    Occupation_type = request.form['Occupation_type']
    estprice=util.get_estimated_price(Gender,Own_car,Own_property,Unemployed,Num_children,Num_family,Account_length,
                   Total_income,Age,Years_employed,Income_type,Education_type,Family_status,Housing_type,Occupation_type)
    print(Gender)
    approval="none"
    if Gender==0:
        approval="Rejected"
    elif Gender==1:
        approval="Approved"
    response = jsonify({
        'estimated_price': approval
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
if __name__=="__main__":
    print('Starting Python Server for Credit Card Prediction')
    app.run()

