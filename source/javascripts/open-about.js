$(document).ready(function() {
  var aboutButton = $('.do-about'),
      aboutEl     = $('.about'),
      aboutOpen   = false;

  aboutButton.click(function () {
    if (!aboutOpen) {
      aboutEl.addClass('do-open-about');
      aboutEl.removeClass('do-close-about');
      aboutButton.text('Close');
      aboutOpen = true;
    } else {
      aboutEl.removeClass('do-open-about');
      aboutEl.addClass('do-close-about');
      aboutButton.text('About');
      aboutOpen = false;
    }
  });
});
