'use strict';

describe('Gallery Item Component', function() {

  beforeEach(() => {
    angular.mock.module('cfgram'); //eslint-disable-line
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService, galleryService) => { //eslint-disable-line
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.galleryService = galleryService;
    });
  });

  describe('galleryItemCtrl.deleteDone', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('12345');
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteDone({ galleryData: galleryItemCtrl.gallery });

      this.$rootScope.$apply();
    });
  });

  describe('galleryItemCtrl.deleteGallery', () => {
    it('should delete a gallery', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data._id).toEqual(mockBindings.gallery._id);
          expect(data.name).toEqual(mockBindings.gallery.name);
        }
      };

      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json'
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/12345', headers)
      .respond(204, {});

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
