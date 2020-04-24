


$.getJSON("/odds", function(data) {

    $(".noarticles").addClass("hidden");

    $(".alert").append("<h1>Super Bowl Odds</h1>");

 for (var i = 0; i< data.length; i ++) {
     $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Make a Note</button><br/><br/><br/>"); 

 }
   
})



$("#bottomLink").click(function () {
  
    $.getJSON("/scrape",function (data){
        console.log(data);
    }).done(function() {

console.log("itsworking");

$.getJSON("/odds", function (data) {

    $(".noarticles").addClass("hidden");

    $(".alert").append("<h1>Super Bowl Odds</h1>");

    for (var i = 0; i < data.length; i++) {
        $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Make a Note</button><br/><br/><br/>");

    }

})

    
})


})
