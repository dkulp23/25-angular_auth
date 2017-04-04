'use strict';

const url = 'http://localhost:3000/api/gallery';

describe('Gallery Service', function() {

  beforeEach(() => {
    angular.mock.module('cfgram'); //eslint-disable-line
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => { //eslint-disable-line
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
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
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
