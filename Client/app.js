function getGenderValue() {
    var uiGender = document.getElementsByName("uiGender");
    for(var i in uiGender) {
      if(uiGender[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
}
  
function getCarOwnerValue() {
    var uiCarOwner = document.getElementsByName("uiCarOwner");
    for(var i in uiCarOwner) {
      if(uiCarOwner[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
}

function getPOValue() {
    var uiPO = document.getElementsByName("uiPO");
    for(var i in uiPO) {
      if(uiPO[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
}
function getempValue() {
    var uiemp = document.getElementsByName("uiemp");
    for(var i in uiemp) {
      if(uiemp[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
}


  
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var Gender = getGenderValue();
    var CarOwner = getCarOwnerValue();
    var PO = getPOValue();
    var emp = getempValue();
    var child = document.getElementById("uichild");
    var fam = document.getElementById("uifam");
    var acc = document.getElementById("uiacc");
    var income = document.getElementById("uiincome");
    var age = document.getElementById("uiage");
    var yemp = document.getElementById("uiyemp");
    var incometype = document.getElementById("uiIncome");
    var education = document.getElementById("uiEducation");
    var relationship = document.getElementById("uiRelationship");
    var housing= document.getElementById("uiHousing");
    var occupation = document.getElementById("uiOccupation");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        Gender: Gender,
        Own_car: CarOwner,
        Own_property: PO,
        Unemployed: emp,
        Num_children: parseFloat(child.value),
        Num_family: parseFloat(fam.value),
        Account_length: parseFloat(acc.value),
        Total_income: parseFloat(income.value),
        Age: parseFloat(age.value),
        Years_employed: parseFloat(yemp.value),
        Income_type: incometype.value,
        Education_type: education.value,
        Family_status: relationship.value,
        Housing_type: housing.value,
        Occupation_type: occupation.value

    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "</h2>";
        console.log(status);
    });
}
  
function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var income = data.income;
            console.log(data.income)
            var uiIncome = document.getElementById("uiIncome");
            $('#uiLocations').empty();
            for(var i in income) {
                var opt = new Option(income[i]);
                $('#uiIncome').append(opt);
            }
        }
    });
    var url = "http://127.0.0.1:5000/get_education_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var education = data.education;
            console.log(data.education)
            var uiEducation = document.getElementById("uiEducation");
            $('#uiEducation').empty();
            for(var i in education) {
                var opt = new Option(education[i]);
                $('#uiEducation').append(opt);
            }
        }
    });
    var url = "http://127.0.0.1:5000/get_family_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var family = data.family;
            console.log(data.family)
            var uiRelationship = document.getElementById("uiRelationship");
            $('#uiRelationship').empty();
            for(var i in family) {
                var opt = new Option(family[i]);
                $('#uiRelationship').append(opt);
            }
        }
    });
    var url = "http://127.0.0.1:5000/get_housing_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var housing = data.housing;
            console.log(data.housing)
            var uiHousing = document.getElementById("uiHousing");
            $('#uiHousing').empty();
            for(var i in housing) {
                var opt = new Option(housing[i]);
                $('#uiHousing').append(opt);
            }
        }
    });
    var url = "http://127.0.0.1:5000/get_occupation_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var occupation = data.occupation;
            console.log(data.occupation)
            var uiOccupation = document.getElementById("uiOccupation");
            $('#uiOccupation').empty();
            for(var i in occupation) {
                var opt = new Option(occupation[i]);
                $('#uiOccupation').append(opt);
            }
        }
    });
  } 
  
window.onload = onPageLoad;