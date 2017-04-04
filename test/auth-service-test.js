'use strict';

describe('Auth Service', function() {
  beforeEach(() => {
    angular.mock.module('cfgram'); //eslint-disable-line
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => { //eslint-disable-line
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('authService.getToken', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test token');

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test token');
      })
      .catch( err => {
        expect(err).toEqual(null);
      });

      this.$rootScope.$apply();
    });
  });
});
