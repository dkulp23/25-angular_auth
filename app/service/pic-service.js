'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('picService.uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`; //eslint-disable-line
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      })
      .then( res => {
        $log.debug('galleryData', galleryData);
        galleryData.pics.unshift(res.data);
        $log.debug('pics array', galleryData.pics);
        return res.data;
      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    });
  };

  service.deleteGalleryPic = function(galleryData, picData) {
    $log.debug('picService.deleteGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`; //eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log(res);
      for (let i = 0; i < galleryData.pics.length; i++) {
        let current = galleryData.pics[i];
        if (current._id === picData._id) {
          galleryData.pics.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
