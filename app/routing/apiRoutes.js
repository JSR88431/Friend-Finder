//LINK DATA
// ===============================================================================
var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {


  app.get("/api/survey", function (req, res) {
    res.json(friends);
  });


  app.post("/api/survey", function (req, res) {

    var currentUser = req.body;

    var totalDifference = 0;
    var newBestPal = { name: "", photo: "", dummyScore: 50 };

    // LOOP THROUGH ALL THE FRIENDS SCORES

    for(var x = 0; x < friends.length; x++){
          totalDifference = 0;
      for(var y = 0; y < friends[x].scores[y]; y++){
        totalDifference += Math.abs(parseInt(currentUser.scores[y]) - parseInt(friends[x].scores[y]));
        if(totalDifference <= newBestPal.dummyScore){
          newBestPal.name = friends[x].name;
          newBestPal.photo = friends[x].photo;
          newBestPal.dummyScore = totalDifference;
        }
        
      }
     
    }


    friends.push(currentUser);
    res.json(newBestPal);
  });

};
