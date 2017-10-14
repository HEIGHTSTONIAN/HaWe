$(document).ready(function() {

    
    //////////////////////////////////////////////////////////////
    // This is to get chara on page /////////////////////////////
    ////////////////////////////////////////////////////////////

    // Get Chara on Page Load
    displayPerson();

    // function to display
    function displayPerson() {
      $.get("/api/character", function(data) {
        console.log(data);

        $("#no-character").hide().html('<button id="noChara" class="button" style="width: 180px; display: block; margin: 0 auto;">Create Character</button>').fadeIn('slow');

        if (data[0].body) {
          $("#no-character").remove();
        }

        $("#my-canvas").hide().html('<canvas id="myCanvas" width="170" height="220" style="display: block; margin: 0 auto;"></canvas>').fadeIn('slow');
        displayClothesOptions();
        
        displayChara(data);
        

      });

    function displayChara(data) {

      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d")
      
      var images = {};

      loadImage("bg");
      loadImage(data[0].body);
      loadImage(data[0].eyes);
      loadImage(data[0].mouth);
      loadImage(data[0].hair);
      loadImage(data[0].clothes);

      
  
      function loadImage(name) {
      
        images[name] = new Image();
        images[name].onload = function() { 
            resourceLoaded();
        }
        images[name].src = "img/character/" + name + ".png";
      }
  
      var totalResources = 1;
      var numResourcesLoaded = 0;
      var fps = 30;
      
      function resourceLoaded() {
      
        numResourcesLoaded += 1;
        if(numResourcesLoaded === totalResources) {
          setInterval(redraw, 1000 / fps);
        }
      }
  
      var charX = 0;
      var charY = 0;
        
      function redraw() {
      
        var x = charX;
        var y = charY;
      
        canvas.width = canvas.width; // clears the canvas 
        
        ctx.drawImage(images["bg"], x, y);
        ctx.drawImage(images[data[0].body], x, y);
        ctx.drawImage(images[data[0].eyes], x, y);
        ctx.drawImage(images[data[0].mouth], x, y);
        ctx.drawImage(images[data[0].hair], x, y);
        ctx.drawImage(images[data[0].clothes], x, y);
                            
      
    }

  }
    }
    

    //////////////////////////////////////////////////////////////
    // Display Options //////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    function displayClothesOptions() {
      $("#my-canvas").append('<br><form id="characterForm" style:"display: block; margin: 0 auto;"><select id="bodyB" style="display: block; margin: 0 auto; width: 170px;"><option value="body1">Skin1</option><option value="body2">Skin 2</option><option value="body3">Skin 3</option><option value="body4">Skin 4</option></select><select id="clothes" style="display: block; margin: 0 auto; width: 170px;"><option value="clothes1">Clothes 1</option><option value="clothes2">Clothes 2</option><option value="clothes3">Clothes 3</option></select><select id="hair" style="display: block; margin: 0 auto; width: 170px;"><option value="hair1">Hair 1</option><option value="hair2">Hair 2</option></select><input type="submit" name="action-change-clothes" class="button" id="action-change-clothes" value="Update Character" style="display: block; margin: 0 auto; width: 170px;"/></form>');
    }

    $(document).on("submit", "#characterForm", changeChara);
  
    function changeChara() {
      event.preventDefault();

      var bodyB = $("#bodyB").val().trim();
      var clothes = $("#clothes").val().trim();
      var hair = $("#hair").val().trim();

      var UserId = "req.user";
      
            $.post("/api/charas/update", {
              body: bodyB,
              hair: hair,
              clothes: clothes,
              UserId: UserId
            }).then(function(data) {
              console.log("data: " + data);
              displayPerson();
            }).catch(function(err) {
              console.log(err);
            });

    }

    //////////////////////////////////////////////////////////////
    // This is for creating new chara ///////////////////////////
    ////////////////////////////////////////////////////////////

    // Buttons
    $(document).on("click", "#noChara", createNewChara);

    // Create Character
    function createNewChara() {
      console.log("Creating a New Character");

      var UserId = "req.user";

      $.post("/api/charas", {
        body: "body1",
        eyes: "eyes1",
        mouth: "mouth2",
        hair: "hair1",
        clothes: "clothes1",
        UserId: UserId
      }).then(function(data) {
        console.log(data);
        $("#no-character").html("");

        $("#my-canvas").hide().html('<canvas id="myCanvas" width="170" height="220" style="display: block; margin: 0 auto;"></canvas>').fadeIn('slow');
        displayClothesOptions();

        // CANVAS STUFF
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d")
        
        var images = {};
  
        loadImage("bg");
        loadImage(data.body);
        loadImage(data.eyes);
        loadImage(data.mouth);
        loadImage(data.hair);
        loadImage(data.clothes);
    
        function loadImage(name) {
        
          images[name] = new Image();
          images[name].onload = function() { 
              resourceLoaded();
          }
          images[name].src = "img/character/" + name + ".png";
        }
    
        var totalResources = 1;
        var numResourcesLoaded = 0;
        var fps = 30;
        
        function resourceLoaded() {
        
          numResourcesLoaded += 1;
          if(numResourcesLoaded === totalResources) {
            setInterval(redraw, 1000 / fps);
          }
        }
    
        var charX = 0;
        var charY = 0;
          
        function redraw() {
        
          var x = charX;
          var y = charY;
        
          canvas.width = canvas.width; // clears the canvas 
          
          ctx.drawImage(images["bg"], x, y);
          ctx.drawImage(images[data.body], x, y);
          ctx.drawImage(images[data.eyes], x, y);
          ctx.drawImage(images[data.mouth], x, y);
          ctx.drawImage(images[data.hair], x, y);
          ctx.drawImage(images[data.clothes], x, y);
                              
        }


      }).catch(function(err) {
        console.log(err);
      });

    }
    

});