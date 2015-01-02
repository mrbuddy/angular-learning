var videoApp = angular.module("video",[]);

videoApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

videoApp.controller("videoCtrl",["$scope",
	function($scope){

		$scope.items = JSON.parse(localStorage.getItem('playlist')) || [] ;
		$scope.types = ["mp4", "mpeg"];
		//console.log(JSON.stringify($scope.items));

		$scope.addtolist = function(){

			var file = $scope.myFile;
        	//console.log('file is ' + JSON.stringify(file.name));
        	$scope.filename = JSON.stringify(file.name);

			if ($scope.filename === undefined || $scope.filename.trim().length == 0 )
			{
				alert("filename can not be null!!");
				return;
			}
			for(var i=0; i<$scope.items.length;i++)
			{
				if ($scope.items[i].filename == $scope.filename) {
					alert("Item exist already!!");
					return;
				}
			}
			$scope.items.push({filename : $scope.filename, type : $scope.type});
			localStorage.setItem('playlist', JSON.stringify($scope.items));
		}

		$scope.setSelected = function(item){
			$scope.selecteditem = item;
			//console.log($scope.selecteditem);
		}

		$scope.play = function(){
			var ext = /\..*$/;
			if($scope.selecteditem === undefined) {
				alert("No item selected!!");
				return;
			}
			var file = $scope.selecteditem.filename;
			if(!ext.test(file))
			{
				file = file + "." + $scope.selecteditem.type;	
			}
			document.getElementById("videoTag").innerHTML = "<video width='100%' !important height='100%' !important controls autoplay src=" + file + ">Your browser does not support video</video>";
		}		
	}
])