function test() {
    // Check if username is not empty
    if (username.value != "") {
      return false;
    }
  
    // Check if there are images stored for the game
    if (items.length <= 2) {
      return false;
    }
  
    // Check that the timing mechanism & variables are prepared
    if (minutes != 0 || seconds != 0 || timeGenerator == "") {
      return false;
    }
  
    // Check if Highscore Object & Classname are prepared
    if (highscoreObject.length != 0 || Highlight == "") {
      return false;
    }
  
    return true;
  }
  
  var testAppWorks = test();
  
  if (testAppWorks) {
    console.log("The application has passed its unit tests");
  } else {
    console.log("The application has failed its unit tests");
  }
  