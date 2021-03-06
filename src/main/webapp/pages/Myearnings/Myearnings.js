Application.$controller("MyearningsPageController", ["$scope", function($scope) {
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
        $scope.$root.refreshBC($scope.activePageName, "My Earnings", true);
        document.title = "My Earnings";
        $scope.today = new Date();
        // debugger;
        // $scope.month = ($scope.today.toLocaleString("en-us", {
        //     month: "short"
        // })) + "-" + $scope.today.getFullYear();
        // console.log($scope.month);
        var year = $scope.today.getFullYear();
        $scope.Variables.GetCommisionDetails.setInput({
            "year": year
        });
        $scope.Variables.GetCommisionDetails.update();
        // $scope.Variables.getMonthMyEarning.setInput({
        //     "Month": $scope.month
        // });
        // $scope.Variables.getMonthMyEarning.update();
    };


    $scope.GetCommisionDetailsonCanUpdate = function(variable, data) {
        // for (var i = 0; i < data.length; i++) {
        //     // console.log(data[i].Month);
        //     data[i].Month = data[i].Month.split('-')[0];
        // }
        // $('.nv-x text').attr('x', '-29');

        // $('.nv-x text').attr('y', '-8');

        // $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
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
        // }, 100);
    };


    $scope.select_yearChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.GetCommisionDetails.setInput({
            "year": newVal
        });
        $scope.Variables.GetCommisionDetails.update({}, function(data) {
            $scope.Variables.getMonthMyEarning.setInput({
                "Month": "Jan-" + $scope.Widgets.select_year.datavalue
            });
            $scope.Variables.getMonthMyEarning.update();
        });
    };

}]);


Application.$controller("grid1Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid2Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid1 Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("gridCommisionDetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.GetMonth = function(row) {
            debugger;
            console.log(row)
            $scope.Variables.getMonthMyEarning.setInput({
                "Month": row.Month
            });
            $scope.Variables.getMonthMyEarning.update();
        };
        $scope.today = new Date();
        // debugger;
        $scope.month = ($scope.today.toLocaleString("en-us", {
            month: "short"
        })) + "-" + $scope.today.getFullYear();
        console.log($scope.month);
        // var year = $scope.today.getFullYear();
        // $scope.Variables.GetCommisionDetails.update();
        $scope.Variables.getMonthMyEarning.setInput({
            "Month": $scope.month
        });
        $scope.Variables.getMonthMyEarning.update();
    }
]);

Application.$controller("GridOnClickController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {

            $scope.$root.expandSelectedRow("Myearnings", rowObj, $scope.Widgets.GridOnClick.fullFieldDefs);
            DialogService.showDialog("Dialog_myearningdetails");
            $scope.Widgets.GridOnClick.selectedItems.length = 0;
        };
    }
]);
Application.$controller("Dialog_myearningdetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);