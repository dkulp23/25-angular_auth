'use strict';

const url = `${__API_URL__}/api/gallery`; //eslint-disable-line

describe('Gallery Service', function() {

  beforeEach(() => {
    angular.mock.module('cfgram'); //eslint-disable-line
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend, $log) => { //eslint-disable-line
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
      this.$log = $log;
    });
  });

  describe('galleryService.createGallery', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'example gallery',
        desc: 'example description'
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectPOST(url, galleryData, headers)
      .respond(200, {
        _id: '1234',
        username: 'testuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.deleteGallery', () => {
    it('should delete a gallery', () => {
      let galleryData = {
        _id: '1234',
        name: 'example gallery',
        desc: 'example description'
      };

      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json'
      };

      this.$httpBackend.expectDELETE(`${url}/${galleryData._id}`, headers)
      .respond(204, {});

      this.galleryService.deleteGallery(galleryData._id);
      this.$log.debug('this', this);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
