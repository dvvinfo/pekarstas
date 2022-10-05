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

  var owl = $(".academy-slider"),
    // rangeArr = [],
    inputType = $(".slider-range__input");
  owl.owlCarousel({
    items: 1,
    //loop: true,
    margin: 8,
    autoHeight: true,
    stagePadding: 10,
  });
  //   function getIndex(event) {

  //   }
  owl.on("changed.owl.carousel", function (event) {
    console.log(event.item.index);
    inputType.val(event.item.index);
  });
  $("input").on("change", function (e) {
    e.preventDefault();
    console.log(inputType.val());
    // console.log(e.item.index);
    // FIGURE OUT HOW TO GET CAROUSEL INDEX

    $(".academy-slider").trigger("to.owl.carousel", [inputType.val(), 1, true]);
  });
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});
