// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



.controller ('appController', ['$window', '$state', '$http', '$scope', '$ionicModal', function ($window, $state, $http, $scope, $ionicModal) {
    
    $(document).ready(function () {
       //console.log($scope.newsAmt);
        $('.list').flip({
            effect: 'flip',
            forwardDir: 'btot',
            height: $window.innerHeight,
        }); 
    });

    //load the list from time to time
    $scope.realodApp = (function () {
        $http.get('http://hemencoolapp.orgfree.com/newsApp/Views/AppService.php?request=6')
        .success (function (data){
            if (data.data.length > 0) {
                $scope.news     = data.data;  
            } else {
                $scope.news     = [{
                    'image'     :null,
                    'subject'   :'No News Subject To Display',
                    'date'      :'---, --- --, --',
                    'txt'       :'No News Item To Display',
                }];
            }
        });
    });


    $scope.news     = [{
        'image'     :null,
        'subject'   :'No News Subject To Display',
        'date'      :'---, --- --, --',
        'txt'       :'No News Item To Display',
    }];
    
    //http://hemencoolapp.orgfree.com/newsApp/Views/AppService.php?request=6
    //http://hemencoolapp.orgfree.com/newsApp/Views/AppService.php?request=6
    
    $http.get('http://hemencoolapp.orgfree.com/newsApp/Views/AppService.php?request=6')
    .success (function (data){
        if (data.data.length > 0) {
            $scope.news     = data.data;  
        } else {
            $scope.news     = [{
                'image'     :null,
                'subject'   :'No News Subject To Display',
                'date'      :'---, --- --, --',
                'txt'       :'No News Item To Display',
            }];
        }
    });
    
    
    $scope.Popup    = (function ($url) {
        $ionicModal.fromTemplateUrl($url, {
            scope : $scope,
            animation: 'slide-in-left'
        }).then (function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    });
    
    $scope.readMessage = (function ($id){
        // load the expected news item
        $scope.uri = "modal.html";
        $scope.Popup($scope.uri);
        
        $scope.newsItem = $scope.news[$id];
    });
}])
