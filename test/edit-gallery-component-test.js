'use strict';

describe('Edit Gallery Component', function() {

  beforeEach( () => {
    angular.mock.module('cfgram'); //eslint-disable-line
    angular.mock.inject(($rootScope, $componentController, $httpBackend, $log, authService) => { //eslint-disable-line
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.$log = $log;
    });
  });

  it('should contain the proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'test gallery name',
        desc: 'test gallery description'
      }
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

    this.$rootScope.$apply();
  });

  describe('editGalleryCtrl.updateGallery', () => {
    it('should make a valid PUT request', () => {
      let url = 'http://localhost:3000/api/gallery/12345';//eslint-disable-line
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectPUT(url, {
        _id: '12345',
        name: 'updated name',
        desc: 'updated desc'
      }, headers)
      .respond(200);

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'updated name',
          desc: 'updated desc'
        }
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.updateGallery(editGalleryCtrl.gallery._id, editGalleryCtrl.gallery);
      expect(editGalleryCtrl.gallery.name).toEqual('updated name');
      expect(editGalleryCtrl.gallery.desc).toEqual('updated desc');
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
