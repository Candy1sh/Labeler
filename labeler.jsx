// Separate Words into Text Boxes Script
//May Jiang

//Global variable
var spacer = 3;
var length = 25;
var strokeNum = 1;

var x = 100;
var y = 100;

var black = new RGBColor();
black.red = 0;
black.green = 0;
black.blue = 0;

// Get the active document
var doc = app.activeDocument;
try {
  // Get the list of words
var selectedTextFrame = doc.selection[0];
var input = selectedTextFrame.contents;
var words = input.split("\r");
} catch (error) {
  alert ("Please select a text box\r-May Jiang")
}

for (var i = 0; i < words.length; i++) {
  // Create a new text frame
  var textFrame = doc.textFrames.add();
  textFrame.position = [x, y];
  textFrame.contents = words[i];

  // Get the bounding box of the text frame
  var bounds = textFrame.visibleBounds;
  var leftmostX = bounds[0];
  var topmostY = bounds[1];
  var rightMostX = bounds[2];
  var bottommostY = bounds[3];
  var middleHeight = (topmostY-bottommostY)/2;
  var middleWidth = (leftmostX-rightMostX )/2;

  // Create the leader lines
  lineTop = doc.pathItems.add();
  lineLeft = doc.pathItems.add();
  lineBottom = doc.pathItems.add();
  lineRight = doc.pathItems.add();

  lineTop.strokeColor = black;
  lineTop.strokeWidth = strokeNum;

  lineLeft.strokeColor = black;
  lineLeft.strokeWidth = strokeNum;

  lineBottom.strokeColor = black;
  lineBottom.strokeWidth = strokeNum;
  
  lineRight.strokeColor = black;
  lineRight.strokeWidth = strokeNum;
  
  lineLeft.setEntirePath([[leftmostX-spacer, topmostY-middleHeight],[leftmostX-length, topmostY-middleHeight]]);
  lineRight.setEntirePath([[rightMostX+spacer, topmostY-middleHeight],[rightMostX+length, topmostY-middleHeight]]);
  lineTop.setEntirePath([[leftmostX-middleWidth, topmostY+spacer],[leftmostX-middleWidth, topmostY+length]]);
  lineBottom.setEntirePath([[leftmostX-middleWidth, bottommostY-spacer],[leftmostX-middleWidth, bottommostY-length]]);

  // Increment the Y position for the next text box
  y -= length*2;
  if(i%2 == 0){
    x -= length*3;
  } else {
    x += length*3;
  }
}
