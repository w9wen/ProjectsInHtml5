$(document).ready(function () {
  var items = $("#gallery li");
  var itemsByTags = [];

  // Loop through tags
  items.each(function (i) {
    var elem = $(this);
    var tags = elem.data("tags").split(",");

    // Add data attribute for quicksand
    elem.attr("data-id", i);
  });
});
