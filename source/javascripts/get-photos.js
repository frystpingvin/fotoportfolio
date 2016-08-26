(function () {

  var pagesLoaded   = 0,
      loadingImages = true,
      photosPerPage = 3,
      instagramApi  = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=41682531.1677ed0.0345e6d7b61142afab3a948804bafcdc&count=' + photosPerPage + '&callback=?';

  var loading = function(boolean) {
    if (boolean) {
      loadingImages = true;
      $('.do-loading').show();
    } else {
      loadingImages = false;
      $('.do-loading').hide();
    }
    console.log('Loading: ' + boolean);
  }

  var getPhotos = function() {
    loading(true);

    var flickrApi     = 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=d608c9f0fefb8bda99a8ca1d3d8726b1&user_id=61937047@N07&&extras=date_upload&per_page=' + photosPerPage + '&page=' + (pagesLoaded + 1) + '&format=json&jsoncallback=?',
        photoArray    = [],
        flickrPhotos,
        instagramPhotos;

    console.log('insta api url: ' + instagramApi);

    $.when(
      $.getJSON(flickrApi, function(data) {
        flickrPhotos = data;
        console.log(data);
      }),
      $.getJSON(instagramApi, function(data) {
        instagramPhotos = data;
        console.log(data);
      })
    ).then(function() {

      // create flickr photo objects
      if (flickrPhotos) {
        $.each(flickrPhotos.photos.photo, function(i, photo){
          var photoObject = {};
          photoObject.url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
          photoObject.date = photo.dateupload;
          photoArray.push(photoObject)
        });
      } else {
        console.log('flickr photos failed to load');
      }

      // create ig photo objects
      if (instagramPhotos) {
        var photoSize   = "/s150x150/",
            regExp      = /\/c[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{3,4}\.[0-9]{3,4}\//;

        instagramApi = instagramPhotos.pagination.next_url + '&callback=?';

        $.each(instagramPhotos.data, function(i, photo) {
          var photoObject = {};
          photoObject.url   = photo.images.thumbnail.url.replace(photoSize, '/').replace(regExp, '/'); // 'hack' so it loads non-square media in largest availible size, thanks insta api
          photoObject.date  = photo.created_time;
          photoArray.push(photoObject);
        });
      } else {
        console.log('insta photos failed to load');
      }

      photoArray.sort(function(a, b) {
        return new Date(b.date * 1000) - new Date(a.date * 1000);
      });

      $.each(photoArray, function(i, photo) {
        $('.do-gallery').append('<img class="gallery-image" src=' + photo.url + '>');
      });

      loading(false);
      pagesLoaded++;
    });
  };

  getPhotos();

  $(window).scroll(function() {
    if( loadingImages == false && $(window).scrollTop() + $(window).height() == $(document).height() ) {
      getPhotos();
    }
  });

}());
