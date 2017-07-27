Application.$controller("CustomerProfilePageController", ["$scope", function($scope) {
    "use strict";
    $scope.pageDetails;
    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {
        /*
         * variables can be accessed through '$scope.Variables' property here
         * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
         * $scope.Variables.loggedInUser.getData()
         *
         * widgets can be accessed through '$scope.Widgets' property here
         * e.g. to get value of text widget named 'username' use following script
         * '$scope.Widgets.username.datavalue'
         */



        //  GetClientPolicyDetails;



        $scope.$root.refreshBC($scope.activePageName, "Customer Profile", false);
        document.title = "Customer Profile";
        $('.wm-app .list-group-item:first-child').addClass('active');
        $scope.pageDetails = $scope.Variables.PolicyProfileDetails.dataSet;
        console.log($scope.pageDetails);
        console.log($scope.Variables.PolicyProfileDetails.dataSet.policydetails.length);
        debugger;
        console.log($scope.Variables.PolicyProfileDetails.dataSet.policydetails);
        if ($scope.pageDetails.navpath === "policies") {
            // $scope.Widgets.lbl_singlepolicydetail.caption = $scope.Variables.PolicyProfileDetails.dataSet.policydetails.PremiumToBePaid;
        } else if ($scope.pageDetails.navpath === "customerportfolio") {
            debugger;
            $scope.Variables.GetClientPolicyDetails.setInput("type", "policyId");
            $scope.Variables.GetClientPolicyDetails.setInput("id", $scope.pageDetails.policydetails[0].PolicyId);
            $scope.Variables.GetClientPolicyDetails.update({}, function(data) {
                // $scope.Variables.PolicyProfileDetails.dataSet.navpath = "Policies";
                // console.log(data);
                // $scope.Variables.PolicyProfileDetails.dataSet.policydetails = data;
                // $scope.Variables.goToPage_CustomerProfile.navigate();
            });
        }

        // if ($scope.pageDetails.navpath === "Policies") {
        //     $scope.Variables.getPolicyDetailsByPolicyId.setInput("policyId", $scope.pageDetails.policydetails.PolicyDetail.PolicyId);
        //     $scope.Variables.getPolicyDetailsByPolicyId.update();
        // } else if ($scope.pageDetails.navpath === "customerporfolio") {
        //     $scope.Variables.getPolicyDetailsByPolicyId.setInput("policyId", $scope.Variables.getClientPolicyWithProfileByClientId.dataSet.Policies[0].PolicyId);
        //     $scope.Variables.getPolicyDetailsByPolicyId.update();
        // }
        debugger;


    };

    $scope.livelist1Click = function($event, $isolateScope) {
        debugger;
        $scope.Variables;
        // $scope.Variables.getPolicyDetailsByPolicyId.setInput("policyId", $isolateScope.item.PolicyId);
        // $scope.Variables.getPolicyDetailsByPolicyId.update();
        $scope.Variables.GetClientPolicyDetails.setInput("type", "policyId");
        $scope.Variables.GetClientPolicyDetails.setInput("id", $isolateScope.item.PolicyId);
        $scope.Variables.GetClientPolicyDetails.update({}, function(data) {
            console.log(data);
        });
        // debugger;
        var lefttarget = $('.left_container').find('.mobileleft_container');
        var righttarget = $('.custright_container').find('.mobileright_container');
        var target = $('.left_container');
        lefttarget.removeClass('mobileleft_container');
        righttarget.removeClass('mobileright_container');
        righttarget.addClass('nav_container');
        righttarget.removeClass('hidecontainer');
        lefttarget.addClass('mobileright_container');
        target.removeClass('left_container');
        target.addClass('hidecontainer');
    };


    $scope.btn_backClick = function($event, $isolateScope) {
        var lefttarget = $('.hidecontainer').find('.mobileright_container');
        var righttarget = $('.custright_container').find('.nav_container');
        var target = $('.hidecontainer');
        lefttarget.removeClass('mobileright_container');
        righttarget.removeClass('nav_container');
        righttarget.addClass('mobileright_container');
        righttarget.addClass('hidecontainer');
        lefttarget.addClass('mobileleft_container');
        target.removeClass('hidecontainer');
        target.addClass('left_container');
    };

}]);


Application.$controller("grid_transactionsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid_NomineesDetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid3Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);