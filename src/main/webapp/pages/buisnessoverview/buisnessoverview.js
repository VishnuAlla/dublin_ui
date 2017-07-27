Application.$controller("buisnessoverviewPageController", ["$scope", function($scope) {
    "use strict";

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
        $scope.$root.refreshBC($scope.activePageName, "Buisness Overview", true);
        document.title = "Buisness Overview";
        $scope.today = new Date();
        // debugger;
        // $scope.month = ($scope.today.toLocaleString("en-us", {
        //     month: "short"
        // })) + "-" + $scope.today.getFullYear();
        var year = $scope.today.getFullYear();
        $scope.Variables.GetBuisnessOverview1.setInput({
            "year": year
        });
        $scope.Variables.GetBuisnessOverview1.update();
        // console.log($scope.month);
        // $scope.Variables.GetMonthBuisnessOverview.setInput({
        //     "Month": $scope.month
        // });
        // $scope.Variables.GetMonthBuisnessOverview.update();

    };


    $scope.GetBuisnessOverview1onCanUpdate = function(variable, data) {
        // for (var i = 0; i < data.length; i++) {
        //     // console.log(data[i].Month);
        //     data[i].Month = data[i].Month.split('-')[0];
        // }
        // $('.nv-x text').attr('x', '-29');

        // $('.nv-x text').attr('y', '-8');

        // $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // debugger;
        // setTimeout(function() {
        //     console.log("inside timeout");
        //     var allval = $('.nv-x text');
        //     for (var i = 0; i < allval.length; i++) {
        //         console.log("inside for loop " + i);
        //         $('.nv-x text')[i].innerHTML = allval[i].__data__.substring(0, 3);
        //         // allval[i].__data__.substring(0,3)
        //     }
        //     $('.nv-x text').attr('x', '-29');

        //     $('.nv-x text').attr('y', '-8');

        //     $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // }, 200);
    };


    $scope.select_yearChange = function($event, $isolateScope, newVal, oldVal) {
        debugger;
        $scope.Variables.GetBuisnessOverview1.setInput({
            "year": newVal
        });
        $scope.Variables.GetBuisnessOverview1.update({}, function(data) {
            $scope.Variables.GetMonthBuisnessOverview.setInput({
                "Month": "Jan-" + $scope.Widgets.select_year.datavalue
            });
            $scope.Variables.GetMonthBuisnessOverview.update();
        });
        // setTimeout(function() {
        //     console.log("inside timeout");
        //     var allval = $('.nv-x text');
        //     for (var i = 0; i < allval.length; i++) {
        //         console.log("inside for loop " + i);
        //         $('.nv-x text')[i].innerHTML = allval[i].__data__.substring(0, 3);
        //         // allval[i].__data__.substring(0,3)
        //     }
        //     $('.nv-x text').attr('x', '-29');

        //     $('.nv-x text').attr('y', '-8');

        //     $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // }, 200);
    };


    $scope.chart_buisnessoverviewTransform = function($event, $isolateScope) {
        // setTimeout(function() {
        //     console.log("inside timeout");
        //     var allval = $('.nv-x text');
        //     for (var i = 0; i < allval.length; i++) {
        //         console.log("inside for loop " + i);
        //         $('.nv-x text')[i].innerHTML = allval[i].__data__.substring(0, 3);
        //         // allval[i].__data__.substring(0,3)
        //     }
        //     $('.nv-x text').attr('x', '-29');

        //     $('.nv-x text').attr('y', '-8');

        //     $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // }, 200);
    };

}]);


Application.$controller("grid1Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("GridOnClickController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {

            $scope.$root.expandSelectedRow("buisnessoverview", rowObj, $scope.Widgets.GridOnClick.fullFieldDefs);
            DialogService.showDialog("Dialog_buisnessoverviewdetails");
            $scope.Widgets.GridOnClick.selectedItems.length = 0;
        };
    }
]);
Application.$controller("Dialog_buisnessoverviewdetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
Application.$controller("gridPolicydetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.GetMonth = function(row) {
            $scope.Variables.GetMonthBuisnessOverview.setInput({
                "Month": row.Month
            });
            $scope.Variables.GetMonthBuisnessOverview.update();
        };
        $scope.today = new Date();
        // debugger;
        $scope.month = ($scope.today.toLocaleString("en-us", {
            month: "short"
        })) + "-" + $scope.today.getFullYear();
        $scope.Variables.GetMonthBuisnessOverview.setInput({
            "Month": $scope.month
        });
        $scope.Variables.GetMonthBuisnessOverview.update();
    }
]);

Application.$controller("grid3Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);