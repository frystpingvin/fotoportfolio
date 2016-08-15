// This is where it all goes :)
var pagesLoaded   = 0,
    loadingImages = true,
    instagramApi  = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=41682531.1677ed0.0345e6d7b61142afab3a948804bafcdc&count=4&callback=?';

var getPhotos = function() {
  console.log('pages loaded: ' + pagesLoaded);
  var flickrApi     = 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=d608c9f0fefb8bda99a8ca1d3d8726b1&user_id=61937047@N07&&extras=date_upload&per_page=4&page=' + (pagesLoaded + 1) + '&format=json&jsoncallback=?',
      photoArray    = [],
      flickrPhotos,
      instagramPhotos;

  console.log('insta api url: ' + instagramApi);

  $.when(
    $.getJSON(flickrApi, function(data) {
      flickrPhotos = data;
    }),
    $.getJSON(instagramApi, function(data) {
      instagramPhotos = data;
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
    }
    else {
      console.log('flickr photos failed to load');
    }

    // create ig photo objects
    if (instagramPhotos) {
      var photoSize   = "/s150x150/",
          regExp      = /\/c[0-9]{3}\.[0-9].[0-9]{3}\.[0-9]{3}\//,
          instagramApi = instagramPhotos.pagination.next_url + '&callback=?';

      $.each(instagramPhotos.data, function(i, photo) {
        var photoObject = {};
        // The first and second line under this should be probably be more effective
        var url = photo.images.thumbnail.url.replace(photoSize, '/');
        photoObject.url   = url.replace(regExp, '/');
        photoObject.date  = photo.created_time;
        photoArray.push(photoObject);
      });
    }
    else {
      console.log('ig photos failed to load');
    }

    $.each(photoArray, function(i, photo) {
      $('.do-gallery').append('<img src=' + photo.url + '></div>');
    });

    loadingImages = false;
    $('loading').hide();
    pagesLoaded++;
  });
};

getPhotos();

console.log('this runs before GET is done');

$(window).scroll(function() {
  if( loadingImages == false && $(window).scrollTop() + $(window).height() == $(document).height() ) {
    console.log('Scrollbottom');

    loadingImages = true;
    $('.loading').show();

    getPhotos();
  }
});
