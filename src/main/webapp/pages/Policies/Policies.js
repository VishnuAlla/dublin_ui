Application.$controller("PoliciesPageController", ["$scope", function($scope) {
    "use strict";

    /* perform any action on widgets/variables within this block */
    var pa_count = 0,
        pi_count = 0,
        if_count = 0,
        od_count = 0,
        sp_count = 0,
        lap_count = 0,
        can_count = 0;
    $scope.hidecolumn;
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

        debugger;

        $scope.pageData = $scope.Variables.goToPage_Policies.getData();
        // $scope.pageData.status
        // console.log($scope.pageData);
        var RequestBody = {
            "status": "",
            "durationType": "all",
            "agentId": $scope.Variables.loggedInUser.dataSet.id
        };
        // console.log(RequestBody);
        $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        $scope.Variables.GetPoliciesDetails.update({}, function(data) {
            console.log(data);
            // debugger;
            for (var i = 0; i < data.length; i++) {
                if (data[i].PolicyStatus === "Pending Application") {
                    pa_count++;
                } else if (data[i].PolicyStatus === "Pending Issuance") {
                    pi_count++;
                } else if (data[i].PolicyStatus === "InForce") {
                    if_count++;
                } else if (data[i].PolicyStatus === "Overdue") {
                    od_count++;
                } else if (data[i].PolicyStatus === "Suspended") {
                    sp_count++;
                } else if (data[i].PolicyStatus === "Lapsed") {
                    lap_count++;
                } else if (data[i].PolicyStatus === "Cancelled") {
                    can_count++;
                }
            }
            $scope.Widgets.lbl_pa_count.caption = pa_count;
            $scope.Widgets.lbl_pi_count.caption = pi_count;
            $scope.Widgets.lbl_if_count.caption = if_count;
            $scope.Widgets.lbl_od_count.caption = od_count;
            $scope.Widgets.lbl_sp_count.caption = sp_count;
            $scope.Widgets.lbl_lap_count.caption = lap_count;
            $scope.Widgets.lbl_can_count.caption = can_count;
        });
        debugger
        $scope.Widgets.composite_radiodurationtype.show = false;
        if ($scope.pageData.navpath === "Dashboard") {

            // }
            // if(pageData.navpath)
            var instatus = $scope.pageData.status === "" ? "" : $scope.pageData.status;
            var indurationtype = $scope.pageData.durationtype === "" ? "all" : $scope.pageData.durationtype;


            if ($scope.pageData.durationtype === "week") {
                $scope.Widgets.radio_durationtype.datavalue = "This Week";
            } else if ($scope.pageData.durationtype === "month") {
                $scope.Widgets.radio_durationtype.datavalue = "This Month";
            } else {
                $scope.Widgets.radio_durationtype.datavalue = "All";
            }
            $scope.callvariable(instatus, indurationtype);

            $scope.$root.refreshBC($scope.activePageName, "Policies", false);
            // if ($scope.pageData.status === "InForce") {
            //     $scope.Widgets.tile_inforce.class = "activetile";
            //     $scope.Widgets.composite_radiodurationtype.show = true;
            // } else if ($scope.pageData.status === "PendingApplication") {
            //     $scope.Widgets.tile_pendingapplication.class = "activetile";
            // } else if ($scope.pageData.status === "Suspended") {
            //     $scope.Widgets.tile_suspended.class = "activetile";
            // } else if ($scope.pageData.status === "Overdue") {
            //     $scope.Widgets.tile_overdue.class = "activetile";
            // } else if ($scope.pageData.status === "PendingIssuance") {
            //     $scope.Widgets.tile_pendingissuance.class = "activetile";
            // }
        } else {
            $scope.callvariable("InForce", "all");
            $scope.$root.refreshBC($scope.activePageName, "Policies", true);
            $scope.Widgets.tile_inforce.class = "activetile";
            $scope.Widgets.radio_durationtype.datavalue = "All";
            $scope.Widgets.composite_radiodurationtype.show = true;

        }
        // $scope.callvariable = function(status, durationtype) {
        //     debugger;
        //     var RequestBody = {
        //         "status": status,
        //         "durationType": durationtype,
        //         "agentId": $scope.Variables.loggedInUser.dataSet.id
        //     };
        //     // console.log(RequestBody);
        //     $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        //     $scope.Variables.GetPoliciesDetails.update({}, function(data) {
        //         console.log(data);
        //         debugger;
        //         for (var i = 0; i < data.length; i++) {
        //             if (data[i].PolicyStatus === "PendingApplications") {
        //                 pa_count++;
        //             } else if (data[i].PolicyStatus === "PendingIssuance") {
        //                 pi_count++;
        //             } else if (data[i].PolicyStatus === "InForce") {
        //                 if_count++;
        //             } else if (data[i].PolicyStatus === "Overdue") {
        //                 od_count++;
        //             } else if (data[i].PolicyStatus === "Suspended") {
        //                 sp_count++;
        //             } else if (data[i].PolicyStatus === "Lapsed") {
        //                 lap_count++;
        //             } else if (data[i].PolicyStatus === "Cancelled") {
        //                 can_count++;
        //             }
        //         }
        //         $scope.Widgets.lbl_pa_count.caption = pa_count;
        //         $scope.Widgets.lbl_pi_count.caption = pi_count;
        //         $scope.Widgets.lbl_if_count.caption = if_count;
        //         $scope.Widgets.lbl_od_count.caption = od_count;
        //         $scope.Widgets.lbl_sp_count.caption = sp_count;
        //         $scope.Widgets.lbl_lap_count.caption = lap_count;
        //         $scope.Widgets.lbl_can_count.caption = can_count;

        //         if ($scope.pageData.durationtype === "week") {
        //             $scope.Widgets.radio_durationtype.datavalue = "This Week";
        //         } else if ($scope.pageData.durationtype === "month") {
        //             $scope.Widgets.radio_durationtype.datavalue = "This Month";
        //         } else {
        //             $scope.Widgets.radio_durationtype.datavalue = "All";
        //         }
        //     });
        //     debugger;
        //     if (status === "InForce") {
        //         $scope.Widgets.tile_inforce.class = "activetile";
        //         $scope.Widgets.composite_radiodurationtype.show = true;
        //     } else if (status === "PendingApplication") {
        //         $scope.Widgets.tile_pendingapplication.class = "activetile";
        //     } else if (status === "suspended") {
        //         $scope.Widgets.tile_suspended.class = "activetile";
        //     } else if (status === "Overdue") {
        //         $scope.Widgets.tile_pendingapplication.class = "bg-primary";
        //         $scope.Widgets.tile_pendingissuance.class = "bg-primary";
        //         $scope.Widgets.tile_inforce.class = "bg-primary";
        //         $scope.Widgets.tile_overdue.class = "activetile";
        //         $scope.Widgets.tile_suspended.class = "bg-primary";
        //         $scope.Widgets.tile_lapsed.class = "bg-primary";
        //         $scope.Widgets.tile_cancelled.class = "bg-primary";
        //         $scope.Widgets.composite_radiodurationtype.show = false;
        //     } else if (status === "PendingIssuance") {
        //         $scope.Widgets.tile_pendingissuance.class = "activetile";

        //     }
        // };


    };

    $scope.callvariable = function(status, durationtype) {
        debugger;
        var RequestBody = {
            "status": status,
            "durationType": durationtype,
            "agentId": $scope.Variables.loggedInUser.dataSet.id
        };
        // console.log(RequestBody);
        $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        $scope.Variables.GetPoliciesDetails.update();
        // console.log(status);
        if (status === "InForce") {
            $scope.hidecolumn = false;
            $scope.Widgets.tile_pendingapplication.class = "bg-primary";
            $scope.Widgets.tile_pendingissuance.class = "bg-primary";
            $scope.Widgets.tile_inforce.class = "activetile";
            $scope.Widgets.tile_overdue.class = "bg-primary";
            $scope.Widgets.tile_suspended.class = "bg-primary";
            $scope.Widgets.tile_lapsed.class = "bg-primary";
            $scope.Widgets.tile_cancelled.class = "bg-primary";
            // $scope.Widgets.composite_radiodurationtype.show = false;
            $scope.Widgets.composite_radiodurationtype.show = true;
        } else if (status === "Pending Application") {
            $scope.hidecolumn = true;
            $scope.Widgets.tile_pendingapplication.class = "activetile";
            $scope.Widgets.tile_pendingissuance.class = "bg-primary";
            $scope.Widgets.tile_inforce.class = "bg-primary";
            $scope.Widgets.tile_overdue.class = "bg-primary";
            $scope.Widgets.tile_suspended.class = "bg-primary";
            $scope.Widgets.tile_lapsed.class = "bg-primary";
            $scope.Widgets.tile_cancelled.class = "bg-primary";
            $scope.Widgets.composite_radiodurationtype.show = false;
        } else if (status === "Suspended") {
            $scope.hidecolumn = false;
            $scope.Widgets.tile_pendingapplication.class = "bg-primary";
            $scope.Widgets.tile_pendingissuance.class = "bg-primary";
            $scope.Widgets.tile_inforce.class = "bg-primary";
            $scope.Widgets.tile_overdue.class = "bg-primary";
            $scope.Widgets.tile_suspended.class = "activetile";
            $scope.Widgets.tile_lapsed.class = "bg-primary";
            $scope.Widgets.tile_cancelled.class = "bg-primary";
            $scope.Widgets.composite_radiodurationtype.show = false;
        } else if (status === "Overdue") {
            $scope.hidecolumn = false;
            $scope.Widgets.tile_pendingapplication.class = "bg-primary";
            $scope.Widgets.tile_pendingissuance.class = "bg-primary";
            $scope.Widgets.tile_inforce.class = "bg-primary";
            $scope.Widgets.tile_overdue.class = "activetile";
            $scope.Widgets.tile_suspended.class = "bg-primary";
            $scope.Widgets.tile_lapsed.class = "bg-primary";
            $scope.Widgets.tile_cancelled.class = "bg-primary";
            $scope.Widgets.composite_radiodurationtype.show = false;
        } else if (status === "Pending Issuance") {
            $scope.hidecolumn = true;
            $scope.Widgets.tile_pendingapplication.class = "bg-primary";
            $scope.Widgets.tile_pendingissuance.class = "activetile";
            $scope.Widgets.tile_inforce.class = "bg-primary";
            $scope.Widgets.tile_overdue.class = "bg-primary";
            $scope.Widgets.tile_suspended.class = "bg-primary";
            $scope.Widgets.tile_lapsed.class = "bg-primary";
            $scope.Widgets.tile_cancelled.class = "bg-primary";
            $scope.Widgets.composite_radiodurationtype.show = false;
        } else if (status === "Cancelled") {
            $scope.hidecolumn = false;
            $scope.Widgets.tile_pendingapplication.class = "bg-primary";
            $scope.Widgets.tile_pendingissuance.class = "bg-primary";
            $scope.Widgets.tile_inforce.class = "bg-primary";
            $scope.Widgets.tile_overdue.class = "bg-primary";
            $scope.Widgets.tile_suspended.class = "bg-primary";
            $scope.Widgets.tile_lapsed.class = "bg-primary";
            $scope.Widgets.tile_cancelled.class = "activetile";
            $scope.Widgets.composite_radiodurationtype.show = false;
        } else if (status === "Lapsed") {
            $scope.hidecolumn = false;
            $scope.Widgets.tile_pendingapplication.class = "bg-primary";
            $scope.Widgets.tile_pendingissuance.class = "bg-primary";
            $scope.Widgets.tile_inforce.class = "bg-primary";
            $scope.Widgets.tile_overdue.class = "bg-primary";
            $scope.Widgets.tile_suspended.class = "bg-primary";
            $scope.Widgets.tile_lapsed.class = "activetile";
            $scope.Widgets.tile_cancelled.class = "bg-primary";
            $scope.Widgets.composite_radiodurationtype.show = false;
        }
    };
    $scope.tile_inforceClick = function($event, $isolateScope) {
        $scope.callvariable("InForce", "all");
    };


    $scope.tile_overdueClick = function($event, $isolateScope) {
        $scope.callvariable("Overdue", "all");
    };


    $scope.tile_suspendedClick = function($event, $isolateScope) {
        $scope.callvariable("Suspended", "all");
    };


    $scope.tile_lapsedClick = function($event, $isolateScope) {
        $scope.callvariable("Lapsed", "all");
    };


    $scope.tile_pendingissuanceClick = function($event, $isolateScope) {
        $scope.callvariable("Pending Issuance", "all");
    };


    $scope.tile_pendingapplicationClick = function($event, $isolateScope) {
        $scope.callvariable("Pending Application", "all");
    };


    $scope.tile_cancelledClick = function($event, $isolateScope) {
        $scope.callvariable("Cancelled", "all");
    };


    $scope.radio_durationtypeClick = function($event, $isolateScope) {
        $scope.Widgets;
        debugger;
        var radio_datavalue = "all";
        if ($isolateScope.datavalue === "This Month")
            radio_datavalue = "Month";
        else if ($isolateScope.datavalue === "This Week")
            radio_datavalue = "Week";
        else if ($isolateScope.datavalue === "All")
            radio_datavalue = "all";
        $scope.callvariable("InForce", radio_datavalue);
    };


    $scope.radio_durationtypeChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets;
        debugger;
    };

}]);

