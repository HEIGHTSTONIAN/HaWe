$(document).ready(function() {

    
    //////////////////////////////////////////////////////////////
    // This is to get chara on page /////////////////////////////
    ////////////////////////////////////////////////////////////

    // Get Chara on Page Load
    $.get("/api/character", function(data) {
        console.log(data);

        $("#no-character").hide().html('<button id="noChara" class="button" style="width: 180px; display: block; margin: 0 auto;">Create Character</button>').fadeIn('slow');

        if (data[0].body) {
          $("#no-character").remove();
        }

        $("#my-canvas").hide().html('<canvas id="myCanvas" width="170" height="220" style="display: block; margin: 0 auto;"></canvas>').fadeIn('slow');
        
        displayChara(data);
        
      });

    function displayChara(data) {

      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d")
      
      var images = {};
  
      var chara = ["body1", "eyes1", "mouth2", "hair1", "clothes1"];

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

        // CANVAS STUFF
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d")
        
        var images = {};
    
        var chara = ["body1", "eyes1", "mouth2", "hair1", "clothes1"];
  
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