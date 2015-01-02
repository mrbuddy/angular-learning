var myModule = angular.module("F12",[]);

myModule.service("HandleLocalStorage",[
	function(){
		this.Lsavedata = function(data,id){
			localStorage.setItem(id,JSON.stringify(data));
		}
 		
		this.Lgetdata = function(id){
			if(JSON.parse(localStorage.getItem(id)) !== null)
			{
				return JSON.parse(localStorage.getItem(id));
			}
			else
			{
				return [];
			}
		}
	}
]);