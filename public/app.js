
$(document).ready(function () {

   
    $("form").click(function () {

console.log("show yourself!")
    })

    //     console.log("I eat today")
    //     $.ajax({
    //         method: "GET",
    //         url: "/saved"
    //     }).then(function (data) {
    //         console.log("data" + data)

    //         var team = this.team;
    //         var odds = this.odds;
    //         console.log("team", team)
    //         console.log("odds", odds)
    //         $.ajax({
    //             method: "GET",
    //             url: "/odds"
    //         }).then(function (data) {
    //             console.log("here is the data" + data);
    //             $(".noarticles").addClass("hidden");

    //             $(".alert").append("<h1>Super Bowl Odds</h1>");
    //             $(".alert").html("");

    //             for (var i = 0; i < data.length; i++) {
    //                 $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<form action= '/saved' method = 'get'><input type= 'submit' class= 'odds' name='" + data[i].team + "' type ='button' value ='save this' data-id ='" + data[i]._id + "' data-team ='" + data[i].team + "' data-odds ='" + data[i].odds + "'></form><br/><br/><br/>");

    //             }

    //         })
    //     })
    //     console.log("I can hear you")

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
                    $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p>" + "<form class = 'odds'><input type= 'submit' name='" + data[i].team + "' type ='button' value ='save this' data-id ='" + data[i]._id + "' data-team ='" + data[i].team + "' data-odds ='" + data[i].odds +"'></form><br/><br/><br/>");

                }

            })
        })
        console.log("I can hear you")
       
    })


    // $(document).on("click","p",function(){

    //     $("notes").empty();
    //     var thisId = $(this).attr("data-id");
    //     console.log("thisID" + thisId);

    //     $.ajax({
    //         method: "GET",
    //         url: "/odds/" +thisId
    //     })
    //     .then(function(data){
    //         console.log(data);
            

            
            


    //     })


    // })



})
