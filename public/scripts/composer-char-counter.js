$(document).ready(function() {
  $("textarea").on("keyup", function(event) {
    const textLength = this.value.length;
    console.log(textLength);
    
    const div = $(event.target).siblings("div")[0];
    const counter = $(div).children(".counter")[0];
    console.log(counter);

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
