// This is where it all goes :)
var pagesLoaded = 0;

var getPhotos = function() {
  var apiUrl = 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=d608c9f0fefb8bda99a8ca1d3d8726b1&user_id=61937047@N07&per_page=8&page=' + (pagesLoaded + 1) + '&format=json&jsoncallback=?';

  $.getJSON(apiUrl,
    function(data) {
      $.each(data.photos.photo, function(i, photo){
        var src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_h.jpg';
        $('.do-gallery').append('<img src=' + src + ' alt=' + photo.title + ' ></div>')
      });
    }
  );

  pagesLoaded++;
  console.log(apiUrl);
};

$(function() {
  getPhotos()
});

$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
    console.log('Scrollbottom');
    getPhotos()
  }
});
