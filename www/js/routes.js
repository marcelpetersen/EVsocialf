angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider





  .state('welcomeEVUser', {
    url: '/login',
    templateUrl: 'templates/welcomeEVUser.html',
    controller: 'welcomeEVUserCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'mapCtrl'
  })

  .state('socialNetwork', {
    url: '/socialnetwork',
    templateUrl: 'templates/socialNetwork.html',
    controller: 'socialNetworkCtrl'
  })

  .state('messenger', {
    url: '/messenger',
    templateUrl: 'templates/messenger.html',
    controller: 'messengerCtrl'
  })

  .state('itemsForSale', {
    url: '/revenue',
    templateUrl: 'templates/itemsForSale.html',
    controller: 'itemsForSaleCtrl'
  })

  .state('adminHomepage', {
    url: '/adminhome',
    templateUrl: 'templates/adminHomepage.html',
    controller: 'adminHomepageCtrl'
  })

  .state('acceptNewStation', {
    url: '/adminacceptstation',
    templateUrl: 'templates/acceptNewStation.html',
    controller: 'acceptNewStationCtrl'
  })

  .state('acceptRevenue', {
    url: '/adminacceptrev',
    templateUrl: 'templates/acceptRevenue.html',
    controller: 'acceptRevenueCtrl'
  })

  .state('manageProfile', {
    url: '/myprofile',
    templateUrl: 'templates/manageProfile.html',
    controller: 'manageProfileCtrl'
  })

  .state('newsPage', {
    url: '/newspage',
    templateUrl: 'templates/newsPage.html',
    controller: 'newsPageCtrl'
  })

  .state('page', {
    url: '/page17',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('groupChat', {
    url: '/groupChat',
    templateUrl: 'templates/groupChat.html',
    //controller: 'RoomsCtrl'
  })

  .state('stationChat', {
    url: '/stationchat',
    templateUrl: 'templates/stationChat.html',
    controller: 'stationChatCtrl'
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'chatCtrl'
  })

  .state('posts', {
    url: '/posts',
    templateUrl: 'templates/posts.html',
    controller: 'postsCtrl'
  })

  .state('newPosts', {
    url: '/newPosts',
    templateUrl: 'templates/newPost.html',
    controller: 'userController'
  })
  .state('posthistroy', {
    url: '/posthistroy',
    templateUrl: 'templates/postHistory.html',

  })

  .state('chargingRecords', {
    url: '/chargingRecords',
    templateUrl: 'templates/chargingRecords.html',
    controller: 'chargingRecordsCtrl'
  })




  //asanka chat
  .state('chatroomhome', {
      url: '/chatroomhome',
      templateUrl: '/templates/home1.html',
      controller: 'HomeCtrl'
    })
    .state('rooms', {
      url: '/rooms',
      templateUrl: '/templates/rooms.html',
      controller: 'RoomsListCtrl'
    })
    .state('room', {
      url: '/rooms/:roomId',
      templateUrl: '/templates/room.html',
      controller: 'RoomDetailCtrl'
    })

    // setup an abstract state for the tabs directive

    // Each tab has its own nav history stack:






  //

/*---------------ADMIN------------------------*/
  // .state('adminHomepage', {
  //   url: '/adminhome',
  //   templateUrl: 'templates/adminHomepage.html',
  //   controller: 'adminHomepageCtrl'
  // })

 // admin user view
  .state('adminUserView', {
    url: '/userRecords',
    templateUrl: 'templates/adminUserView.html',
    controller: 'adminUserRecordsCtrl'
  })

  //admin station view
  .state('adminStationView', {
    url: '/stationRecords',
    templateUrl: 'templates/adminStationView.html',
    controller: 'adminStationRecordsCtrl'
  })
  
  //new add
  .state('makeAppointment', {
    url: '/appointment',
    templateUrl: 'templates/makeAppointment.html',
    controller: 'makeAppointmentCtrl'
  })
/***********------------------------------******************/


$urlRouterProvider.otherwise('/login')



});
