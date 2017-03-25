// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('main', ['ionic', 'main.controllers', 'ngCordova', 'addRemote', 'nodes', 'discoverNode', 'deleteRemote', 'scripts','recordRemote', 'modifyScript', 'execute'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('app.execute', {
        url: '/execute',
        views: {
          'menuContent': {
            templateUrl: 'templates/execute.html',
            controller: 'executeCtrl'
          }
        }
      })
      .state('app.addremote', {
        url: '/addremote',
        views: {
          'menuContent': {
            templateUrl: 'templates/addRemote.html',
            controller: 'addRemoteCtrl'
          }
        }
      })

      .state('app.recordremote', {
        url: '/recordremote',
        views: {
          'menuContent': {
            templateUrl: 'templates/recordRemote.html',
            controller: 'recordRemoteCtrl'
          }
        }
      })

      .state('app.scripts', {
        url: '/scripts',
        views: {
          'menuContent': {
            templateUrl: 'templates/scripts.html',
            controller: 'scriptsCtrl'
          }
        }
      })

      .state('app.modifyScript', {
        url: '/modifyscript',
        views: {
          'menuContent': {
            templateUrl: 'templates/modifyScript.html',
            controller: 'modifyScriptCtrl'
          }
        }
      })

      .state('app.nodes', {
        url: '/nodes',
        views: {
          'menuContent': {
            templateUrl: 'templates/nodes.html',
            controller: 'nodesCtrl'
          }
        }
      })

      .state('app.discovernode', {
        url: '/discovernode',
        views: {
          'menuContent': {
            templateUrl: 'templates/discovernode.html',
            controller: 'discoverNodeCtrl'
          }
        }
      })

      .state('app.deleteremote', {
        url: '/deleteremote',
        views: {
          'menuContent': {
            templateUrl: 'templates/deleteRemote.html',
            controller: 'deleteRemoteCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
