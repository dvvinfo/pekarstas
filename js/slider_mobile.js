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

  // ============================= проверка на разакшкние экрана <= 576 ==================================
  $(window)
    .on("resize", function () {
      if ($(window).width() <= 576) {
        $("#myTabContent1").addClass("academy-slider__tab");
        $(".academy-tabs__wrapper").addClass("academy-slider__wrapper");
        $(".academy-tabs__nav-tabs").addClass("academy-slider");
      } else {
        $("#myTabContent1").removeClass("academy-slider__tab");
        $(".academy-tabs__wrapper").removeClass("academy-slider__wrapper");
        $(".academy-tabs__nav-tabs").removeClass("academy-slider");
      }
    })
    .trigger("resize");

  // ================================== мобильная карусель кнопок академии =======================
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

  // ========================================= мобильная карусель табов академии ========================
  var owl = $(".academy-slider__tab"),
    // rangeArr = [],
    inputType = $(".slider-range__input");
  owl.owlCarousel({
    items: 1,
    //loop: true,
    margin: 8,
    autoHeight: true,
  });

  owl.on("changed.owl.carousel", function (event) {
    console.log(event.item.index);
    inputType.val(event.item.index);
  });
  $("input").on("change", function (e) {
    e.preventDefault();
    console.log(inputType.val());
    // console.log(e.item.index);
    // FIGURE OUT HOW TO GET CAROUSEL INDEX

    $(".academy-slider__tab").trigger("to.owl.carousel", [
      inputType.val(),
      1,
      true,
    ]);
  });
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});
