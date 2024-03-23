// change navbar transparency on scroll

$(document).ready(() => {
  $(window).scroll(() => {
    if ($(document).scrollTop() > 1) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });
});
