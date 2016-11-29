angular
	.module("listNexus")
	.controller("showList", ['$scope', '$mdDialog', '$rootScope', 
				function($scope, $mdDialog, $rootScope) {
		$rootScope.userId = "prateek";
		$scope.finalSubmit = function(categoryId) {
			console.log(categoryId);
			console.log($scope.diff);
		}

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
						"item" : "milk",
						"gen" : "26-Nov-2016 23:25:50",
						"userId" : "prateek",
						"auth" : "public",
						"isCompleted" : false
					},
					{
						"id" : 2,
						"item" : "corn flakes",
						"gen" : "26-Nov-2016 23:25:50",
						"userId" : "prateek",
						"auth" : "public",
						"isCompleted" : true
					},
					{
						"id" : 3,
						"item" : "yoghurt",
						"gen" : "26-Nov-2016 23:25:50",
						"userId" : "suraj",
						"auth" : "public",
						"isCompleted" : true
					},
					{
						"id" : 7,
						"item" : "veggies",
						"gen" : "26-Nov-2016 23:25:51",
						"userId" : "suraj",
						"auth" : "public",
						"isCompleted" : false
					}
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
		$scope.diff = {"new" : [], "old" : {}};

		$scope.toggle = function(itemId){
			var categoryId = 0;
			angular.forEach($scope.list, function(subject) {
				angular.forEach(subject.list, function(item){
					if (item.id == itemId){
						item.isCompleted = !item.isCompleted;
						$scope.diff["old"][item.id] = item;
						return;
					}
				});
				++categoryId;
			});
			return ;
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
					list : $scope.list[categoryId],
					userId : $rootScope.userId,
					diff : $scope.diff
				}
			}).then(function(answer) {
				console.log("added");
			});
		};

		$scope.seeFullList = function(ev, category, categoryId) {
			$mdDialog.show({
				controller : ShowFullListDialogController,
				templateUrl : 'templates/fullListDialog.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : true,
				locals : {
					category : category,
					list : $scope.list[categoryId],
					userId : $rootScope.userId,
					diff : $scope.diff,
					ev : ev,
					categoryId : categoryId,
					addItem : $scope.addItem,
					toggle : $scope.toggle
				}
			});
		} 

		function ShowFullListDialogController($scope, $mdDialog, category, list, userId, diff, ev, categoryId, addItem, toggle){
			$scope.category = category;
			$scope.list = list;
			$scope.userId = userId;
			$scope.diff = diff;
			$scope.categoryId = categoryId;
			$scope.ev = ev; 

			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.answer = function(answer) {
				console.log(answer);
			};

			$scope.addItem = addItem;

			$scope.toggle = toggle;
		}

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
				// if no entry then prevent submit
				if (item == null) return;
				if (item.auth == null || item.item == null) return;
				item.subject = sub;
				item.userId = userId;
				item.isCompleted = false;
				$scope.list.list.push(item);
				$scope.diff["new"].push(item);
				$scope.hide();
			}
		};	
	}]);