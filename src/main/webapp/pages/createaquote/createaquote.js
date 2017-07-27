Application.$controller("createaquotePageController", ["$scope", function($scope) {
    "use strict";
    $scope.amount = 0;
    var policydetails, agentdetails, selectedpolicydetails;
    var isNominee = false;
    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {

        document.title = "Create a Policy";
        var navpath = $scope.Variables.goToPage_createapolicy.getData();
        $scope.Widgets.container_confirmation.show = false;
        $scope.pageDetails = $scope.Variables.PolicyDetails.dataSet;
        debugger;
        if ($scope.pageDetails.navpath === "dashboard") {

            var amountlabel = parseInt($scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid);
            $scope.Variables.PremiumAmount.dataSet.dataValue = amountlabel;
            $scope.Variables.CreateQuoteData.dataSet.applicationid = $scope.Variables.GetCreateQuoteData.dataBinding.ApplicationID;
            $scope.Widgets.container_confirmation.show = true;
            if ($scope.Variables.GetCreateQuoteData.dataSet.Nominees.length === 0) {
                isNominee = false;
                $scope.Widgets.btn_step3next.disabled = true;
                $scope.Variables.Editableform.dataSet.btn_step3continuecaption = "Save & Continue";
            } else {
                isNominee = true;
                $scope.Widgets.btn_step3next.disabled = false;
                $scope.Variables.Editableform.dataSet.btn_step3continuecaption = "Update";
            }
            $scope.$root.refreshBC($scope.activePageName, "Create a Policy", false);
        } else {
            debugger;
            $scope.Widgets.container_confirmation.show = false;
            $scope.Variables.GetCreateQuoteData.dataSet = {};
            $scope.$root.refreshBC($scope.activePageName, "Create a Policy", true);
        }
        debugger;
        agentdetails = $scope.Variables.GetAgentID.dataSet;
        console.log(agentdetails);
        policydetails = $scope.Variables.GetPolicyID.getData();
        $scope.Variables.GetPolicyID.setInput("name", $scope.pageDetails.policyname);
        $scope.Variables.GetPolicyID.update({}, function(data) {
            $scope.Variables.PolicyDetails.dataSet.policyid = data.UniquePolicyId;
            // policydetails = data;
            console.log(policydetails);
        });

        // console.log("Get Policy details" + policydetails);
        console.log(policydetails);
    };


    $scope.form_createquoteSubmit = function($event, $isolateScope, $formData) {
        $scope.Widgets;
        $isolateScope;
        $formData;
        debugger;
        if ($scope.Widgets.container_confirmation.show === true) {
            if ($scope.Widgets.btn_continue.caption === "Update") {
                $scope.updateCreateQuote("client");
            } else if ($scope.Widgets.btn_continue.caption === "Continue") {
                $scope.Widgets.createapolicywizard.next();
                window.scrollTo(0, 0);
            }

            // $scope.Widgets.createapolicywizard.next();
        } else {
            return;
        }
    };
    $scope.CalculatePremium = function(sumassured, age, gender, term, tobacco) {
        debugger;
        var SumAssured = sumassured,
            CA = 0,
            CG = 0,
            CS = 0,
            CT = 0,
            CTO = 0;
        var Age = moment().diff(moment(age, 'MM-DD-YYYY'), 'years');
        if (Age >= 18 && Age <= 25) {
            // age_range = "18-25";
            CA = parseFloat(0.80);
        } else if (Age >= 26 && Age <= 39) {
            // age_range = "26-39";
            CA = parseFloat(1.50);
        } else if (Age >= 40 && Age <= 65) {
            // age_range = "40-65";
            CA = parseFloat(2.20);
        } else {
            $scope.showToaster("IncorrectAge");
            return;
        }
        if (gender === "Male") {
            CG = parseFloat(1.10);
        } else if (gender === "Female") {
            CG = parseFloat(0.88);
        }
        // var sumassurednumber = parseFloat(SumAssured.replace(/\$|,/g, ''));
        var sumassurednumber = sumassured;
        if (sumassurednumber >= 50000 && sumassurednumber <= 500000) {
            CS = parseFloat(0.0040);
        } else if (sumassurednumber > 500000 && sumassurednumber < 1000000) {
            CS = parseFloat(0.0020);
        } else if (sumassurednumber >= 1000000 && sumassurednumber <= 2000000) {
            CS = parseFloat(0.0007);
        }
        // var termduration = $scope.Widgets.select_Term.datavalue.replace(' Years', '');
        var termduration = term;
        if (termduration >= 5 && termduration < 10) {
            CT = parseFloat(0.70);
        } else if (termduration >= 10 && termduration < 18) {
            CT = parseFloat(0.85);
        } else if (termduration >= 18 && termduration <= 25) {
            CT = parseFloat(1.20);
        }
        if (tobacco === "Yes") {
            CTO = parseFloat(1.00);
        } else if (tobacco === "No") {
            CTO = parseFloat(0.92);
        }
        console.log(SumAssured + " " + CA + " " + " " + CG + " " + CS + " " + CT + " " + CTO);
        var AnnualPremium = 0;

        AnnualPremium = parseFloat(sumassurednumber * CA * CG * CS * CT * CTO).toFixed(2);
        $scope.amount = Number(Math.round(Math.round(AnnualPremium * 100) / 100));
        $scope.Variables.PremiumAmount.dataSet.dataValue = $scope.amount;
        debugger;
        // $scope.Widgets.amountlabel.caption = '$ ' + $scope.amount;
        if (!Number.isNaN($scope.amount)) {
            $scope.Widgets.container_confirmation.show = true;
        }

        // $scope.Widgets.btn_continue.disabled = false;
        // console.log(AnnualPremium);
        $scope.Variables.CreateQuoteData.dataSet.dateofbirth = age;
        $scope.Variables.CreateQuoteData.dataSet.state = "";
        $scope.Variables.CreateQuoteData.dataSet.gender = gender;
        $scope.Variables.CreateQuoteData.dataSet.tobacco = tobacco;
        $scope.Variables.CreateQuoteData.dataSet.cover = sumassurednumber;
        $scope.Variables.CreateQuoteData.dataSet.term = termduration;
        $scope.Variables.CreateQuoteData.dataSet.sumassured = AnnualPremium;


        // $scope.Variables.CreateQuoteData.setData({
        //     "dateofbirth": age,
        //     "state": "",
        //     "gender": gender,
        //     "tobacco": tobacco,
        //     "cover": sumassurednumber,
        //     "term": termduration,
        //     "sumassured": AnnualPremium,
        //     "applicationid": ""
        // });

        console.log($scope.Variables.CreateQuoteData.dataSet);
        // $scope.Widgets.createapolicywizard.next();
    };

    function nFormatter(num, digits) {
        var si = [{
                value: 1E18,
                symbol: "E"
            }, {
                value: 1E15,
                symbol: "P"
            }, {
                value: 1E12,
                symbol: "T"
            }, {
                value: 1E9,
                symbol: "B"
            }, {
                value: 1E6,
                symbol: "M"
            }, {
                value: 1E3,
                symbol: "k"
            }],
            rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
            i;
        for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
                return ((num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);
            }
        }
        //  return num.toFixed(digits).replace(rx, "$1");
    };
    $scope.showToaster = function(variableName) {
        $scope.Variables[variableName].notify();
    };
    $scope.switch_gender_customerdetailsChange = function($event, $isolateScope, newVal, oldVal) {
        debugger;
        if ($scope.Variables.CreateQuoteData.dataSet.gender != $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue) {
            $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
        }
    };
    $scope.dob_dateChange = function($event, $isolateScope, newVal, oldVal) {
        debugger;
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };


    $scope.select_state_createquoteChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };


    $scope.switch_gender_createquoteChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
        $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue = $scope.Widgets.switch_gender_createquote_formWidget.datavalue;
    };


    $scope.switch_tobaccoChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };


    $scope.select_TermChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };


    $scope.select_coverChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };


    $scope.btn_nextClick = function($event, $isolateScope) {
        $scope.Widgets.createapolicywizard.next();
        window.scrollTo(0, 0);
    };

    $scope.form_customerdetailsSubmit = function($event, $isolateScope, $formData) {
        if ($scope.Widgets.btn_step2continue.caption === "Update") {
            $scope.updateCreateQuote("client");
        } else if ($scope.Widgets.btn_step2continue.caption === "Save & Continue") {
            $scope.InsertCustomerDetails();
        }


    };
    $scope.InsertCustomerDetails = function() {
        debugger;
        console.log($scope.Variables.loggedInUser.dataSet.id);
        if ($scope.Variables.CreateQuoteData.dataSet.applicationid == null || $scope.Variables.CreateQuoteData.dataSet.applicationid == '') {
            var personalRequestBody = {
                "userName": $scope.Widgets.txt_firstname_formWidget.datavalue + $scope.Widgets.txtlastname_formWidget.datavalue,
                "password": "client1",
                "client": {
                    "emailId": $scope.Widgets.txtemail_formWidget.datavalue,
                    "dateOfBirth": $scope.Variables.CreateQuoteData.dataSet.dateofbirth,
                    "clientName": $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue,
                    "maritalStatus": $scope.Widgets.select_maritalstatus_formWidget.datavalue,
                    "noOfChildren": parseInt($scope.Widgets.select_childrens_formWidget.datavalue),
                    "nationality": "American",
                    "gender": $scope.Variables.CreateQuoteData.dataSet.gender === $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue ? $scope.Variables.CreateQuoteData.dataSet.gender : $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue,
                    "mobileNumber": $scope.Widgets.txt_mobile_formWidget.datavalue,
                    "phoneNumber": $scope.Widgets.txt_phone_formWidget.datavalue,
                    "qualification": $scope.Widgets.select_qualification_formWidget.datavalue,
                    "company": $scope.Widgets.txt_company_formWidget.datavalue,
                    "occupationalHazards": $scope.Widgets.select_occupationhazards_formWidget.datavalue,
                    "annualIncome": parseInt($scope.Widgets.txt_assuredincome_formWidget.datavalue),
                    "occupation": $scope.Widgets.select_occupation_formWidget.datavalue
                },
                "address": {
                    "addressType": $scope.Widgets.select_addresstype_formWidget.datavalue,
                    "addressLine1": $scope.Widgets.txtaddress1_formWidget.datavalue,
                    "addressLine2": $scope.Widgets.txtaddress2_formWidget.datavalue,
                    "zip": $scope.Widgets.txt_zip_formWidget.datavalue,
                    "stateId": $scope.Widgets.select_state_formWidget.datavalue,
                    "country": $scope.Widgets.select_country_formWidget.datavalue
                },
                "clientDetails": {
                    "agentId": agentdetails.AgentId,
                    "uniquePolicyId": $scope.pageDetails.policyid,
                    "sumAssured": parseInt($scope.Variables.CreateQuoteData.dataSet.cover),
                    "policyId": "",
                    "premiumToBePaid": $scope.Variables.CreateQuoteData.dataSet.sumassured,
                    "premiumType": "yearly",
                    "tobaccoIntake": $scope.Variables.CreateQuoteData.dataSet.tobacco,
                    "term": parseInt($scope.Variables.CreateQuoteData.dataSet.term),
                    "updatedBy": $scope.Variables.loggedInUser.dataSet.id
                }
            };
            console.log(personalRequestBody);
            debugger;
            $scope.Variables.InsertCreateQuotePersonal.setInput("RequestBody", personalRequestBody);
            $scope.Variables.InsertCreateQuotePersonal.update({}, function(data) {
                $scope.Widgets;
                console.log(data);
                debugger;
            });
        } else {
            $scope.updateCreateQuote("client");
        }
    };

    $scope.InsertCreateQuotePersonalonSuccess = function(variable, data) {
        debugger;
        $scope.showToaster("ApplicationIDCreated");
        $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
        $scope.Widgets.createapolicywizard.next();
        window.scrollTo(0, 0);
    };


    $scope.InsertCreateQuotePersonalonError = function(variable, data) {
        $scope.showToaster("ApplicationIDNotCreated");
    };


    $scope.btn_editClick = function($event, $isolateScope) {
        $scope.Widgets;
        debugger;
        $scope.Variables.Editableform.dataSet.createquote = false;
        $scope.Variables.Editableform.dataSet.customerdetails = true;
        $scope.Variables.Editableform.dataSet.proposaldetails = true;

    };
    $scope.updateCreateQuote = function(updatetype) {
        // var appid = $scope.Variables.GetCreateQuoteData.dataBinding.ApplicationID;
        var appid = $scope.Variables.CreateQuoteData.dataSet.applicationid;
        var clientRequestBody = {};
        if (updatetype === "client") {
            clientRequestBody = {
                "emailId": $scope.Widgets.txtemail_formWidget.datavalue,
                "dateOfBirth": $scope.Widgets.dob_date_formWidget.datavalue,
                "clientName": $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue,
                "maritalStatus": $scope.Widgets.select_maritalstatus_formWidget.datavalue,
                "noOfChildren": parseInt($scope.Widgets.select_childrens_formWidget.datavalue),
                "nationality": "American",
                "gender": $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue,
                "mobileNumber": $scope.Widgets.txt_mobile_formWidget.datavalue,
                "phoneNumber": $scope.Widgets.txt_phone_formWidget.datavalue,
                "qualification": $scope.Widgets.select_qualification_formWidget.datavalue,
                "company": $scope.Widgets.txt_company_formWidget.datavalue,
                "occupationalHazards": $scope.Widgets.select_occupationhazards_formWidget.datavalue,
                "annualIncome": parseInt($scope.Widgets.txt_assuredincome_formWidget.datavalue),
                "occupation": $scope.Widgets.select_occupation_formWidget.datavalue,
                "sumAssured": parseInt($scope.Widgets.select_cover_formWidget.datavalue),
                "premiumToBePaid": parseInt($scope.Widgets.amountlabel.caption.replace(/[^0-9\.]+/g, "")), //parseInt($scope.Widgets.amountlabel.caption.replace("$", '')),
                "tobaccoIntake": $scope.Widgets.switch_tobacco_formWidget.datavalue,
                "term": parseInt($scope.Widgets.select_Term_formWidget.datavalue),
                "addressType": $scope.Widgets.select_addresstype_formWidget.datavalue,
                "addressLine1": $scope.Widgets.txtaddress1_formWidget.datavalue,
                "addressLine2": $scope.Widgets.txtaddress2_formWidget.datavalue,
                "zip": $scope.Widgets.txt_zip_formWidget.datavalue,
                "stateId": $scope.Widgets.select_state_formWidget.datavalue,
                "country": $scope.Widgets.select_country_formWidget.datavalue,
                "updatedBy": $scope.Variables.loggedInUser.dataSet.id
            };
            console.log(appid);
            console.log(clientRequestBody);
        } else if (updatetype === "nominees") {
            clientRequestBody = {
                "firstName": $scope.Widgets.txt_nomineeFirstname_formWidget.datavalue,
                "lastName": $scope.Widgets.txt_nomineelastname_formWidget.datavalue,
                "relationship": $scope.Widgets.select_nomineerelation_formWidget.datavalue,
                "entilementPercentage": $scope.Widgets.txt_EntitlementPercentage_formWidget.datavalue,
                "dateOfBirth": $scope.Widgets.dob_nominee_formWidget.datavalue,
                "mobileNumber": $scope.Widgets.txt_nomineemobile_formWidget.datavalue,
                "phoneNumber": $scope.Widgets.txt_nomineephone_formWidget.datavalue,
                "addressLine1": $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue,
                "addressLine2": $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue,
                "zip": $scope.Widgets.txt_nomineezip_formWidget.datavalue,
                "stateId": $scope.Widgets.select_nomineestate_formWidget.datavalue,
                "country": $scope.Widgets.select_nomineecountry_formWidget.datavalue,
                "height": parseInt($scope.Widgets.txt_height_formWidget.datavalue),
                "weight": parseInt($scope.Widgets.txt_weight_formWidget.datavalue),
                "changeInWeight": $scope.Widgets.select_weightchange_formWidget.datavalue
            };
        }
        console.log(clientRequestBody);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("updatetype", updatetype);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("applicationid", appid);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("RequestBody", clientRequestBody);
        $scope.Variables.UpdateCreateQuoteDetails.update({}, function(data) {
            $scope.Variables;
            $scope.Widgets;
            $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
            $scope.Variables.GetCreateQuoteData.update();
            debugger;

        });
    };

    $scope.btn_step2editClick = function($event, $isolateScope) {
        debugger;
        $scope.Variables.Editableform.dataSet.createquote = true;
        $scope.Variables.Editableform.dataSet.customerdetails = false;
        $scope.Variables.Editableform.dataSet.proposaldetails = true;

        // $scope.Widgets.btn_step2continue.caption = "Update";
    };

    $scope.btn_step3editClick = function($event, $isolateScope) {
        $scope.Variables.Editableform.dataSet.createquote = true;
        $scope.Variables.Editableform.dataSet.customerdetails = true;
        $scope.Variables.Editableform.dataSet.proposaldetails = false;
    };
    $scope.btn_cancelClick = function($event, $isolateScope) {
        $scope.Variables.goToPage_Dashboard.navigate();
    };


    $scope.btn_step2cancelClick = function($event, $isolateScope) {
        $scope.Widgets.createapolicywizard.prev();
    };


    $scope.UpdateCreateQuoteDetailsonError = function(variable, data) {

        $scope.showToaster("ApplicationIDNotCreated");
        // $scope.Widgets.createapolicywizard.next()
    };


    $scope.UpdateCreateQuoteDetailsonSuccess = function(variable, data) {
        $scope.showToaster("ApplicationupdatedSuccess");
        $scope.Widgets.createapolicywizard.next();
        window.scrollTo(0, 0);
    };


    $scope.InsertNomineeDetails = function() {
        var appid = $scope.Variables.CreateQuoteData.dataSet.applicationid;
        debugger;
        console.log(appid);
        var NomineeRequestBody = {
            // "applicationId": $scope.Variables.CreateQuoteData.dataSet.applicationid,
            "applicationId": appid,
            "relationship": $scope.Widgets.select_nomineerelation_formWidget.datavalue,
            "stateId": $scope.Widgets.select_nomineestate_formWidget.datavalue,
            "entilementPercentage": $scope.Widgets.txt_EntitlementPercentage_formWidget.datavalue,
            "phoneNumber": $scope.Widgets.txt_nomineephone_formWidget.datavalue,
            "firstName": $scope.Widgets.txt_nomineeFirstname_formWidget.datavalue,
            "mobileNumber": $scope.Widgets.txt_nomineemobile_formWidget.datavalue,
            "zip": $scope.Widgets.txt_nomineezip_formWidget.datavalue,
            "lastName": $scope.Widgets.txt_nomineelastname_formWidget.datavalue,
            "dateOfBirth": $scope.Widgets.dob_nominee_formWidget.datavalue,
            "country": $scope.Widgets.select_nomineecountry_formWidget.datavalue,
            "addressLine1": $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue,
            "addressLine2": $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue,
            "client": {
                "weight": $scope.Widgets.txt_weight_formWidget.datavalue,
                "height": $scope.Widgets.txt_height_formWidget.datavalue,
                "changeInWeight": $scope.Widgets.select_weightchange_formWidget.datavalue
            }
        };


        $scope.Variables.InsertCreateQuoteNominee.setInput("RequestBody", NomineeRequestBody);
        $scope.Variables.InsertCreateQuoteNominee.update({}, function(data) {
            $scope.Widgets;
            console.log(data);
            debugger;
        });

        // console.log(personalRequestBody);

    };

    $scope.form_proposaldetailsSubmit = function($event, $isolateScope, $formData) {
        debugger;
        if ($scope.Widgets.btn_step3continue.caption === "Update") {
            $scope.updateCreateQuote("nominees");
        } else if ($scope.Widgets.btn_step3continue.caption === "Save & Continue") {
            $scope.InsertNomineeDetails();
        }
    };


    $scope.InsertCreateQuoteNomineeonSuccess = function(variable, data) {
        debugger;
        $scope.showToaster("Applicationupdated");
        // $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.GetCreateQuoteData.update({}, function(data) {
            console.log(data);
            debugger;
            $scope.Widgets.createapolicywizard.next();
            window.scrollTo(0, 0);
        });
    };


    $scope.InsertCreateQuoteNomineeonError = function(variable, data) {
        $scope.showToaster("ApplicationIDNotCreated");
    };


    $scope.sameaddressChange = function($event, $isolateScope, newVal, oldVal) {
        debugger;
        $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue = $scope.Widgets.txtaddress1_formWidget.datavalue;
        $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue = $scope.Widgets.txtaddress2_formWidget.datavalue;
        $scope.Widgets.txt_nomineezip_formWidget.datavalue = $scope.Widgets.txt_zip_formWidget.datavalue;
        $scope.Widgets.select_nomineestate_formWidget.datavalue = $scope.Widgets.select_state_formWidget.datavalue;
        $scope.Widgets.select_nomineecountry_formWidget.datavalue = $scope.Widgets.select_country_formWidget.datavalue;
        $scope.Widgets.txt_nomineemobile_formWidget.datavalue = $scope.Widgets.txt_mobile_formWidget.datavalue;
        $scope.Widgets.txt_nomineephone_formWidget.datavalue = $scope.Widgets.txt_phone_formWidget.datavalue;
    };


    $scope.btn_submitClick = function($event, $isolateScope) {
        $scope.finaldata = {
            "ApplicationID": $scope.Widgets.FinalGrid.dataset.ApplicationId,
            "PremiumAmount": $scope.Widgets.lbl_PremiumAmount.caption
        };
        var FinalSubmit = {
            "status": "Pending Issuance",
            "applicationId": $scope.finaldata.ApplicationID
        };
        $scope.Variables.CreateQuoteFinalUpdate.setInput("applicationid", $scope.finaldata.ApplicationID);
        $scope.Variables.CreateQuoteFinalUpdate.setInput("status", "Pending Issuance");
        $scope.Variables.CreateQuoteFinalUpdate.update();
    };





    $scope.button18Click = function($event, $isolateScope) {
        $scope.Widgets;
        debugger;
        $scope.Widgets.createapolicywizard.prev();
    };




}]);

Application.$controller("FinalGridController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("ConfirmationDialogController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);