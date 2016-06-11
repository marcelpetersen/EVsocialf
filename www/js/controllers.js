angular.module('app.controllers', [])


.controller('welcomeEVUserCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})


//isuru start

.controller('mapCtrl', function($scope,$cordovaGeolocation,$firebase) {
        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here I am!"
                });

                var firebaseObj = new Firebase("https://incandescent-torch-1071.firebaseio.com/Stations_Details");


                firebaseObj.on("child_added", function(snapshot, prevChildKey){


                        var station = snapshot.val();
                        var markerPos = new google.maps.LatLng(station.latitude, station.longitude);


                        var stations = new google.maps.Marker({
                            map:$scope.map,
                            animation: google.maps.Animation.DROP,
                            position: markerPos,
                            icon: 'img/station.png'
                        });



                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });





                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open($scope.map, marker);
                });

            });


        }, function(error){
            console.log("Could not get location");
        });

})
//isuru end

.controller('socialNetworkCtrl', function($scope) {

})

.controller('messengerCtrl', function($scope) {

})

.controller('itemsForSaleCtrl', function($scope) {

})

.controller('adminHomepageCtrl', function($scope) {

})

.controller('acceptNewStationCtrl', function($scope) {

})

.controller('acceptRevenueCtrl', function($scope) {

})

.controller('manageProfileCtrl', function($scope) {

})

.controller('newsPageCtrl', function($scope) {

})

.controller('pageCtrl', function($scope) {

})

.controller('groupChatCtrl', function($scope) {

})

.controller('stationChatCtrl', function($scope) {

})

.controller('chatCtrl', function($scope) {

})

.controller('chargingRecordsCtrl', function($scope) {

})
.controller('newPostCtrl', function($scope) {

})



 //asanaka  start
.controller('RoomsListCtrl', function($scope, $ionicPopup, RoomFactory) {
  $scope.rooms = RoomFactory.allRooms;

  $scope.createRoom = function() {
    var timestamp = new Date().valueOf();
    $ionicPopup.prompt({
      title: 'Add a room',
      subTitle: 'Use simple names',
    }).then(function(room) {
      $scope.rooms.$add({
        name: room,
        id: timestamp
      });
    });
  };

  $scope.deleteRoom = function(room) {
    $scope.rooms.$remove(room);
  };


})
.controller('RoomDetailCtrl', function($scope, $stateParams, $ionicHistory, RoomFactory) {
  $scope.room = RoomFactory.room($stateParams.roomId);
  $scope.messages = RoomFactory.messages($scope.room.$id);

  $scope.sendMessage = function(newMessage) {
    RoomFactory.send($scope.newMessage, $scope.room.$id);
    $scope.newMessage = '';
  };

  $scope.backToRoomsList = function() {
    $ionicHistory.goBack();
  };
})


.controller('postCtrl', function($scope){
	var ref = new Firebase('https://snev.firebaseio.com/posts');
	 var ref2 = new Firebase('https://snev.firebaseio.com/comments');


	 $scope.addlike = function() {

	 alert("like button");

	 };

	 $scope.adddislike = function() {

	 alert("disliked button");

	 };

	 $scope.report = function() {

	 alert("report  button");

	 };


		ref.on("value", function(snapshot,prevChildKey) {
		  $scope.$apply(function(){
			$scope.posts = snapshot.val();
			console.log(prevChildKey.key());

		  });
		});

		ref2.on("value", function(snapshot) {
		  $scope.$apply(function(){
			$scope.comments = snapshot.val();

		  });
		});




})

.controller('cmntController', function($scope) {

	$scope.addComment = function() {

	alert("working");

  };





})






 //asanka end
