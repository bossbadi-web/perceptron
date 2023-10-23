// change navbar transparency on scroll

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(document).scrollTop() > 1) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });
});
