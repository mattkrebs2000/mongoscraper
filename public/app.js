
$(document).ready(function () {

   $.ajax({
    method: "GET",
    url: "saved"
   }).then(function(data) {
       for (var i = 0; i < data.length; i++) {
           $("#savedones").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "  " + data[i].odds + "	&nbsp;<button class ='delete' data-id='" + data[i]._id + "'>Delete</button> &nbsp; <button class ='makenote' data-id='" + data[i]._id + "'>Make a Note</button></p> <br/><br/><br/>");
       }

    console.log("we have data + " + data);


   })




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
                    $(".alert").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "<br />" + data[i].odds + "</p><button class = 'save' data-id='" + data[i]._id +"'>save</button> <br/><br/><br/>");

                }

            })
        })
        console.log("I can hear you")
       
    })




    $(document).on("click",".save",function(){

        $.ajax({
            method: "GET",
            url: "saved"
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#savedones").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "  " + data[i].odds + "	&nbsp;<button class ='delete' data-id='" + data[i]._id + "'>Delete</button> &nbsp; <button class ='makenote' data-id='" + data[i]._id + "'>Make a Note</button></p> <br/><br/><br/>");
            }

            console.log("we have data + " + data);
        })
    })


    $(document).on("click", ".delete", function () {

        $.ajax({
            method: "GET",
            url: "saved"
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#savedones").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "  " + data[i].odds + "	&nbsp;<button class ='delete' data-id='" + data[i]._id + "'>Delete</button> &nbsp; <button class ='makenote' data-id='" + data[i]._id + "'>Make a Note</button></p> <br/><br/><br/>");
            }

            console.log("we have data + " + data);
        })
    })




})

