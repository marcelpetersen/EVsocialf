(function() {
  'use strict';

  angular
    .module('app.services', [])

    function RoomFactory($firebaseArray) {
        var ref = new Firebase('https://snev.firebaseio.com/');
        var rooms = $firebaseArray(ref.child('rooms'));
        var messages = $firebaseArray(ref.child('messages'));

        return {
          allRooms: rooms,
          room: function(roomId) {
            return rooms.$getRecord(roomId);
          },

          messages: function(roomId) {
            return $firebaseArray(ref.child('messages').orderByChild('roomId').equalTo(roomId));
          },

          send: function(newMessage, roomId) {
            return messages.$add({
              username: 'jkj',
              content: newMessage,
              sentAt: Firebase.ServerValue.TIMESTAMP,
              roomId: roomId
            });
          },







        }
      }

      angular
        .module('app')
        .factory('RoomFactory', ['$firebaseArray', RoomFactory])




})();
