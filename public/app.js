
$(document).ready(function () {







    // $.getJSON("/odds", function(data) {

    //     $(".noarticles").addClass("hidden");

    //     $(".alert").append("<h1>Super Bowl Odds</h1>");

    //  for (var i = 0; i< data.length; i ++) {
    //      $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Make a Note</button><br/><br/><br/>"); 

    //  }

    // })



    $("#bottomLink").click(function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (data) {
            var team = data[0].team;
            var odds = data[0].odds;
            console.log("team", team)
            console.log("odds", odds)
            $.ajax({
                method: "GET",
                url: "/odds"
            }).then(function (data) {
                console.log("here is the data"+ data);
                $(".noarticles").addClass("hidden");

                $(".alert").append("<h1>Super Bowl Odds</h1>");
                $(".alert").html("");

                for (var i = 0; i < data.length; i++) {
                    $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Save this!</button><br/><br/><br/>");

                }

            })
        })
        console.log("I can hear you")
    })



    $("#what").click(function () {
        $.ajax({

         

            method: "GET",
            url: "/scrape"
        }).then(function (data) {
            console.log("Can you hear me? ")
            var team = data[0].team;
            var odds = data[0].odds;
            console.log("team", team)
            console.log("odds", odds)
            $.ajax({
                method: "GET",
                url: "/odds"
            }).then(function (data) {
                console.log("here is the data" + data);
                $(".noarticles").addClass("hidden");

                $(".alert").append("<h1>Super Bowl Odds</h1>");
                $(".alert").html("");

                for (var i = 0; i < data.length; i++) {
                    $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Save this!</button><br/><br/><br/>");

                }

            })
        })
       
        console.log("I can hear you")
      
        
    })


    $(document).on("click","p",function(){

        $("notes").empty();
        var thisId = $(this).attr("data-id");
        console.log("thisID" + thisId);

        $.ajax({
            method: "GET",
            url: "/odds/" +thisId
        })
        .then(function(data){
            console.log(data);
            

            
            


        })


    })

  



    //   console.log("help")
    //     $.getJSON("/scrape",function (data){
    //         console.log(data);
    //     }).done(function() {

    // console.log("itsworking");

    // $.getJSON("/odds", function (data) {

    //     $(".noarticles").addClass("hidden");

    //     $(".alert").append("<h1>Super Bowl Odds</h1>");

    //     for (var i = 0; i < data.length; i++) {
    //         $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Make a Note</button><br/><br/><br/>");

    //     }

    // })


    // })


})
// });


//This was my original code. 

// $.getJSON("/odds", function(data) {

//     $(".noarticles").addClass("hidden");

//     $(".alert").append("<h1>Super Bowl Odds</h1>");

//  for (var i = 0; i< data.length; i ++) {
//      $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Make a Note</button><br/><br/><br/>"); 

//  }
   
// })



// $("#bottomLink").click(function () {
  
//     $.getJSON("/scrape",function (data){
//         console.log(data);
//     }).done(function() {

// console.log("itsworking");

// $.getJSON("/odds", function (data) {

//     $(".noarticles").addClass("hidden");

//     $(".alert").append("<h1>Super Bowl Odds</h1>");

//     for (var i = 0; i < data.length; i++) {
//         $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<button type ='button' data-id ='" + data[i]._id + "'>Make a Note</button><br/><br/><br/>");

//     }

// })

    
// })


// })
