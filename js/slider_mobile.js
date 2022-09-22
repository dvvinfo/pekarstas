$(document).ready(function () {
  var owl;
  owl = $(".room-content-mobile__slider").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoHeight: true,
    pagination: true,
    dotsData: true,
    dotsContainer: ".page-layout-slider__dots",
  });

  $(".page-layout-slider__dots").on(
    "click",
    ".room-content-tab__item ",
    function () {
      owl.trigger("to.owl.carousel", [jQuery(this).index(), 300]);
    }
  );
});
