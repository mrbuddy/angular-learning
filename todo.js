
function fun($scope){
	//$scope.todos = [{name: "Learn angular hello world", done: false},{name : "Learn angular basics", done: false}];
	//$scope.todos = [];

	$scope.todos = JSON.parse(localStorage.getItem('session')) || [];
	//localStorage.setItem("Learn angular hello world","false");
	//localStorage.setItem($scope.todos,JSON.stringify($scope.todos));
	console.log(JSON.stringify($scope.todos));

	$scope.totalTodos = function(){
		//console.log($scope.todos.length);
		if ($scope.todos.length)
		{
			return $scope.todos.length;	
		}
		return 0;
	};

	$scope.todoAdd = function(){
		for(var i=0; i<$scope.todos.length;i++)
		{
			if ($scope.todos[i].name == $scope.todoadd) {
				alert("Item exist already!!");
				return;
			}
			if ($scope.todoadd.length < 1)
			{
				alert("Item can not be null!!");
				return;
			}
		}
		$scope.todos.push({name: $scope.todoadd, done: false});
		localStorage.setItem('session',JSON.stringify($scope.todos));
		$scope.todoadd = '';
	};
	
	$scope.clearCompleted = function()
	{
		$scope.todos = _.filter($scope.todos,function(todo){
				return !todo.done;
		});
		localStorage.setItem('session',JSON.stringify($scope.todos));
	};
}