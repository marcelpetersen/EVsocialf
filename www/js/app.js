// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers',  'app.routes', 'app.services', 'app.directives','ngCordova','firebase','angular-md5', 'app.configs'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $location, CONFIG) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
   }


  });

})




.controller('userController', function($scope, $http, $state,$ionicPopup) {
   $scope.postForm = function(title,description){
	   

		    var messageListRef = new Firebase('https://snev.firebaseio.com/posts');
     var newMessageRef = messageListRef.push();
       newMessageRef.set({ 'title': title, 'description': description ,'image': 'imagelocation', 'username': 'usernamevar' });
       var path = newMessageRef.toString();

         $scope.title="";
         $scope.description="";
		 
		
	

      };
});
