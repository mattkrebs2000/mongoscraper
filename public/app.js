


$.getJSON("/odds", function(data) {

    $(".noarticles").addClass("hidden");

    $(".alert").append("<h1>Super Bowl Odds</h1>");

 for (var i = 0; i< data.length; i ++) {
     $(".alert").append("<p data-id='"+ data[i]._id + "'>" +data[i].team + "<br />" + data[i].odds + "</p>"); 

 }
   
})



// $("#bottomLink").click(function () {
//     $(".alert").append("Super Bowl Odds");

//     $.getJSON("/odds", function(data) {
//  for (var i = 0; i< data.length; i ++) {
//      $(".alert").append("<p data-id='"+ data[i]._id + "'>" +data[i].team + "<br />" + data[i].odds + "</p>"); 

//  }
//     
// })



