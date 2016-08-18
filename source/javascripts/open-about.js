$(document).ready(function() {
  var aboutButton = $('.do-about'),
      aboutEl     = $('.about'),
      aboutOpen   = false;

  aboutButton.click(function () {
    if (!aboutOpen) {
      aboutEl.css('transform', 'translateX(0)');
      aboutButton.text('Close');
      aboutOpen = true;
    } else {
      aboutEl.css('transform', 'translateX(100%)');
      aboutButton.text('About');
      aboutOpen = false;
    }
  });
});
