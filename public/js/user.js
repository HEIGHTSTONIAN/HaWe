$(document).ready(function() {
var count = 0;
var completionCount = 0;
var badgeCount = $("#badges > div").length;

getCompCount();
console.log(10)

 
//Gets the completion count
  function getCompCount() {
    console.log("In getUser");
      var awarded = 0;
    $.get("/app.json", function(data) {
      completionCount = data;
      console.log("This is # of completed tasks in user.js: "+data);
      count = completionCount;
      console.log("Count: "+count);

  }).done(getBadges);

  }; 

 function getBadges() {
   
   var awarded = 0;
   console.log("Count in getBadges: "+ count);
   console.log("Number of divs: "+ badgeCount);

   for(var i = 1; i <= count; i++){
      console.log(i);
      
      if (i%5 == 0){
         awarded++;

      }
     
   }  
   
   for(var i = 0; i < awarded; i++){ 
      $("#badges").find("div").eq(i).css("display", "inline")
   }
  console.log("Number of earned badges: "+awarded);
}

  





});//end of module