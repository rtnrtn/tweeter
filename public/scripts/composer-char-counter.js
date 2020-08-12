$(document).ready(function() {
  $("textarea").on("keyup", function(event) {
    const textLength = this.value.length;
    const div = $(event.target).siblings("div")[0];
    const counter = $(div).children(".counter")[0];
    const remainingChars = 140 - textLength;
    
    $(".counter")[0].innerHTML = remainingChars;
    let color = "#545149";
    if (remainingChars <= 0) {
      color = "#FF0000";
    } else {
      color = "#545149";
    }
    $(".counter").css('color', color);

  });

});
