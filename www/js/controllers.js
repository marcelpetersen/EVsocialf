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

	    var fb = new Firebase("https://snev.firebaseio.com/Stations_Details");

	    fb.push({
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

//creating a chat room
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

//remove a chat room
  $scope.deleteRoom = function(room) {
    $scope.rooms.$remove(room);
  };


})

//send message
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


.controller('tempuser', function($scope) {

  $scope.makeTempUser = function(user1) {
    window.localStorage.clear();
  window.localStorage.setItem("user",user1);


  };
})


//post controller
.controller('postCtrl', function($scope ,$ionicPopup){
	var ref = new Firebase('https://snev.firebaseio.com/posts');
	 var ref2 = new Firebase('https://snev.firebaseio.com/comments');


	 		$scope.addlike = function(title) {

	 			var title1=title;

					//get key of child equals to ==title
					  var ref = new Firebase("https://snev.firebaseio.com/posts");
					  ref.orderByChild("title").equalTo(title1).on("child_added", function(snapshot) {
					  var value=snapshot.key();
						var data = snapshot.val();
						var noofl=data.noOfLikes;


                var alertPopup = $ionicPopup.alert({
                  title: 'Successful! <i class="ion-checkmark-round"></i>',
                  template:'You have Successfuly liked the post'
                  });

							var postsref = new Firebase('https://snev.firebaseio.com/posts');


												// Modify the 'noOfLikes  but leave other data unchanged
										postsref.child(value).update({ noOfLikes: noofl+1});

						});

          };


		 $scope.adddislike = function(title1) {


	         var username=window.localStorage.getItem("user");
		 					//get key of child equals to ==title
		 					  var ref = new Firebase("https://snev.firebaseio.com/posts");
		 				   	ref.orderByChild("title").equalTo(title1).on("child_added", function(snapshot) {
		 					  var value=snapshot.key();
		 						var data = snapshot.val();
		 						var noofl=data.noOfDisLikes;


                               var alertPopup = $ionicPopup.alert({
                                 title: 'Successful! <i class="ion-checkmark-round"></i>',
                                 template:'You have Successfuly dislied the post'
                              	 });

		 										var postsref = new Firebase('https://snev.firebaseio.com/posts');

		 											postsref.child(value).update({ noOfDisLikes: noofl+1});
		 						});
		 };


     // report a post
  	 $scope.report = function(title1) {

  //  alert("username"+$rootScope.test);
  		// 	var username= $rootScope.test;
          var username=window.localStorage.getItem("user");

  		 				 //get key of child equals to ==title
  		 					 var ref = new Firebase("https://snev.firebaseio.com/posts");
  		 				   ref.orderByChild("title").equalTo(title1).on("child_added", function(snapshot) {
  		 					 var value=snapshot.key();
  		 					 var data = snapshot.val();
  		 					 var noof2=data.noOfReports;


                   var alertPopup = $ionicPopup.alert({
                   title: 'Successful! <i class="ion-checkmark-round"></i>',
                   template:'You have Successfuly Reported'
                	 });
  		 									 var postsref = new Firebase('https://snev.firebaseio.com/posts');
  		 									 postsref.child(value).update({ noOfReports: noof2+1});
	        });

	    };


		ref.on("value", function(snapshot,prevChildKey) {
		  $scope.$apply(function(){
			$scope.posts = snapshot.val();
			//console.log(prevChildKey.key());

		  });
		});

		ref2.on("value", function(snapshot) {
		  $scope.$apply(function(){
			$scope.comments = snapshot.val();

		  });
		});
})


//post controller
.controller('mypostCtrl', function($scope ,$ionicPopup){

	var ref = new Firebase('https://snev.firebaseio.com/posts');
  var username=window.localStorage.getItem("user");

		 ref.orderByChild("username").equalTo(username).on("value", function(snapshot,prevChildKey) {
		  $scope.$apply(function(){
			$scope.myposts = snapshot.val();
	//		console.log(prevChildKey.key());

		  });
		});

})



.controller('cmntController', function($scope ,$ionicPopup,$location) {

	$scope.addComment = function(comment,title1) {

	//get key of child equals to ==title
	  var ref = new Firebase("https://snev.firebaseio.com/posts");
  	ref.orderByChild("title").equalTo(title1).on("child_added", function(snapshot) {
	  var value=snapshot.key();

    var username=window.localStorage.getItem("user");

		//adding  comments
		var messageListRef = new Firebase('https://snev.firebaseio.com/comments');
		var newMessageRef = messageListRef.push();
	 newMessageRef.set({ 'title': title1, 'comment':comment  , 'username': username, 'noOfLikes': 0,'noOfDisLikes': 0  });
	 var path = newMessageRef.toString();


    var alertPopup = $ionicPopup.alert({
      title: 'Successful! <i class="ion-checkmark-round"></i>',
      template:'You have Successfuly Commented'
      });
		 		$scope.comment="";

		});
  };
})