Application.$controller("grid_policiesdetailsController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(row) {

            $scope.$root.expandSelectedRow("Policies Details", row, $scope.Widgets.grid_policiesdetails.fullFieldDefs);
            DialogService.showDialog("Dialog_policydetails"); //Edited by kajal for adding dialog in mobile view

        };
        $scope.manageapplication = function(row) {
            $scope.Variables.GetCreateQuoteData.setInput({
                ApplicationID: row.ApplicationId
            });
            $scope.Variables.PolicyDetails.dataSet.policyid = row.ApplicationId;
            $scope.Variables.PolicyDetails.dataSet.policyname = row.PolicyName;
            $scope.Variables.Editableform.setData({
                "createquote": true,
                "customerdetails": true,
                "proposaldetails": true,
                "btn_continuecaption": "Update",
                "btn_step2continuecaption": "Update",
                "btn_step3continuecaption": "Update"
            });
            $scope.Variables.GetCreateQuoteData.update({}, function() {
                $scope.Variables.PolicyDetails.dataSet.navpath = "dashboard";
                $scope.Variables.PolicyDetails.dataSet.mode = "Edit";
                $scope.Variables.goToPage_createaquote.navigate();
                // $scope.Variables.goToPage_createapolicy.setData("dashboard", "navpath");
                // $scope.Variables.goToPage_createapolicy.navigate();
            });
        };
        $scope.managepolicies = function(row) {
            debugger;
            $scope.Variables.GetClientPolicyDetails.setInput("type", "policyId");
            $scope.Variables.GetClientPolicyDetails.setInput("id", row.PolicyId);
            $scope.Variables.GetClientPolicyDetails.update({}, function(data) {
                $scope.Variables.PolicyProfileDetails.dataSet = {};
                $scope.Variables.PolicyProfileDetails.dataSet.navpath = "policies";
                console.log(data);

                $scope.Variables.PolicyProfileDetails.dataSet.policydetails = data.PolicyDetail;
                $scope.Variables.goToPage_CustomerProfile.navigate();
            });
            // $scope.Variables.getPolicyDetailsByPolicyId.setInput({
            //     policyId: row.PolicyId
            // });
            // $scope.Variables.getPolicyDetailsByPolicyId.update({}, function(data) {
            // $scope.Variables.PolicyProfileDetails.dataSet.navpath = "Policies";
            // $scope.Variables.PolicyProfileDetails.dataSet.policydetails = data;
            // $scope.Variables.goToPage_CustomerProfile.navigate();
            // });
        };
    }
]);

Application.$controller("Dialog_policydetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);