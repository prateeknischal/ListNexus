angular
	.module("listNexus")
	.controller("showList", ['$scope', '$mdDialog', '$rootScope', function($scope, $mdDialog, $rootScope) {
		$rootScope.userId = "prateek";
		$scope.list = [
			{
				"id" : 1,
				"subject" : "Groceries",
				"date" : "26-Nov-2016 23:25:50",
				"userId" : "prateek",
				"auth" : "public",
				"list" : [
					{
						"id" : 1,
						"item" : "potato",
						"gen" : "26-Nov-2016 23:25:50",
						"userId" : "prateek",
						"auth" : "public",
						"isCompleted" : false
					},
					{
						"id" : 2,
						"item" : "tomato",
						"gen" : "26-Nov-2016 23:25:50",
						"userId" : "prateek",
						"auth" : "public",
						"isCompleted" : true
					},
					{
						"id" : 3,
						"item" : "oil",
						"gen" : "26-Nov-2016 23:25:50",
						"userId" : "suraj",
						"auth" : "public",
						"isCompleted" : true
					},
				]
			}, 
			{
				"id" : 2,
				"subject" : "Medicines",
				"date" : "26-Nov-2016 23:25:59",
				"userId" : "ankit",
				"auth" : "public",
				"isCompleted" : "false",
				"list" : [
					{
						"id" : 4,
						"item" : "crocin",
						"gen" : "26-Nov-2016 23:25:59",
						"userId" : "ankit",
						"auth" : "public",
						"isCompleted" : false
					},
					{
						"id" : 5,
						"item" : "nasivion",
						"gen" : "26-Nov-2016 23:25:59",
						"userId" : "prateek",
						"auth" : "public",
						"isCompleted" : false
					},
					{
						"id" : 6,
						"item" : "boro plus",
						"gen" : "26-Nov-2016 23:25:59",
						"userId" : "prateek",
						"auth" : "public",
						"isCompleted" : false
					}
				]
			}
		];
		$scope.diff = [];

		$scope.toggle = function(itemId){
			angular.forEach($scope.list, function(subject) {
				angular.forEach(subject.list, function(item){
					if (item.id == itemId){
						item.isCompleted = !item.isCompleted;
						return;
					}
				});
				return;
			});
		};

		$scope.getIncomplete = function(index) {
			var val = 0;
			angular.forEach($scope.list[index].list, function(item){
				if (!item.isCompleted) {
					++val;
				}
			});
			return val;
		}

		$scope.addItem = function(ev, category, categoryId){
			$mdDialog.show({
				controller : DialogController,
				templateUrl : 'templates/addItemDialog.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : false,
				locals : {
					category : category,
					list : $scope.list[categoryId], //hardcoded for now get id later
					userId : $rootScope.userId,
					diff : $scope.diff
				}
			}).then(function(answer) {
				console.log("added");
			});
		};

		function DialogController($scope, $mdDialog, category, list, userId, diff) {
			$scope.category = category;
			$scope.list = list;
			$scope.diff = diff;
			$scope.auth = [
				{
					value : "public",
				},
				{
					value : "private"
				}
			]
			//declare item entry
			$scope.item
			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.answer = function(answer) {
				console.log(answer);
			};

			$scope.addEntry = function(item, sub) {
				item.subject = sub;
				item.userId = userId;
				$scope.list.list.push(item);
				$scope.diff.push(item);
				console.log($scope.diff);
				$scope.hide();
			}
		};	
	}]);