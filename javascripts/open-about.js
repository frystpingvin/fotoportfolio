$(document).ready(function(){var o=$(".do-about"),s=$(".about"),t=!1;o.click(function(){t?(s.removeClass("do-open-about"),s.addClass("do-close-about"),$("body").css("position","static"),o.text("About"),t=!1):(s.addClass("do-open-about"),s.removeClass("do-close-about"),$("body").css("position","fixed"),o.text("Close"),t=!0)})});