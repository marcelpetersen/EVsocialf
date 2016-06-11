angular.module('app.controllers', [])


.controller('welcomeEVUserCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})


//isuru start

.controller('StationCtrl', function($scope,$firebase,$ionicPopup) {
// Adding new station
	$scope.station = {};

	$scope.showAlert = function() {
	    $ionicPopup.alert({
	        title: 'Add Stations',
	        template: 'Your location has been saved!!'
	    });
	};



	$scope.saveDetails = function(){
	    var lat = $scope.station.latitude;
	    var lgt = $scope.station.longitude;
	    var nme = $scope.station.name;
		var dsc = $scope.station.desc;
		var add = $scope.station.address;
		var cnt = $scope.station.contact;
		var ema = $scope.station.email;
		var web = $scope.station.web;

	    var firebaseObj = new Firebase("https://snev.firebaseio.com/Stations_Details");
	    var fb = $firebase(firebaseObj);

	    fb.$push({
		    latitude: lat,
		    longitude: lgt,
		    name: nme,
			description:dsc,
			address:add,
			contact:cnt,
			email:ema,
			website:web,

		}).then(function(ref) {
		    $scope.static = {};
		    $scope.showAlert();
		}, function(error) {
		    console.log("Error:", error);
		});


  	}
})


.directive('addmap', function() {
    return {
        restrict: 'A',
        link:function(scope, element, attrs){

          var zValue = scope.$eval(attrs.zoom);
          var lat = scope.$eval(attrs.lat);
          var lng = scope.$eval(attrs.lng);


          var myLatlng = new google.maps.LatLng(lat,lng),
          mapOptions = {
              zoom: zValue,
              center: myLatlng,
			   mapTypeId: google.maps.MapTypeId.ROADMAP
          },
          map = new google.maps.Map(element[0],mapOptions),
          marker = new google.maps.Marker({
			    position: myLatlng,
			    map: map,
				icon: 'img/station.png',
			    draggable:true
		  });

		  google.maps.event.addListener(marker, 'dragend', function(evt){
		    scope.$parent.station.latitude = evt.latLng.lat();
		    scope.$parent.station.longitude = evt.latLng.lng();
		    scope.$apply();
		  });


        }
    };
})

.controller('stationDetailCtrl', function($scope,stationData,$ionicPopup) {

	var data = stationData.getProperty();
		if(data=='')
		{console.log("Could not get station details");}

            $scope.name=data.name;
			$scope.description=data.description;
			$scope.address=data.address;
			$scope.contact=data.contact;
			$scope.email=data.email;
			$scope.website=data.website;




	  $scope.call = function () {
		  if(data.contact=='')
			  {$ionicPopup.alert({ template: 'contact not provided!!'});}
			  else
        window.open('tel:' + data.contact, '_system');
      };

      $scope.mail = function () {
		  if(data.email=='')
			  {$ionicPopup.alert({ template: 'Email not provided!!'});}
			  else
				window.open('mailto:' + data.email, '_system');
      };

      $scope.website = function () {
		  if(data.website=='')
			  {$ionicPopup.alert({ template: 'Weblink not provided!!'});}
		  else
			window.open(data.website, '_system');
      };





})
.service('stationData', function () {
        var property = '';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    })


.controller('mapCtrl', function($scope,$cordovaGeolocation,$firebase,stationData,$location) {
        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
					icon: 'img/me.png'

                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here I am!"
                });

                var firebaseObj = new Firebase("https://snev.firebaseio.com/Stations_Details");


                firebaseObj.on("child_added", function(snapshot, prevChildKey){


                        var station = snapshot.val();
                        var markerPos = new google.maps.LatLng(station.latitude, station.longitude);


                        var stations = new google.maps.Marker({
                            map:$scope.map,
                            animation: google.maps.Animation.DROP,
                            position: markerPos,
                            icon: 'img/station.png'
                        });




						 google.maps.event.addListener(stations, 'click', function () {
							 //var id = snapshot.key();
							 var data = snapshot.val();
							 stationData.setProperty(data);
							 $location.path("/stationDetail");
						     window.location.assign("#/stationDetail");
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
.controller('posthistroy', function($scope) {

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

	$scope.addComment = function(comment,title) {
		var title1=title;



	//get key of child equals to ==title
	  var ref = new Firebase("https://snev.firebaseio.com/posts");
	ref.orderByChild("title").equalTo(title1).on("child_added", function(snapshot) {
	  var value=snapshot.key();
		alert(value);

		//add comments
		var messageListRef = new Firebase('https://snev.firebaseio.com/comments');
	var newMessageRef = messageListRef.push();
	 newMessageRef.set({ 'title': title1, 'comment':comment  , 'username': 'usernamevar', 'noOfLikes': 0,'noOfDisLikes': 0  });
	 var path = newMessageRef.toString();

		 $scope.comment="";

	});


  };

	// $scope.postForm = function(title,description){
	// 		    var messageListRef = new Firebase('https://snev.firebaseio.com/posts');
	//      var newMessageRef = messageListRef.push();
	//        newMessageRef.set({ 'title': title, 'description': description ,'image': 'imagelocation', 'username': 'usernamevar', 'noOfLikes': 0,'noOfDisLikes': 0  });
	//        var path = newMessageRef.toString();
	//
	//          $scope.title="";
	//          $scope.description="";
	//   };


//get key of child equals to ===
//   var ref = new Firebase("https://snev.firebaseio.com/posts");
// ref.orderByChild("username").equalTo(1).on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });





})

//get key of child equals to ===




.controller('myPostCtrl', function($scope){


  var ref = new Firebase("https://snev.firebaseio.com/posts");
  ref.orderByChild("username").equalTo(1).on("child_added", function(snapshot) {
        $scope.myposts = snapshot.val();

  console.log(snapshot.val());
  });


})


 //asanka end
