// change navbar transparency on scroll

$(document).ready(function () {
  $(window).scroll(function () {
    console.log("here");
    if ($(document).scrollTop() > 1) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });
});