// viewing post
.controller('viewpostController', function($scope ,$ionicPopup,$location) {

//adding a comment
	$scope.addComment = function(comment,title1) {

	//get key of child equals to ==title
	  var ref = new Firebase("https://snev.firebaseio.com/posts");
	ref.orderByChild("title").equalTo(title1).on("child_added", function(snapshot) {
	  var value=snapshot.key();




		//add comments
		var messageListRef = new Firebase('https://snev.firebaseio.com/comments');
		var newMessageRef = messageListRef.push();
	 newMessageRef.set({ 'title': title1, 'comment':comment  , 'username': 'usernamevar', 'noOfLikes': 0,'noOfDisLikes': 0  });
	 var path = newMessageRef.toString();

	 var alertPopup = $ionicPopup.alert({
			template: '<i class="ion-checkmark-round"></i> Successfully commented  '
	 	});
		 		$scope.comment="";

		});
  };
})


//get selected post and store
.controller('newselect', function($scope ,$ionicPopup,$location,$window) {

	$scope.setSelectedPost = function(title1) {
    window.localStorage.clear();
  window.localStorage.setItem("settitle",title1);
  	};
  })



  // get selected post deatils ; load comments and posts
  .controller('getSelectedpost', function($scope ,$ionicPopup,$window){

	var SelectdP=window.localStorage.getItem("settitle");
  // alert(SelectdP);

  	var ref = new Firebase('https://snev.firebaseio.com/posts');
    var ref2 = new Firebase('https://snev.firebaseio.com/comments');


         ref2.orderByChild("title").equalTo(SelectdP).on("value", function(snapshot,prevChildKey) {
           $scope.mycomments = snapshot.val();
           	console.log(snapshot.val());
            });


  		  ref.orderByChild("title").equalTo(SelectdP).on("value", function(snapshot,prevChildKey) {
  		  $scope.$apply(function(){
  			$scope.myposts = snapshot.val();
  		//	console.log(prevChildKey.key());

  		        });
	       });

  })


//  update post controller
.controller('postUpdateCtrl', function($scope ,$ionicPopup,$location,$window) {
	var SelectdP=window.localStorage.getItem("settitle");
	$scope.updatePost = function(title1,description) {

    var ref = new Firebase('https://snev.firebaseio.com/posts');


      ref.orderByChild("title").equalTo(SelectdP).on("child_added", function(snapshot) {
        var value=snapshot.key();

        	ref.child(value).update({ title: title1});


        });

        var alertPopup = $ionicPopup.alert({
        title: 'Successful! <i class="ion-checkmark-round"></i>',
        template:'You have Successfuly Updated'
         });

  	};
  })



 //asanka end


//view user records
.controller('adminUserRecordsCtrl', function($scope) {

   var ref = new Firebase('https://snev.firebaseio.com/users');
     //var ref2 = new Firebase('https://snev.firebaseio.com/comments');


        ref.on("value", function(snapshot) {
          $scope.$apply(function(){
            $scope.posts = snapshot.val();

          });
        });



})

//view station records
.controller('adminStationRecordsCtrl', function($scope) {

    var ref = new Firebase('https://snev.firebaseio.com/Stations_Details');
     //var ref2 = new Firebase('https://snev.firebaseio.com/comments');


        ref.on("value", function(snapshot) {
          $scope.$apply(function(){
            $scope.posts = snapshot.val();

          });
        });
})

//user view notices------------------------------------------------------------------
.controller('viewNewsPageCtrl', function($scope) {
	 var viewNewsRef1 = new Firebase('https://snev.firebaseio.com/notice');

	 	viewNewsRef1.on("value", function(snapshot) {
           $scope.$apply(function(){
             $scope.posts = snapshot.val();

           });


              var alertPopup = $ionicPopup.alert({
              title: 'Successful! <i class="ion-checkmark-round"></i>',
              template:'You have Successfuly Updated'
             	 });
         });
})


// admin create notice----------------------------------------------------------------------
.controller('noticeController', function($scope, $http, $state,$ionicPopup) {
  $scope.noticePostForm = function(topic,date,notice) {

    var noticeRef1 = new Firebase('https://snev.firebaseio.com/notice');
     var noticeRef1 = noticeRef1.push();


//pass the data to DB ---------------------------------------------------------------
     var noticeID = noticeRef1.key();
       noticeRef1.set({ 'topic': topic,   'date':date ,'notice': notice  });
       var path = noticeRef1.toString();


   var alertPopup = $ionicPopup.alert({
     title: 'Successful! <i class="ion-checkmark-round"></i>',
     template:'You have Successfuly added the notice'
  	 });


         $scope.topic="";
         $scope.date="";
         $scope.notice="";

//----------------------------------------------------------------------------------

  };

//End create notice-------------------------------------------------------------------------

//Cleare the fields.------------------------------------------------
  $scope.noticePostForm2 = function(topic,date,notice) {
  		$scope.topic="";
         $scope.date="";
         $scope.notice="";
  };
});
