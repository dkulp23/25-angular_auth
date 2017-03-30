'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`; //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;//eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('got your galleries');
      let galleries = res.data;
      service.galleries = galleries;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleries = function(galleryID, galleryData) {
    $log.debug('galleryService.deleteGalleries');
    $log.log(galleryData);
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`; //eslint-disable-line
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('gallery removed');
      return JSON.parse(res.status);
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  return service;
}
