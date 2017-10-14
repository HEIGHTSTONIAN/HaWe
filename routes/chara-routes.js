var db = require("../models");


//****Routes will need to be modified when user table is added******
//****Will also need to modify if making multiple lists*************
//*******************************************************************
module.exports = function(app) {

    // Display Character if Exists
    app.get("/api/character", function(req, res) {

        console.log(req.user);
        console.log(req.user);
        console.log(req.user);
        console.log(req.user);
        console.log(req.user);
        console.log(req.user);

        
           db.Chara.findAll({
             where: {
               UserId: req.user
             }
             
           }).then(function(results){
              console.log(results);
              res.json(results);
           });
         });
         
    // Creating New Character
    app.post("/api/charas", function(req, res) {
        
        console.log(req.body);
        console.log(req.user);
        
        db.Chara.create({
            body: req.body.body,
            eyes: req.body.eyes, 
            mouth: req.body.mouth, 
            hair: req.body.hair, 
            clothes: req.body.clothes,
            UserId: req.user
        }).then(function(dbChara) {
        res.json(dbChara)
        })
        .catch(function(err) {      
        res.json(err);
        });
        //res.redirect("/app");
    });        
}