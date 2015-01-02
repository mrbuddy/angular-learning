var MyApp= angular.module("MyApp",['F12','ngRoute']);



/*MyApp.run(function($rootScope){
$rootScope.root = "Root value";
$rootScope.catchme = "M56";
});*/

MyApp.config(["$routeProvider", function($routeProvider){
	$routeProvider
	.when('/',
	{	
		templateUrl: 'basic.html',
		controller: 'MyFirstController'
	})
	.when('/moderate/:id',
	{	
		templateUrl: 'moderate.html',
		controller: 'MySecondController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

MyApp.controller("MyFirstController", ["$scope","HandleLocalStorage", function ($scope,hls)
	{
		$scope.hardcodedname = "Hello - (Harcoded value in MyFirstController)";

		$scope.bindname = "Hi - (Bind value using ng-bind)";

		hls.Lsavedata([{sampleid: "samplevalue"}],'sample');

		$scope.tdata = hls.Lgetdata("mytable");

		$scope.addtotable = function() {
			for(i=0; i<$scope.tdata.length; i++)
			{
				if($scope.tdata[i].key == $scope.tkey)
				{
					alert("Duplicates are not allowed!!");
					return;
				}
			}	
			$scope.tdata = hls.Lgetdata('mytable');
			$scope.tdata.push({ key : $scope.tkey, value : $scope.tvalue});
			$scope.tvalue = "";
			$scope.tkey ="";
			hls.Lsavedata($scope.tdata,'mytable');
		}	

		$scope.setTime = function()
		{
			var d = new Date();
			$scope.curtime = d.getDate() + "/" + (d.getMonth() + 1)  + "/" + d.getFullYear() + " " + (d.getHours() > 9 ? d.getHours() : ( "0" + d.getHours())) + ":" +  (d.getMinutes() > 9 ? d.getMinutes() : ("0" + d.getMinutes() )) + ":" + (d.getSeconds() > 9 ? d.getSeconds() : ("0"+ d.getSeconds()));	
		}

		setInterval(function(){
			$scope.$apply($scope.setTime());
		}, 1000);

		$scope.setTime();
	} 
]);


MyApp.controller("MySecondController", ["$scope", "$routeParams", function($scope, $routeParams){
	//$scope.catchme = "Overridden!";
	$scope.urlid = $routeParams.id;
	$scope.sampledata = {
		message : "hello there!! this is sample data from controller 2"
	}
	$scope.helpertoDir1 = function(){
		$scope.dir1helper = "I got assigned !!";
	}


	$scope.mohan = { age: "25", work : "software"};
	$scope.someone = { age: "26", work : "software"};

}]);


MyApp.directive("myFirstDirective", function(){
	var template = '<div class="applyborder"> Age: {{details.age}} Work :{{details.work}}, Passed arg : {{arg1}}</div>';
	return {
		restrict: 'E',
		transclude : true,
		template : template,
		scope :{
			details : "=identity",
			arg1: "@"
		},
		link: function(scope,element,att){
			element.bind("click", function(){
				element.addClass(att.applycolor);
				scope.$apply(scope.helpertoDir1());
			})
			//alert("I am still working");
		}
	}
});

