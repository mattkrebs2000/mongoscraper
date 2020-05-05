
$(document).ready(function () {

//This loads the page with saved odds coincides with Server.js line 123. It is required in order for the "Saveds" to show up on load. 

   $.ajax({
    method: "GET",
    url: "saved"
   }).then(function(data) {

    console.log("Each of you" + data);

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
               data[i].team +
               "' data-odds='" +
               data[i].odds +
               "'>Make a Note</button></p><br/>"
           );
          
            // for (var j=0; j<data[i].notes.length; j++){
            //     $("#savedones").append("<br/> title: " + data[i].notes[j]+".");

            // }

       }

   


   })


//This Gets and then brings the odds to browser. It coincides with server.js line 47 and line 144.

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


//This saves to the db and coincides with server.js line 166. 

//This is linked to save buttons. I can get a team to show up but want to reload with the new data. Where do I put the code see to reload it? 

    $(document).on("click",".save",function(){

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/odds/" + thisId
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {

//If this would refresh this would update the saved but it doesn't work. 

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
                    data[i].team +
                    "' data-odds='" +
                    data[i].odds +
                    "'>Make a Note</button></p> <br/><br/><br/>" 
                );
   

            }

            console.log("we have data + " + data);
        })
    })

//This is linked to the delete buttons. This code also deletes from the database however I don't know where to put the refreshed Saved inventory. It doesn't refresh on click which I would like it to. Linked to server.js 212. 

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
                data[i].team +
                "' data-odds='" +
                data[i].odds +
                "'>Make a Note</button></p> <br/><br/><br/>" +
                data[i].notes
            );
              
          }

          
        });
    })




$(document).on("click","#enter", function(){

    var thisId = $(this).attr("data-id");
    var thisOdd = $(this).attr("data-odds")

    console.log("Can you see this" +thisId);

    $.ajax({

        method: "POST",
        url: "/submit",
        data: {
            title: $("#title").val(),
            body:$("#text").val(),
            id: thisId,
            odds:thisOdd
        }
       
    })

    .then(function(data){

      



    })
 console.log("Can you see this" + thisId);

  $("#buttonhere").html("");
});




// $(document).on("click", "#enter", function () {
//   var thisId = $(this).attr("data-id");

//   console.log("Can you see this" + thisId);

//   $.ajax({

//         method: "GET",
//         url: "/notes/" + thisId,
        
//     })

//     .then(function(data){

//       console.log("these are the teams comments" + data)


//     })
//     $("#buttonhere").html("");

// });









//This function brings up the modal. 

 $(document).on("click", ".makenote", function () {

      var thisTeam = $(this).attr("data-id");
      var thisOdd = $(this).attr("data-odds")
      console.log("this is here " + thisTeam);

      //put notes into Modal 

        // var thisId = $(this).attr("data-id");

        // $.ajax({
        //     method: "GET",
        //     url: "/notes/" + thisId
        // }).then(function (data) {
        //     for (var i = 0; i < data.length; i++) {



 function showModal() {


  $("#buttonhere").append(
    "<br/><br/<p><input type='submit' id='enter' data-id='" +
      thisTeam + "' data-odds='"+thisOdd+
      "'></p> <br/><br/><br/>"
  );

   $("#matchModal").modal("show");
 }
 showModal();

    });

 });



$(document).ready(function () {


   $.ajax({
    method: "GET",
    url: "/notes"
   }).then(function(data) {

    console.log("NOTES NOTES" + data);

       for (var i = 0; i < data.length; i++) {
           $("#notes").append(
             "<p data-id='" +
               data[i]._id +
               "'>" + 
               data[i].id + "	&nbsp; "+ data[i].odds +
               "<br/>  " +
               data[i].title +
               "	&nbsp;" +
               "</p><br/><br/>"
           );
          
       }


   })
  });


 