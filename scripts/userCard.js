angular
	.module('listNexus')
 	.directive('userCard', function () {
		return {
		  restrict: 'E',
		  templateUrl: 'templates/userCard.tmpl.html',
		  scope: {
			name: '@',
			theme: '@'
		  },
		  controller: function ($scope) {
			$scope.theme = $scope.theme || 'default';
		  }
		}
  });