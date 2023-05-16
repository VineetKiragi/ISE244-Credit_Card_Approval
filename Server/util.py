import json
import pickle
import numpy as np

__income=None
__education=None
__family=None
__housing=None
__occupation=None
__data_columns=None
__model =None

def get_estimated_price(Gender,Own_car,Own_property,Unemployed,Num_children,Num_family,Account_length,Total_income,Age,Years_employed,
                        Income_type,Education_type,Family_status,Housing_type,Occupation_type):
    try:
        income_index = __data_columns.index(Income_type.lower())
    except:
        income_index=-1

    try:
        education_index = __data_columns.index(Education_type.lower())
    except:
        education_index=-1

    try:
        family_index = __data_columns.index(Family_status.lower())
    except:
        family_index=-1

    try:
        housing_index = __data_columns.index(Housing_type.lower())
    except:
        housing_index=-1
    
    try:
        occupation_index = __data_columns.index(Occupation_type.lower())
    except:
        occupation_index=-1
    load_saved_artifacts()
    print("load saved return")
    xyz = np.zeros(len(__data_columns))
    xyz[0] = Gender
    xyz[1] = Own_car
    xyz[2] = Own_property
    xyz[3] = Unemployed
    xyz[4] = Num_children
    xyz[5] = Num_family
    xyz[6] = Account_length
    xyz[7] = Total_income
    xyz[8] = Age
    xyz[9] = Years_employed
    if income_index >= 0:
        xyz[income_index] = 1
    if education_index >= 0:
        xyz[education_index] = 1
    if family_index >= 0:
        xyz[family_index] = 1
    if housing_index >= 0:
        xyz[housing_index] = 1
    if occupation_index >= 0:
        xyz[occupation_index] = 1
    print("before return")
    return round(__model.predict([xyz])[0],2)

  
def get_location_names():
    load_saved_artifacts()
    return __income

def get_education_names():
    load_saved_artifacts()
    return __education

def get_family_names():
    load_saved_artifacts()
    return __family

def get_housing_names():
    load_saved_artifacts()
    return __housing

def get_occupation_names():
    load_saved_artifacts()
    return __occupation

def load_saved_artifacts():
    print('loading saved artifacts......start')
    global __data_columns
    global __income
    global __education
    global __family
    global __housing
    global __occupation

    with open("./artifacts/columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __income=__data_columns[10:15]
        __education=__data_columns[15:19]
        __family=__data_columns[20:24]
        __housing=__data_columns[25:30]
        __occupation=__data_columns[31:49]

    global __model
    with open('./artifacts/credit_card_prediction.pickle','rb') as f:
        __model=pickle.load(f)

    print('loading saved artifacts....done ')
if __name__=="__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price(1,1,0,0,0,2,25,130500.0,29.210730,3.210730,
               'Working','Incomplete higher','Married','House / apartment','Accountants'))
    print(get_estimated_price(1,1,1,0,0,2,5,270000.0,46.193967,2.105450,
               'Working','Higher education','Married','House / apartment','Accountants'))
    