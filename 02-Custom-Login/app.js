(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', '$locationProvider', 'angularAuth0Provider', '$urlRouterProvider', 'jwtOptionsProvider'];

  function config($stateProvider, $locationProvider, angularAuth0Provider, $urlRouterProvider, jwtOptionsProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
        controllerAs: 'vm'
      });

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      responseType: 'token id_token',
      audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
      redirectUri: AUTH0_CALLBACK_URL
    });

    // Configure a tokenGetter so that the isAuthenticated
    // method from angular-jwt can be used
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });

    $urlRouterProvider.otherwise('/home');

    // Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix('');

  }

})();
