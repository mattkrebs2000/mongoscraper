
$(document).ready(function () {

//This loads the page with saved odds coincides with Server.js line 120. 

   $.ajax({
    method: "GET",
    url: "saved"
   }).then(function(data) {
       for (var i = 0; i < data.length; i++) {
           $("#savedones").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "  " + data[i].odds + "	&nbsp;<button class ='delete' data-id='" + data[i]._id + "'>Delete</button> &nbsp; <button class ='makenote' data-id='" + data[i]._id + "'>Make a Note</button></p> <br/><br/><br/>");
       }

    console.log("we have data + " + data);


   })


//This Gets and then brings the odds to browser. It coincides with server.js line 44 and line 139.

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


//This saves to the db and coincides with server.js line 161. 

//This is linked to save buttons. I can get a team to show up but want to reload with the new data. Where do I put the code see comment on line 67 that has it reload it? 

    $(document).on("click",".save",function(){

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/odds/" + thisId
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {

//If this would refresh this would update the saved but it doesn't work. 

                $("#savedones").append("<p data-id='" + data[i]._id + "'>" + data[i].team + "  " + data[i].odds + "	&nbsp;<button class ='delete' data-id='" + data[i]._id + "'>Delete</button> &nbsp; <button class ='makenote' data-id='" + data[i]._id + "'>Make a Note</button></p> <br/><br/><br/>");
            }

            console.log("we have data + " + data);
        })
    })

//This is linked to the delete buttons. This code also deletes from the database however I don't know where to put the refreshed Saved inventory. It doesn't refresh on click which I would like it to. 

    $(document).on("click", ".delete", function () {

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/deleteodds/" + thisId
         }).then(function (data){
          for (var i = 0; i < data.length; i++) {
            $("#savedones").append(
              "<p data-id='" +
                data[i]._id +
                "'>" +
                data[i].team +
                "  " +
                data[i].odds +
                "	&nbsp;<button class ='delete' data-id='" +
                data[i]._id +
                "'>Delete</button> &nbsp; <button class ='makenote' data-id='" +
                data[i]._id +
                "'>Make a Note</button></p> <br/><br/><br/>"
            );
          }

          console.log("we have data + " + data);
        });
    })




})

